import React, { useState, useEffect } from 'react';
import { usePhotos } from '../context/PhotoContext';
import { PookieCharacter } from './PookieCharacter';

interface ScrapbookImageProps {
  slotId: string;
  defaultFilename?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  fallbackPookie?: 'bunny' | 'bear' | 'kitty' | 'cake';
}

export const ScrapbookImage: React.FC<ScrapbookImageProps> = ({
  slotId,
  defaultFilename,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle,
  fallbackPookie = 'bear',
}) => {
  const { getPhotoSrc } = usePhotos();
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const photoSrc = getPhotoSrc(slotId, defaultFilename ? `/images/${defaultFilename}` : undefined);

  // Reset error/loaded state whenever src changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [photoSrc]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* Background Fallback Layer (z-0): Visible if image is not loaded or has error */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-radial from-pink-50 via-rose-50 to-pink-100 text-[#5d4037] text-center z-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 border border-pink-200 shadow-xs flex items-center justify-center mb-2">
          <PookieCharacter type={fallbackPookie} size="md" mood="happy" />
        </div>
        <span className="font-serif italic text-base sm:text-lg font-bold text-[#5d4037] line-clamp-1">
          {fallbackTitle || slotId}
        </span>
        <span className="text-[11px] sm:text-xs text-pink-600 bg-white/80 px-3 py-0.5 rounded-full border border-pink-200 mt-1 font-medium line-clamp-1">
          {fallbackSubtitle || 'Birthday Queen Scrapbook 💖'}
        </span>
      </div>

      {/* Actual Image Layer (z-10): Overlays the fallback when available & loaded */}
      {!hasError && (
        <img
          src={photoSrc}
          alt={alt}
          onLoad={() => {
            setIsLoaded(true);
            setHasError(false);
          }}
          onError={() => {
            // Gracefully show fallback card
            setHasError(true);
            setIsLoaded(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 z-10 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } hover:scale-105`}
        />
      )}
    </div>
  );
};

