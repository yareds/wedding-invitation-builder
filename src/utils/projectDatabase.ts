import { WeddingConfig, RSVPData, SavedProject } from '../types';
import { db, auth, uploadBase64ToFirebaseStorage } from '../lib/firebase';
import { signInAnonymously } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';

export type { SavedProject };

const STORAGE_KEY = 'ethiopian_wedding_projects_db';
const DB_NAME = 'EthiopianWeddingStudioDB';
const DB_VERSION = 2;
const STORE_NAME = 'projects';
const DRAFT_STORE_NAME = 'pendingDraftFiles';

export interface PendingDraftFiles {
  id: string;
  heroImgFile?: File;
  bgMusicFile?: File;
  galleryFiles?: File[];
  updatedAt?: string;
}

// In-memory cache for synchronous fast access
let inMemoryProjects: SavedProject[] | null = null;

export function generateProjectId(): string {
  const year = new Date().getFullYear();
  const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `WED-${year}-${randomHex}`;
}

// Helper: Open IndexedDB database
function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
      if (!dbInstance.objectStoreNames.contains(DRAFT_STORE_NAME)) {
        dbInstance.createObjectStore(DRAFT_STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Save pending draft File/Blob objects locally to IndexedDB 'pendingDraftFiles' store
export async function saveDraftFilesLocally(
  id: string,
  files: { heroImgFile?: File; bgMusicFile?: File; galleryFiles?: File[] }
): Promise<void> {
  try {
    const idb = await openIndexedDB();
    const existing = await getDraftFilesLocally(id);
    const updated: PendingDraftFiles = {
      id,
      heroImgFile: files.heroImgFile !== undefined ? files.heroImgFile : existing?.heroImgFile,
      bgMusicFile: files.bgMusicFile !== undefined ? files.bgMusicFile : existing?.bgMusicFile,
      galleryFiles: files.galleryFiles !== undefined ? files.galleryFiles : existing?.galleryFiles,
      updatedAt: new Date().toISOString()
    };

    return new Promise((resolve, reject) => {
      const transaction = idb.transaction(DRAFT_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(DRAFT_STORE_NAME);
      const request = store.put(updated);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('saveDraftFilesLocally error:', err);
  }
}

// Retrieve pending draft File/Blob objects from IndexedDB 'pendingDraftFiles' store
export async function getDraftFilesLocally(id: string): Promise<PendingDraftFiles | null> {
  try {
    const idb = await openIndexedDB();
    return new Promise((resolve) => {
      const transaction = idb.transaction(DRAFT_STORE_NAME, 'readonly');
      const store = transaction.objectStore(DRAFT_STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => {
        resolve((request.result as PendingDraftFiles) || null);
      };
      request.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('getDraftFilesLocally error:', err);
    return null;
  }
}

// Delete pending draft File/Blob entry from IndexedDB 'pendingDraftFiles' store
export async function clearDraftFilesLocally(id: string): Promise<void> {
  try {
    const idb = await openIndexedDB();
    return new Promise((resolve) => {
      const transaction = idb.transaction(DRAFT_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(DRAFT_STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('clearDraftFilesLocally error:', err);
  }
}

// Local-only save path for autosaving config text fields (never touches Firestore or Storage)
export function saveLocalDraftConfig(
  config: WeddingConfig,
  existingId?: string
): SavedProject {
  const projects = [...getAllSavedProjects()];
  const id = existingId || generateProjectId();
  const groom = config.groomEth || config.groomEn || 'የሙሽራው ስም';
  const bride = config.brideEth || config.brideEn || 'የሙሽሪት ስም';
  const coupleNames = `${groom} እና ${bride}`;
  const now = new Date().toISOString();

  let currentUid = auth.currentUser?.uid || '';

  const existingIndex = projects.findIndex((p) => p.id === id);
  const existingProject = existingIndex >= 0 ? projects[existingIndex] : null;

  const ownerUid = existingProject?.ownerUid || currentUid;
  const orderStatus = existingProject?.orderStatus || 'draft';
  const rsvpEnabled = true;
  const customerName = existingProject?.customerName || '';
  const customerPhone = existingProject?.customerPhone || '';
  const transactionRef = existingProject?.transactionRef || '';

  const projectRecord: SavedProject = {
    id,
    coupleNames,
    themeId: config.themeId,
    themeName: config.themeId.toUpperCase(),
    createdAt: existingProject ? existingProject.createdAt : now,
    updatedAt: now,
    config,
    deploymentStatus: 'generated',
    customUrl: `https://wedding-invitations.et/view/${id}`,
    ownerUid,
    orderStatus,
    rsvpEnabled,
    customerName,
    customerPhone,
    transactionRef
  };

  if (existingIndex >= 0) {
    projects[existingIndex] = projectRecord;
  } else {
    projects.unshift(projectRecord);
  }

  inMemoryProjects = projects;
  saveToIndexedDB(projectRecord).catch(() => {});
  safeSaveToLocalStorage(projects);

  return projectRecord;
}

// Asynchronously load all projects from IndexedDB and sync into memory cache
async function initFromIndexedDB(): Promise<SavedProject[]> {
  try {
    const idb = await openIndexedDB();
    return new Promise((resolve) => {
      const transaction = idb.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const idbProjects = (request.result as SavedProject[]) || [];
        if (idbProjects.length > 0) {
          const current = getAllSavedProjects();
          const mergedMap = new Map<string, SavedProject>();

          current.forEach((p) => mergedMap.set(p.id, p));
          idbProjects.forEach((p) => mergedMap.set(p.id, p));

          const mergedList = Array.from(mergedMap.values()).sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );

          inMemoryProjects = mergedList;
          safeSaveToLocalStorage(mergedList);
          resolve(mergedList);
        } else {
          resolve(getAllSavedProjects());
        }
      };

      request.onerror = () => resolve(getAllSavedProjects());
    });
  } catch (err) {
    return getAllSavedProjects();
  }
}

// Kickoff background load from IndexedDB on module import
initFromIndexedDB().catch(() => {});

// Save single project record to IndexedDB
async function saveToIndexedDB(project: SavedProject): Promise<void> {
  try {
    const idb = await openIndexedDB();
    const transaction = idb.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(project);
  } catch (err) {
    console.warn('IndexedDB save skipped:', err);
  }
}

// Delete project from IndexedDB
async function deleteFromIndexedDB(id: string): Promise<void> {
  try {
    const idb = await openIndexedDB();
    const transaction = idb.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(id);
  } catch (err) {
    console.warn('IndexedDB delete skipped:', err);
  }
}

// Strip huge base64 strings if necessary to save localStorage quota
function stripHeavyBase64FromConfig(config: WeddingConfig): WeddingConfig {
  const isLargeBase64 = (val?: string | null) => !!(val && val.startsWith('data:') && val.length > 2000);

  return {
    ...config,
    heroImg: isLargeBase64(config.heroImg) ? '/placeholder-hero.jpg' : config.heroImg,
    bgMusicUrl: isLargeBase64(config.bgMusicUrl) ? '' : config.bgMusicUrl,
    galleryImgs: (config.galleryImgs || []).map((img) =>
      isLargeBase64(img) ? '/placeholder-gallery.jpg' : img
    ),
  };
}

// Safely save projects array to localStorage with quota protection
function safeSaveToLocalStorage(projects: SavedProject[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    try {
      const lightweightProjects = projects.map((p) => ({
        ...p,
        config: stripHeavyBase64FromConfig(p.config),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweightProjects));
    } catch (err2) {
      try {
        const trimmed = projects.slice(0, 5).map((p) => ({
          ...p,
          config: stripHeavyBase64FromConfig(p.config),
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      } catch (err3) {
        console.error('localStorage full. Using Firestore & IndexedDB primary store.');
      }
    }
  }
}

export function getAllSavedProjects(): SavedProject[] {
  if (inMemoryProjects !== null) {
    return inMemoryProjects;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      inMemoryProjects = [];
      return [];
    }
    const parsed = JSON.parse(raw);
    inMemoryProjects = Array.isArray(parsed) ? parsed : [];
    return inMemoryProjects;
  } catch (err) {
    console.error('Failed to load projects from local storage:', err);
    inMemoryProjects = [];
    return [];
  }
}

// Fetch all projects from Firestore collection "projects"
export async function getAllProjectsFromFirestore(): Promise<SavedProject[]> {
  try {
    const projectsCol = collection(db, 'projects');
    const snapshot = await getDocs(projectsCol);
    const remoteProjects: SavedProject[] = [];

    // Ensure we have a valid currentUser UID for backfilling if needed
    let currentUid = auth.currentUser?.uid;
    if (!currentUid) {
      try {
        const anonRes = await signInAnonymously(auth);
        currentUid = anonRes.user.uid;
      } catch {
        // Anonymous auth provider disabled or unavailable; proceed quietly
      }
    }

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() as SavedProject;
      if (data && data.id) {
        // Backfill ownerUid for any pre-existing project document lacking ownerUid
        if (!data.ownerUid && currentUid) {
          data.ownerUid = currentUid;
          try {
            const projectRef = doc(db, 'projects', data.id);
            await setDoc(projectRef, { ownerUid: currentUid }, { merge: true });
            console.log(`[Firestore] Backfilled ownerUid for project ${data.id}`);
          } catch (backfillErr) {
            console.warn(`Failed to backfill ownerUid for project ${data.id}:`, backfillErr);
          }
        }
        remoteProjects.push(data);
      }
    }

    remoteProjects.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    if (remoteProjects.length > 0) {
      inMemoryProjects = remoteProjects;
      safeSaveToLocalStorage(remoteProjects);
      remoteProjects.forEach((p) => saveToIndexedDB(p).catch(() => {}));
    }

    return remoteProjects.length > 0 ? remoteProjects : getAllSavedProjects();
  } catch (err) {
    console.warn('Firestore fetch failed, falling back to local database:', err);
    return getAllSavedProjects();
  }
}

// Save project to Firestore & Local Cache
export async function saveProjectToDatabase(
  config: WeddingConfig,
  existingId?: string
): Promise<SavedProject> {
  const projects = [...getAllSavedProjects()];
  const id = existingId || generateProjectId();
  const groom = config.groomEth || config.groomEn || 'የሙሽራው ስም';
  const bride = config.brideEth || config.brideEn || 'የሙሽሪት ስም';
  const coupleNames = `${groom} እና ${bride}`;
  const now = new Date().toISOString();

  // Ensure user is signed in silently (anonymous auth if not logged in)
  let currentUid = auth.currentUser?.uid;
  if (!currentUid) {
    try {
      const anonRes = await signInAnonymously(auth);
      currentUid = anonRes.user.uid;
    } catch {
      // Anonymous auth provider disabled or unavailable; proceed quietly
    }
  }

  const existingIndex = projects.findIndex((p) => p.id === id);
  const existingProject = existingIndex >= 0 ? projects[existingIndex] : null;

  // Set ownerUid to auth.currentUser.uid for new project or preserve existing if present
  const ownerUid = existingProject?.ownerUid || currentUid || '';

  const orderStatus = existingProject?.orderStatus || 'draft';
  const rsvpEnabled = true;
  const customerName = existingProject?.customerName || '';
  const customerPhone = existingProject?.customerPhone || '';
  const transactionRef = existingProject?.transactionRef || '';

  // Convert any remaining base64 media fields to Firebase Storage URLs
  let heroImg = config.heroImg;
  let bgMusicUrl = config.bgMusicUrl;
  let galleryImgs = config.galleryImgs || [];

  if (heroImg && heroImg.startsWith('data:')) {
    try {
      heroImg = await uploadBase64ToFirebaseStorage(heroImg, 'hero_images');
    } catch (err) {
      console.warn('Failed to upload base64 heroImg to Firebase Storage:', err);
    }
  }

  if (bgMusicUrl && bgMusicUrl.startsWith('data:')) {
    try {
      bgMusicUrl = await uploadBase64ToFirebaseStorage(bgMusicUrl, 'audio');
    } catch (err) {
      console.warn('Failed to upload base64 bgMusicUrl to Firebase Storage:', err);
    }
  }

  if (galleryImgs.some((img) => img && img.startsWith('data:'))) {
    try {
      galleryImgs = await Promise.all(
        galleryImgs.map((img) => uploadBase64ToFirebaseStorage(img, 'gallery').then((url) => url || img))
      );
    } catch (err) {
      console.warn('Failed to upload base64 galleryImgs to Firebase Storage:', err);
    }
  }

  const updatedConfig: WeddingConfig = {
    ...config,
    heroImg,
    bgMusicUrl,
    galleryImgs,
    rsvpEnabled
  };

  const projectRecord: SavedProject = {
    id,
    coupleNames,
    themeId: config.themeId,
    themeName: config.themeId.toUpperCase(),
    createdAt: existingProject ? existingProject.createdAt : now,
    updatedAt: now,
    config: updatedConfig,
    deploymentStatus: 'generated',
    customUrl: `https://wedding-invitations.et/view/${id}`,
    ownerUid,
    orderStatus,
    rsvpEnabled,
    customerName,
    customerPhone,
    transactionRef
  };

  if (existingIndex >= 0) {
    projects[existingIndex] = projectRecord;
  } else {
    projects.unshift(projectRecord);
  }

  // Update in-memory cache
  inMemoryProjects = projects;

  // Persist to IndexedDB & localStorage
  saveToIndexedDB(projectRecord).catch(() => {});
  safeSaveToLocalStorage(projects);

  // Write to Firestore projects collection
  try {
    const projectRef = doc(db, 'projects', id);
    await setDoc(projectRef, projectRecord, { merge: true });
    console.log(`[Firestore] Project ${id} saved successfully with ownerUid: ${ownerUid}`);
  } catch (err: any) {
    console.error('Failed to save project to Firestore:', err);
    const errorMsg = err?.message || 'Request payload or network error saving to cloud';
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('firestore-save-error', {
          detail: { message: `Cloud Save Error: ${errorMsg}` },
        })
      );
    }
    throw new Error(`Cloud Save Failed: ${errorMsg}`);
  }

  return projectRecord;
}

// Update project record when customer submits order & payment details
export async function submitProjectOrder(
  projectId: string,
  details: {
    customerName: string;
    customerPhone: string;
    transactionRef?: string;
  }
): Promise<SavedProject | null> {
  const projects = [...getAllSavedProjects()];
  const index = projects.findIndex((p) => p.id === projectId);
  let updatedProj: SavedProject | null = null;
  const now = new Date().toISOString();

  if (index >= 0) {
    updatedProj = {
      ...projects[index],
      orderStatus: 'submitted',
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      transactionRef: details.transactionRef || '',
      updatedAt: now,
    };
    projects[index] = updatedProj;
    inMemoryProjects = projects;
    saveToIndexedDB(updatedProj).catch(() => {});
    safeSaveToLocalStorage(projects);
  }

  try {
    const projectRef = doc(db, 'projects', projectId);
    await setDoc(
      projectRef,
      {
        orderStatus: 'submitted',
        customerName: details.customerName,
        customerPhone: details.customerPhone,
        transactionRef: details.transactionRef || '',
        updatedAt: now,
      },
      { merge: true }
    );
    console.log(`[Firestore] Project ${projectId} order updated to 'submitted'.`);
  } catch (err) {
    console.error('Failed to update project order status in Firestore:', err);
  }

  return updatedProj;
}

// Approve order & enable RSVP for project record
export async function approveProjectOrder(projectId: string): Promise<SavedProject | null> {
  const projects = [...getAllSavedProjects()];
  const index = projects.findIndex((p) => p.id === projectId);
  let updatedProj: SavedProject | null = null;
  const now = new Date().toISOString();

  if (index >= 0) {
    const updatedConfig: WeddingConfig = {
      ...projects[index].config,
      rsvpEnabled: true,
    };
    updatedProj = {
      ...projects[index],
      orderStatus: 'approved',
      rsvpEnabled: true,
      config: updatedConfig,
      updatedAt: now,
    };
    projects[index] = updatedProj;
    inMemoryProjects = projects;
    saveToIndexedDB(updatedProj).catch(() => {});
    safeSaveToLocalStorage(projects);
  }

  try {
    const projectRef = doc(db, 'projects', projectId);
    await setDoc(
      projectRef,
      {
        orderStatus: 'approved',
        rsvpEnabled: true,
        'config.rsvpEnabled': true,
        updatedAt: now,
      },
      { merge: true }
    );
    console.log(`[Firestore] Project ${projectId} order approved & RSVP enabled.`);
  } catch (err) {
    console.error('Failed to approve project order in Firestore:', err);
  }

  return updatedProj;
}

// Delete project from Firestore & Local Cache
export async function deleteProjectFromDatabase(id: string): Promise<void> {
  const projects = getAllSavedProjects().filter((p) => p.id !== id);
  inMemoryProjects = projects;

  // Remove from IndexedDB & LocalStorage
  deleteFromIndexedDB(id).catch(() => {});
  safeSaveToLocalStorage(projects);

  // Delete from Firestore
  try {
    const projectRef = doc(db, 'projects', id);
    await deleteDoc(projectRef);
    console.log(`[Firestore] Project ${id} deleted.`);
  } catch (err) {
    console.error('Failed to delete project from Firestore:', err);
  }
}

// ----------------------------------------------------------------------
// RSVP FIRESTORE SUBCOLLECTION MANAGEMENT: projects/{projectId}/rsvps
// ----------------------------------------------------------------------

export async function submitRSVPToFirestore(
  projectId: string,
  rsvpData: RSVPData
): Promise<string> {
  const cleanProjectId = projectId || 'default-wedding';
  const submission: RSVPData = {
    ...rsvpData,
    submittedAt: rsvpData.submittedAt || new Date().toISOString(),
  };

  // Write to Firestore subcollection: projects/{projectId}/rsvps
  try {
    const rsvpsRef = collection(db, 'projects', cleanProjectId, 'rsvps');
    const docRef = await addDoc(rsvpsRef, submission);
    console.log(`[Firestore] RSVP written for project ${cleanProjectId} with ID: ${docRef.id}`);
    return docRef.id;
  } catch (err) {
    console.error(`Error writing RSVP to Firestore for ${cleanProjectId}:`, err);
    throw err;
  }
}

export async function getRSVPsFromFirestore(projectId: string): Promise<RSVPData[]> {
  if (!projectId) return [];
  try {
    const rsvpsRef = collection(db, 'projects', projectId, 'rsvps');
    const snapshot = await getDocs(rsvpsRef);
    const rsvps: RSVPData[] = [];

    snapshot.forEach((docSnap) => {
      rsvps.push(docSnap.data() as RSVPData);
    });

    return rsvps.sort(
      (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
    );
  } catch (err) {
    console.error(`Error fetching RSVPs for ${projectId}:`, err);
    return [];
  }
}

export function subscribeToRSVPs(
  projectId: string,
  callback: (rsvps: RSVPData[]) => void
): () => void {
  if (!projectId) {
    callback([]);
    return () => {};
  }

  try {
    const rsvpsRef = collection(db, 'projects', projectId, 'rsvps');
    const unsubscribe = onSnapshot(
      rsvpsRef,
      (snapshot) => {
        const rsvps: RSVPData[] = [];
        snapshot.forEach((docSnap) => {
          rsvps.push(docSnap.data() as RSVPData);
        });
        rsvps.sort(
          (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
        );
        callback(rsvps);
      },
      (error) => {
        console.error(`RSVP subscription error for ${projectId}:`, error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.error(`Failed to subscribe to RSVPs for ${projectId}:`, err);
    return () => {};
  }
}
