import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

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
 */
export async function uploadFileToFirebaseStorage(file: File | Blob, folder = 'media'): Promise<string> {
  const fileName = (file instanceof File && file.name) ? file.name.replace(/[^a-zA-Z0-9._-]/g, '_') : 'file.bin';
  const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${fileName}`;
  const storageRef = ref(storage, `${folder}/${uniqueName}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}

/**
 * Uploads a base64 Data URL to Firebase Storage if it starts with 'data:', otherwise returns as-is.
 */
export async function uploadBase64ToFirebaseStorage(dataUrl: string | null, folder = 'media'): Promise<string | null> {
  if (!dataUrl || !dataUrl.startsWith('data:')) return dataUrl;
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return await uploadFileToFirebaseStorage(blob, folder);
  } catch (err) {
    console.error(`Failed to upload base64 to Firebase Storage for folder ${folder}:`, err);
    throw err;
  }
}

