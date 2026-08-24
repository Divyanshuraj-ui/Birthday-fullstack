import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
import { PookieCharacter } from '../PookieCharacter';
import { ScrapbookImage } from '../ScrapbookImage';
import { ROAST_MEMORIES } from '../../data/memoriesData';
import { soundFX } from '../../utils/audio';

interface Page4Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Page4RoastJail: React.FC<Page4Props> = ({ onNext, onPrev }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [filterDanger, setFilterDanger] = useState<string>('all');

  const filteredPhotos = ROAST_MEMORIES.filter((photo) => {
    if (filterDanger === 'extreme') return photo.dangerLevel >= 80;
    if (filterDanger === 'moderate') return photo.dangerLevel < 80;
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 text-[#5d4037]">
      {/* Chapter 4 Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 text-rose-600 text-xs uppercase tracking-widest font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
          <span>High Sibling Hazard Zone ⚠️ Level 100 Classified</span>
        </div>

        <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#5d4037] max-w-4xl mx-auto leading-tight">
          "Inn Tasveeron ko samuhik krne k baad kahi mai <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">jail na chala jaun</span>..hahah😂"
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-[#5d4037]/80">
          "Secret candid shots, sheet masks, cuddle sessions &amp; midnight raids!" 🕵️‍♀️
        </p>
      </motion.div>

      {/* Filter / Category tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => {
            soundFX.playPop();
            setFilterDanger('all');
          }}
          id="btn-filter-roast-all"
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            filterDanger === 'all'
              ? 'bg-pink-500 text-white shadow-xs'
              : 'bg-white/70 text-[#5d4037] hover:bg-pink-50 border border-pink-200'
          }`}
        >
          All {ROAST_MEMORIES.length} Evidences 📂
        </button>
        <button
          onClick={() => {
            soundFX.playPop();
            setFilterDanger('extreme');
          }}
          id="btn-filter-roast-extreme"
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            filterDanger === 'extreme'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/70 text-[#5d4037] hover:bg-rose-50 border border-pink-200'
          }`}
        >
          Max Risk (80%+) 🚨
        </button>
        <button
          onClick={() => {
            soundFX.playPop();
            setFilterDanger('moderate');
          }}
          id="btn-filter-roast-cute"
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            filterDanger === 'moderate'
              ? 'bg-pink-500 text-white shadow-xs'
              : 'bg-white/70 text-[#5d4037] hover:bg-pink-50 border border-pink-200'
          }`}
        >
          Wholesome &amp; Cute 🎀
        </button>
      </div>

      {/* Grid of Funny Evidence Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredPhotos.map((photo, index) => {
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              whileHover={{ y: -5, rotate: index % 2 === 0 ? 1 : -1 }}
              onClick={() => {
                soundFX.playPop();
                setSelectedPhoto(photo.id);
              }}
              className="bg-white/85 backdrop-blur-md p-4 rounded-[32px] shadow-sm border border-pink-100 hover:border-pink-300 transition-all cursor-pointer relative group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-[22px] overflow-hidden bg-pink-100 border border-pink-200/80 flex items-center justify-center">
                  {/* Direct imgSrc support or fallback */}
                  {photo.imgSrc ? (
                    <img
                      src={photo.imgSrc}
                      alt={photo.title}
                      className="w-full h-full object-contain object-center drop-shadow-md"
                    />
                  ) : (
                    <ScrapbookImage
                      slotId={photo.id}
                      defaultFilename={photo.filename}
                      alt={photo.title}
                      fallbackTitle={photo.title}
                      fallbackSubtitle={`Evidence #${photo.id}`}
                      fallbackPookie={index % 3 === 0 ? 'bear' : index % 3 === 1 ? 'bunny' : 'kitty'}
                    />
                  )}

                  {/* Stamp Sticker */}
                  <div className="absolute top-2.5 right-2.5 z-20 bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#5d4037] px-2.5 py-0.5 rounded-full shadow-xs border border-pink-100 pointer-events-none">
                    {photo.sticker}
                  </div>

                  {/* Danger Meter Badge */}
                  <div
                    className={`absolute bottom-2.5 left-2.5 z-20 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md text-white shadow-xs pointer-events-none ${
                      photo.dangerLevel >= 85 ? 'bg-rose-500' : 'bg-pink-500'
                    }`}
                  >
                    Risk: {photo.dangerLevel}%
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#5d4037]/50 mb-0.5">
                    Case File {photo.id}
                  </div>
                  <h4 className="font-serif italic text-base text-[#5d4037] line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-[#5d4037]/75 line-clamp-2 mt-0.5 italic leading-relaxed">
                    "{photo.memeComment}"
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-pink-100/80 flex items-center justify-between text-[11px] text-pink-500 font-semibold">
                <span>View Evidence</span>
                <Eye className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Note Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#f8bbd0]/30 p-6 sm:p-8 rounded-[36px] border border-pink-200/80 shadow-sm text-center relative overflow-hidden"
      >
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex justify-center gap-2">
            <PookieCharacter type="bear" size="md" mood="shy" />
            <PookieCharacter type="bunny" size="md" mood="happy" />
          </div>

          <p className="font-serif italic text-base sm:text-lg text-[#5d4037] leading-relaxed">
            "ye to hona hi tha...pictures are so beautiful even jijaji and papa says....dolly bhut acchi hai😂 ....jokes apart..maafi🙈."
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-[#5d4037] text-xs font-semibold uppercase tracking-wider">
            <span>Sister Privilege Unlocked: Zero Jail Time! ⚖️💖</span>
          </div>
        </div>
      </motion.div>

      {/* Modal Lightbox for Full View */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            {(() => {
              const photo = ROAST_MEMORIES.find((p) => p.id === selectedPhoto);
              if (!photo) return null;

              return (
                <motion.div
                  initial={{ scale: 0.85, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.85, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/95 backdrop-blur-md rounded-[36px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-pink-200 text-center relative"
                >
                  <div className="washi-tape-top" />
                  <div className="aspect-4/3 rounded-[24px] overflow-hidden bg-pink-50 border border-pink-200 relative mb-4 flex items-center justify-center">
                    {photo.imgSrc ? (
                      <img
                        src={photo.imgSrc}
                        alt={photo.title}
                        className="w-full h-full object-contain object-center"
                      />
                    ) : (
                      <ScrapbookImage
                        slotId={photo.id}
                        defaultFilename={photo.filename}
                        alt={photo.title}
                        fallbackTitle={photo.title}
                        fallbackSubtitle={`Evidence #${photo.id}`}
                        fallbackPookie="bear"
                      />
                    )}
                  </div>

                  <h3 className="font-serif italic text-2xl text-[#5d4037]">{photo.title}</h3>
                  <p className="text-sm text-[#5d4037]/80 mt-1 italic font-serif">"{photo.memeComment}"</p>
                  
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs rounded-full border border-pink-200 font-semibold">
                      {photo.sticker}
                    </span>
                    <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs rounded-full border border-rose-200 font-semibold">
                      Danger Score: {photo.dangerLevel}%
                    </span>
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      id="btn-close-lightbox"
                      className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-colors cursor-pointer shadow-md"
                    >
                      Close Case File 📂
                    </button>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            soundFX.playPop();
            onPrev();
          }}
          id="btn-page4-back"
          className="px-5 py-2.5 bg-white/70 hover:bg-pink-100 text-[#5d4037] text-xs uppercase tracking-wider font-semibold rounded-full border border-pink-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Chapter 3</span>
        </button>

        <button
          onClick={() => {
            soundFX.playPop();
            onNext();
          }}
          id="btn-page4-continue"
          className="px-6 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
        >
          <span>Continue to Chapter 5: Quiz &amp; Cake</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};