import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAllStoredPhotos,
  storePhoto,
  deleteStoredPhoto,
  clearAllStoredPhotos,
  normalizeKey,
  getPossibleKeysForSlot,
  readFileAsDataURL,
} from '../utils/photoStorage';

export interface PhotoSlotDefinition {
  id: string;
  label: string;
  description: string;
  chapter: string;
  defaultFilename: string;
}

interface PhotoContextType {
  photos: Record<string, string>;
  getPhotoSrc: (idOrFilename: string, defaultPath?: string) => string;
  hasCustomPhoto: (idOrFilename: string) => boolean;
  uploadPhoto: (idOrFilename: string, file: File) => Promise<void>;
  uploadMultiplePhotos: (files: FileList | File[]) => Promise<number>;
  removePhoto: (idOrFilename: string) => Promise<void>;
  resetAllPhotos: () => Promise<void>;
  isPhotoModalOpen: boolean;
  setIsPhotoModalOpen: (open: boolean) => void;
  activeUploadSlot: string | null;
  openUploadModalForSlot: (slotId?: string) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

// Complete ordered directory of all Scrapbook Photo Slots across chapters
export const ALL_PHOTO_SLOTS: PhotoSlotDefinition[] = [
  { id: 'hero', label: '123.jpeg Spotlight (Chapter 1)', description: 'Main birthday queen cover portrait', chapter: 'Chapter 1', defaultFilename: '123.jpeg' },
  { id: '12', label: '12.jpeg Royal Peach Ensemble (Chapter 2 & 3)', description: 'Traditional peach attire with siblings', chapter: 'Chapter 2 & 3', defaultFilename: '12.jpeg' },
  { id: 'one', label: 'one.jpeg Festive Splendor (Chapter 2)', description: 'Orange festive lehenga perfection', chapter: 'Chapter 2', defaultFilename: 'one.jpeg' },
  { id: '11', label: '11.jpeg Graceful Peach Glow (Chapter 3)', description: 'Sliding memory slide #1', chapter: 'Chapter 3', defaultFilename: '11.jpeg' },
  { id: '13', label: '13.jpeg Fairy Lights & Saree (Chapter 3)', description: 'Sliding memory slide #3', chapter: 'Chapter 3', defaultFilename: '13.jpeg' },
  { id: '14', label: '14.jpeg Dandiya & Festive Glam (Chapter 3)', description: 'Sliding memory slide #4', chapter: 'Chapter 3', defaultFilename: '14.jpeg' },
  { id: '15', label: '15.jpeg Holi with Mummy (Chapter 3)', description: 'Sliding memory slide #5', chapter: 'Chapter 3', defaultFilename: '15.jpeg' },
  { id: '16', label: '16.jpeg Rang Barse Brother (Chapter 3)', description: 'Sliding memory slide #6', chapter: 'Chapter 3', defaultFilename: '16.jpeg' },
  { id: '17', label: '17.jpeg Maroon Saree & Gajra (Chapter 3)', description: 'Sliding memory slide #7', chapter: 'Chapter 3', defaultFilename: '17.jpeg' },
  { id: '18', label: '18.jpeg Cute Chin Rest Meme (Chapter 3)', description: 'Sliding memory slide #8', chapter: 'Chapter 3', defaultFilename: '18.jpeg' },
  { id: '20', label: '20.jpeg Holi Sibling Squad (Chapter 3)', description: 'Sliding memory slide #9', chapter: 'Chapter 3', defaultFilename: '20.jpeg' },
  { id: '21', label: '21.jpeg Pillow Hugger (Chapter 4)', description: 'Secret roast case file #21', chapter: 'Chapter 4', defaultFilename: '21.jpeg' },
  { id: '22', label: '22.jpeg Cuddle with Mummy (Chapter 4)', description: 'Secret roast case file #22', chapter: 'Chapter 4', defaultFilename: '22.jpeg' },
  { id: '23', label: '23.jpeg Pink Bow Clips (Chapter 4)', description: 'Secret roast case file #23', chapter: 'Chapter 4', defaultFilename: '23.jpeg' },
  { id: '24', label: '24.jpeg 5-Minute Ready Call (Chapter 4)', description: 'Secret roast case file #24', chapter: 'Chapter 4', defaultFilename: '24.jpeg' },
  { id: '25', label: '25.jpeg She Believed Tee (Chapter 4)', description: 'Secret roast case file #25', chapter: 'Chapter 4', defaultFilename: '25.jpeg' },
  { id: '26', label: '26.jpeg Hexagon Wall Selfie (Chapter 4)', description: 'Secret roast case file #26', chapter: 'Chapter 4', defaultFilename: '26.jpeg' },
  { id: '27', label: '27.jpeg Late Night Video Call (Chapter 4)', description: 'Secret roast case file #27', chapter: 'Chapter 4', defaultFilename: '27.jpeg' },
  { id: '28', label: '28.jpeg 20:44 Laughs with Mom (Chapter 4)', description: 'Secret roast case file #28', chapter: 'Chapter 4', defaultFilename: '28.jpeg' },
  { id: '29', label: '29.jpeg Retro 90s Portrait (Chapter 4)', description: 'Secret roast case file #29', chapter: 'Chapter 4', defaultFilename: '29.jpeg' },
  { id: '30', label: '30.jpeg Midnight Snack Attack (Chapter 4)', description: 'Secret roast case file #30', chapter: 'Chapter 4', defaultFilename: '30.jpeg' },
  { id: '31', label: '31.jpeg Sheet Mask & Spa Champy (Chapter 4)', description: 'Secret roast case file #31', chapter: 'Chapter 4', defaultFilename: '31.jpeg' },
  { id: '32', label: '32.jpeg Vintage Baby Passport (Chapter 4)', description: 'Secret roast case file #32', chapter: 'Chapter 4', defaultFilename: '32.jpeg' },
  { id: '33', label: '33.png Top Secret Classified (Chapter 4)', description: 'Secret roast case file #33', chapter: 'Chapter 4', defaultFilename: '33.png' },
];

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [activeUploadSlot, setActiveUploadSlot] = useState<string | null>(null);

  useEffect(() => {
    // Load photos from IndexedDB on startup
    getAllStoredPhotos().then((stored) => {
      setPhotos(stored);
    });
  }, []);

  const getPhotoSrc = (idOrFilename: string, defaultPath?: string): string => {
    const possibleKeys = getPossibleKeysForSlot(idOrFilename);
    
    // Check if any alias has a stored image
    for (const key of possibleKeys) {
      if (photos[key]) {
        return photos[key];
      }
    }

    if (defaultPath) {
      return defaultPath;
    }

    const clean = normalizeKey(idOrFilename);
    const matchedSlot = ALL_PHOTO_SLOTS.find((s) => s.id === clean);
    const filename = matchedSlot ? matchedSlot.defaultFilename : (idOrFilename.includes('.') ? idOrFilename : `${idOrFilename}.jpeg`);
    return `/images/${filename}`;
  };

  const hasCustomPhoto = (idOrFilename: string): boolean => {
    const possibleKeys = getPossibleKeysForSlot(idOrFilename);
    return possibleKeys.some((key) => Boolean(photos[key]));
  };

  const uploadPhoto = async (idOrFilename: string, file: File) => {
    const key = normalizeKey(idOrFilename);
    const dataUrl = await readFileAsDataURL(file);
    await storePhoto(key, dataUrl);
    setPhotos((prev) => ({ ...prev, [key]: dataUrl }));
  };

  const uploadMultiplePhotos = async (files: FileList | File[]): Promise<number> => {
    let count = 0;
    const newPhotos: Record<string, string> = { ...photos };
    const fileArray = Array.from(files);

    // Track assigned slots in this batch
    const assignedInBatch = new Set<string>();

    for (const file of fileArray) {
      const originalName = file.name;
      let targetKey = normalizeKey(originalName);

      // Check if targetKey matches a known slot
      const isKnownSlot = ALL_PHOTO_SLOTS.some((s) => s.id === targetKey);
      
      // If not recognized or already assigned in this batch, find next unassigned slot
      if (!isKnownSlot || assignedInBatch.has(targetKey)) {
        const nextSlot = ALL_PHOTO_SLOTS.find(
          (s) => !newPhotos[s.id] && !assignedInBatch.has(s.id)
        );
        if (nextSlot) {
          targetKey = nextSlot.id;
        }
      }

      assignedInBatch.add(targetKey);
      const dataUrl = await readFileAsDataURL(file);
      await storePhoto(targetKey, dataUrl);
      newPhotos[targetKey] = dataUrl;
      count++;
    }

    setPhotos(newPhotos);
    return count;
  };

  const removePhoto = async (idOrFilename: string) => {
    const possibleKeys = getPossibleKeysForSlot(idOrFilename);
    for (const key of possibleKeys) {
      await deleteStoredPhoto(key);
    }
    setPhotos((prev) => {
      const copy = { ...prev };
      for (const key of possibleKeys) {
        delete copy[key];
      }
      return copy;
    });
  };

  const resetAllPhotos = async () => {
    await clearAllStoredPhotos();
    setPhotos({});
  };

  const openUploadModalForSlot = (slotId?: string) => {
    setActiveUploadSlot(slotId ? normalizeKey(slotId) : null);
    setIsPhotoModalOpen(true);
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        getPhotoSrc,
        hasCustomPhoto,
        uploadPhoto,
        uploadMultiplePhotos,
        removePhoto,
        resetAllPhotos,
        isPhotoModalOpen,
        setIsPhotoModalOpen,
        activeUploadSlot,
        openUploadModalForSlot,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
};
