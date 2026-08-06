import { WeddingConfig } from '../types';

export interface SavedProject {
  id: string; // e.g. WED-2026-98421
  coupleNames: string;
  themeId: string;
  themeName: string;
  createdAt: string;
  updatedAt: string;
  config: WeddingConfig;
  deploymentStatus: 'draft' | 'generated' | 'deployed';
  customUrl?: string;
}

const STORAGE_KEY = 'ethiopian_wedding_projects_db';
const DB_NAME = 'EthiopianWeddingStudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'projects';

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
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Asynchronously load all projects from IndexedDB and sync into memory cache
async function initFromIndexedDB(): Promise<SavedProject[]> {
  try {
    const db = await openIndexedDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const idbProjects = (request.result as SavedProject[]) || [];
        if (idbProjects.length > 0) {
          // Merge with in-memory or localStorage projects
          const current = getAllSavedProjects();
          const mergedMap = new Map<string, SavedProject>();
          
          current.forEach(p => mergedMap.set(p.id, p));
          idbProjects.forEach(p => mergedMap.set(p.id, p));

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
    const db = await openIndexedDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(project);
  } catch (err) {
    console.warn('IndexedDB save skipped:', err);
  }
}

// Delete project from IndexedDB
async function deleteFromIndexedDB(id: string): Promise<void> {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(id);
  } catch (err) {
    console.warn('IndexedDB delete skipped:', err);
  }
}

// Strip huge base64 strings if necessary to save localStorage quota
function stripHeavyBase64FromConfig(config: WeddingConfig): WeddingConfig {
  const isLargeBase64 = (val?: string) => val && val.startsWith('data:') && val.length > 2000;

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
    console.warn('localStorage quota reached. Attempting lightweight save...');
    try {
      // Attempt 1: Strip large base64 media strings
      const lightweightProjects = projects.map(p => ({
        ...p,
        config: stripHeavyBase64FromConfig(p.config)
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweightProjects));
    } catch (err2) {
      console.warn('localStorage quota reached again. Truncating project list for localStorage...');
      try {
        // Attempt 2: Keep top 5 most recent lightweight projects
        const trimmed = projects.slice(0, 5).map(p => ({
          ...p,
          config: stripHeavyBase64FromConfig(p.config)
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      } catch (err3) {
        // Attempt 3: Clear storage key to prevent persistent crash, full data remains safe in IndexedDB
        console.error('localStorage completely full. Using IndexedDB primary store.');
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
    console.error('Failed to load projects from storage:', err);
    inMemoryProjects = [];
    return [];
  }
}

export function saveProjectToDatabase(config: WeddingConfig, existingId?: string): SavedProject {
  const projects = [...getAllSavedProjects()];
  const id = existingId || generateProjectId();
  const groom = config.groomEth || config.groomEn || 'የሙሽራው ስም';
  const bride = config.brideEth || config.brideEn || 'የሙሽሪት ስም';
  const coupleNames = `${groom} እና ${bride}`;
  const now = new Date().toISOString();

  const existingIndex = projects.findIndex(p => p.id === id);

  const projectRecord: SavedProject = {
    id,
    coupleNames,
    themeId: config.themeId,
    themeName: config.themeId.toUpperCase(),
    createdAt: existingIndex >= 0 ? projects[existingIndex].createdAt : now,
    updatedAt: now,
    config,
    deploymentStatus: 'generated',
    customUrl: `https://wedding-invitations.et/view/${id}`
  };

  if (existingIndex >= 0) {
    projects[existingIndex] = projectRecord;
  } else {
    projects.unshift(projectRecord);
  }

  // Update in-memory cache
  inMemoryProjects = projects;

  // Persist to IndexedDB (asynchronous full high-res data storage)
  saveToIndexedDB(projectRecord).catch(() => {});

  // Persist to localStorage safely
  safeSaveToLocalStorage(projects);

  return projectRecord;
}

export function deleteProjectFromDatabase(id: string): void {
  const projects = getAllSavedProjects().filter(p => p.id !== id);
  inMemoryProjects = projects;

  // Remove from IndexedDB
  deleteFromIndexedDB(id).catch(() => {});

  // Sync localStorage
  safeSaveToLocalStorage(projects);
}

