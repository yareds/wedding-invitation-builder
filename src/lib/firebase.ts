import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Silence Firestore internal network connection logs in sandboxed/restricted network environments
try {
  setLogLevel('error');
} catch {
  // Ignore if unsupported
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Silent Firebase Anonymous Authentication on app load
onAuthStateChanged(auth, (user) => {
  if (!user) {
    signInAnonymously(auth).catch(() => {
      // Anonymous auth provider may not be enabled in Firebase console; fall back silently
    });
  }
});

/**
 * Uploads a File or Blob to Firebase Storage and returns its public HTTPS download URL.
 * Uses uploadBytesResumable with optional progress reporting (0-100%) and a 30-second timeout.
 */
export async function uploadFileToFirebaseStorage(
  file: File | Blob,
  folder = 'media',
  onProgress?: (progress: number) => void,
  timeoutMs = 90000
): Promise<string> {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch {
      // ignore if anonymous auth is not configured
    }
  }
  const fileName = (file instanceof File && file.name) ? file.name.replace(/[^a-zA-Z0-9._-]/g, '_') : 'file.bin';
  const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${fileName}`;
  const storageRef = ref(storage, `${folder}/${uniqueName}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<string>((resolve, reject) => {
    let timer: any = null;

    if (timeoutMs > 0) {
      timer = setTimeout(() => {
        uploadTask.cancel();
        reject(new Error(`Upload timed out after ${Math.round(timeoutMs / 1000)} seconds`));
      }, timeoutMs);
    }

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (snapshot.totalBytes > 0) {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if (onProgress) {
            onProgress(progress);
          }
        }
      },
      (error) => {
        if (timer) clearTimeout(timer);
        reject(error);
      },
      async () => {
        if (timer) clearTimeout(timer);
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          if (onProgress) onProgress(100);
          resolve(downloadUrl);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Uploads a base64 Data URL to Firebase Storage if it starts with 'data:', otherwise returns as-is.
 * Throws an error if the upload fails so failures are visible rather than silently fallbacks.
 */
export async function uploadBase64ToFirebaseStorage(dataUrl: string | null, folder = 'media'): Promise<string | null> {
  if (!dataUrl || !dataUrl.startsWith('data:')) return dataUrl;
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return await uploadFileToFirebaseStorage(blob, folder);
}

