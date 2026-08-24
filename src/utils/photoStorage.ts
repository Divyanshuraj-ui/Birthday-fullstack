// IndexedDB-based local image storage for uploaded Dolly Di photos

const DB_NAME = 'dolly_di_scrapbook_photos';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function storePhoto(idOrFilename: string, dataUrlOrBlob: string | Blob): Promise<void> {
  try {
    const db = await openDB();
    const cleanKey = normalizeKey(idOrFilename);
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrlOrBlob, cleanKey);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Failed to save to IndexedDB, fallback to memory', e);
  }
}

export async function getAllStoredPhotos(): Promise<Record<string, string>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      const results: Record<string, string> = {};

      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          const key = String(cursor.key);
          const value = cursor.value;
          if (typeof value === 'string') {
            results[key] = value;
          } else if (value instanceof Blob) {
            results[key] = URL.createObjectURL(value);
          }
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = () => resolve({});
    });
  } catch (e) {
    console.warn('IndexedDB read error', e);
    return {};
  }
}

export async function deleteStoredPhoto(idOrFilename: string): Promise<void> {
  try {
    const db = await openDB();
    const cleanKey = normalizeKey(idOrFilename);
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(cleanKey);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Failed to delete photo', e);
  }
}

export async function clearAllStoredPhotos(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Failed to clear photos', e);
  }
}

export function normalizeKey(filenameOrId: string): string {
  if (!filenameOrId) return 'hero';
  const base = filenameOrId.trim().toLowerCase();

  // Explicit keyword matches
  if (base.includes('123') || base.includes('hero') || base.includes('spotlight') || base.includes('queen') || base.includes('cover')) {
    return 'hero';
  }
  if (base.includes('one') || base === '1' || base.startsWith('1.') || base.startsWith('01.') || base.includes('orange') || base.includes('lehenga')) {
    return 'one';
  }

  // Extract digits anywhere in the filename, e.g. "11.jpeg", "IMG_12.jpg", "Photo (21).png", "evidence-33.jpeg"
  const match = base.match(/(\d+)/);
  if (match) {
    const num = match[1];
    if (num === '123') return 'hero';
    if (num === '1') return 'one';
    return num;
  }

  return base.replace(/\.[^/.]+$/, '');
}

export function getPossibleKeysForSlot(slotOrFilename: string): string[] {
  const normalized = normalizeKey(slotOrFilename);
  const keys = [normalized];

  if (normalized === 'hero') {
    keys.push('123', '123.jpeg', '123.jpg', 'hero', 'hero.jpeg', 'hero.jpg', 'hero.png');
  } else if (normalized === 'one') {
    keys.push('one', '1', '01', 'one.jpeg', 'one.jpg', 'one.png', '1.jpeg', '1.jpg');
  } else {
    keys.push(`${normalized}.jpeg`, `${normalized}.jpg`, `${normalized}.png`);
  }

  return Array.from(new Set(keys));
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
