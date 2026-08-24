import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ArrowLeft, Play, Pause, AlertCircle, Quote } from 'lucide-react';
import { PookieCharacter } from '../PookieCharacter';
import { ScrapbookImage } from '../ScrapbookImage';
import { SLIDING_MEMORIES } from '../../data/memoriesData';
import { soundFX } from '../../utils/audio';

interface Page3Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Page3Memories: React.FC<Page3Props> = ({ onNext, onPrev }) => {
  // Checkpoint gate: Has user clicked "Yes" to "Wanna Continue??"
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [showNoModal, setShowNoModal] = useState<boolean>(false);
  const [noCountdown, setNoCountdown] = useState<number>(5);

  // Carousel slider state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(true);

  // Auto-close 5-second timer when "No" modal is shown
  useEffect(() => {
    let timer: number;
    if (showNoModal && noCountdown > 0) {
      timer = window.setTimeout(() => {
        setNoCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showNoModal && noCountdown === 0) {
      setShowNoModal(false);
      setNoCountdown(5);
    }
    return () => clearTimeout(timer);
  }, [showNoModal, noCountdown]);

  // Slideshow auto-play
  useEffect(() => {
    let interval: number;
    if (hasConsented && isPlayingAuto) {
      interval = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % SLIDING_MEMORIES.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [hasConsented, isPlayingAuto]);

  const handleNoClick = () => {
    soundFX.playCuteBoing();
    setNoCountdown(5);
    setShowNoModal(true);
  };

  const handleYesClick = () => {
    soundFX.playSuccessFanfare();
    setHasConsented(true);
  };

  const nextSlide = () => {
    soundFX.playPop();
    setCurrentIndex((prev) => (prev + 1) % SLIDING_MEMORIES.length);
  };

  const prevSlide = () => {
    soundFX.playPop();
    setCurrentIndex((prev) => (prev - 1 + SLIDING_MEMORIES.length) % SLIDING_MEMORIES.length);
  };

  const currentMemory = SLIDING_MEMORIES[currentIndex];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 relative text-[#5d4037]">
      {/* If user hasn't clicked "Yes" yet, show the "Wanna Continue??" Gate */}
      {!hasConsented ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto bg-white/85 backdrop-blur-md rounded-[40px] p-8 sm:p-10 shadow-sm border border-pink-100 text-center relative overflow-hidden"
        >
          <div className="washi-tape-top" />

          <div className="flex justify-center mb-3">
            <PookieCharacter type="bunny" size="lg" mood="shy" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-[11px] font-bold uppercase tracking-widest mb-3">
            <span>Checkpoint 03 🎀</span>
          </div>

          <div className="text-xs uppercase tracking-tight text-[#5d4037]/60 font-semibold mb-1">
            Permission Required
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl text-[#5d4037] mb-2 leading-tight">
            Wanna Continue?? 🥺
          </h2>
          <p className="text-sm text-[#5d4037]/80 mb-6 italic leading-relaxed">
            A treasure chest of our favorite memories and photos is waiting right ahead for Dolly Di!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleYesClick}
              id="btn-wanna-continue-yes"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Yes! Of Course! 💖</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleNoClick}
              id="btn-wanna-continue-no"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-pink-50 text-[#5d4037] font-semibold text-xs border border-pink-200 shadow-xs transition-all cursor-pointer"
            >
              <span>No 🙈</span>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        /* The Unlocked Sliding Memories Showcase */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 text-pink-700 text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Chapter 03: The Golden Scrapbook of Memories 🌟</span>
            </div>

            <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#5d4037]">
              Shared Memories in <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Motion</span>
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#5d4037]/80">
              "From Holi gulal to festive lehengas and sisterly smiles!" 🌸
            </p>
          </div>

          {/* SLIDING GALLERY CREATIVE FRAME */}
          <div className="bg-white/85 backdrop-blur-md rounded-[40px] p-6 sm:p-8 shadow-sm border border-pink-100 relative overflow-hidden">
            {/* Washi Tape Header */}
            <div className="washi-tape-top" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Photo Display Frame with slide animation */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="relative w-full max-w-md aspect-4/3 rounded-[32px] overflow-hidden shadow-sm border-2 border-pink-100 bg-pink-50 group">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentMemory.id}
                      initial={{ opacity: 0, x: 40, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -40, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full relative"
                    >
                      {/* Direct image support: handles custom src or falls back to ScrapbookImage */}
                      {currentMemory.imgSrc ? (
                        <img
                          src={currentMemory.imgSrc}
                          alt={currentMemory.title}
                          className="w-full h-full object-contain object-center drop-shadow-md"
                          />
                      ) : (
                        <ScrapbookImage
                          slotId={currentMemory.id}
                          defaultFilename={currentMemory.filename}
                          alt={currentMemory.title}
                          fallbackTitle={currentMemory.title}
                          fallbackSubtitle={currentMemory.vibe}
                          fallbackPookie={currentIndex % 2 === 0 ? 'bear' : 'bunny'}
                        />
                      )}

                      {/* Tag Chip */}
                      <div className="absolute top-3 left-3 z-20 bg-pink-500/90 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-xs pointer-events-none">
                        {currentMemory.tag}
                      </div>

                      <div className="absolute bottom-3 left-3 z-20 bg-white/90 backdrop-blur-md text-[#5d4037] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs border border-pink-100 pointer-events-none">
                        Slide {currentIndex + 1} of {SLIDING_MEMORIES.length}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                </div>
                
                {/* Slider Controls */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={prevSlide}
                    id="btn-slide-prev"
                    className="p-2.5 rounded-full bg-white/80 hover:bg-pink-100 text-[#5d4037] border border-pink-200 transition-all cursor-pointer shadow-xs"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      soundFX.playPop();
                      setIsPlayingAuto(!isPlayingAuto);
                    }}
                    id="btn-slide-play-pause"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-pink-100 text-[#5d4037] text-[11px] font-semibold uppercase tracking-wider transition-all border border-pink-200 cursor-pointer shadow-xs"
                  >
                    {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingAuto ? 'Pause' : 'Autoplay'}</span>
                  </button>

                  <button
                    onClick={nextSlide}
                    id="btn-slide-next"
                    className="p-2.5 rounded-full bg-white/80 hover:bg-pink-100 text-[#5d4037] border border-pink-200 transition-all cursor-pointer shadow-xs"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Memory Details Description */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💖</span>
                  <div>
                    <h3 className="font-serif italic text-2xl text-[#5d4037]">
                      {currentMemory.title}
                    </h3>
                    <p className="text-xs text-pink-500 italic mt-0.5">{currentMemory.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#5d4037]/90 leading-relaxed italic bg-pink-50/70 p-4 rounded-2xl border border-pink-100 font-serif">
                  "{currentMemory.caption}"
                </p>

                {/* Thumbnails strip */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#5d4037]/50">
                      All Slides ({SLIDING_MEMORIES.length} Pictures):
                    </p>
                    <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider">
                      Slide {currentIndex + 1} of {SLIDING_MEMORIES.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                    {SLIDING_MEMORIES.map((mem, idx) => {
                      return (
                        <button
                          key={mem.id}
                          id={`btn-thumb-slide-${mem.id}`}
                          onClick={() => {
                            soundFX.playPop();
                            setCurrentIndex(idx);
                          }}
                          className={`w-9 h-9 shrink-0 rounded-xl text-xs font-bold transition-all border cursor-pointer relative ${
                            currentIndex === idx
                              ? 'bg-pink-500 text-white border-pink-600 scale-105 shadow-xs'
                              : 'bg-white/80 text-[#5d4037] hover:bg-pink-50 border-pink-200'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* EXACT SPECIAL NOTE FROM PROMPT */}
            <div className="mt-8 pt-6 border-t border-pink-100">
              <div className="bg-[#f8bbd0]/30 p-5 sm:p-6 rounded-[28px] border border-pink-200/80 relative">
                <Quote className="w-8 h-8 text-pink-400/40 absolute top-3 left-3 pointer-events-none" />
                <div className="relative z-10 text-center space-y-2">
                  <p className="font-serif italic text-base sm:text-lg text-[#5d4037] leading-relaxed">
                    "Tasveerein mahaj ek jariya hai insaan ki khoobsurati dikhane k liye...aap to khoobsurati se kahi badh k hai...In tasveeron ka kya ye to kuch dino baad aap ye khengi....are yrr mai pehle kitni gandi dikhti thi...this is what a girl can say😂...koi baat nhi ye to stree hone ki nishani hai😂"
                  </p>
                  <p className="font-serif italic text-base sm:text-lg font-bold text-pink-600 pt-1">
                    Khair Janamdiwas ki hardik Badhaiyan! 🎂🌸🎉
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                soundFX.playPop();
                onPrev();
              }}
              id="btn-page3-back"
              className="px-5 py-2.5 bg-white/70 hover:bg-pink-100 text-[#5d4037] text-xs uppercase tracking-wider font-semibold rounded-full border border-pink-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Chapter 2</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                onNext();
              }}
              id="btn-page3-continue"
              className="px-6 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Continue to Chapter 4: Jail Na Chala Jaun</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}

      {/* POPUP NOTIFICATION FOR "NO" CLICK */}
      <AnimatePresence>
        {showNoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="bg-white/95 backdrop-blur-md rounded-[36px] p-7 sm:p-9 max-w-md w-full shadow-2xl border border-pink-200 text-center relative"
            >
              <div className="flex justify-center mb-3">
                <PookieCharacter type="bear" size="lg" mood="shy" />
              </div>

              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#5d4037] leading-snug mb-3">
                "Dolly Di Aap bhut acche ho aisa mt kro🥺🥺...."
              </h3>

              <p className="text-xs text-pink-600 mb-5 italic">
                Bhai ne itni mehnat se banaya hai, please don't say no! 💖
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-semibold mb-4 border border-pink-100">
                <AlertCircle className="w-3.5 h-3.5 text-pink-500" />
                <span>Auto-resuming in {noCountdown}s...</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setShowNoModal(false);
                    setHasConsented(true);
                  }}
                  id="btn-modal-yes-override"
                  className="px-5 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md cursor-pointer"
                >
                  Acha Theek Hai, Continue! 💖
                </button>
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setShowNoModal(false);
                  }}
                  id="btn-modal-retry"
                  className="px-4 py-3 bg-white hover:bg-pink-50 text-[#5d4037] font-semibold rounded-full border border-pink-200 text-xs cursor-pointer"
                >
                  Close ({noCountdown}s)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};