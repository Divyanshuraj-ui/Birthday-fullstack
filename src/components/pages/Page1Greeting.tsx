import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight, PartyPopper } from 'lucide-react';
import { PookieCharacter } from '../PookieCharacter';
import { ScrapbookImage } from '../ScrapbookImage';
import { soundFX } from '../../utils/audio';

interface Page1Props {
  onNext: () => void;
}

export const Page1Greeting: React.FC<Page1Props> = ({ onNext }) => {
  const [heartFound, setHeartFound] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const triggerHiddenHeart = () => {
    soundFX.playSuccessFanfare();
    setHeartFound(true);
    setClickCount((prev) => prev + 1);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#ffe4e8', '#ffd700'],
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 relative text-[#5d4037]">
      {/* Animated Entrance Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="space-y-8"
      >
        {/* Top Badges & Pookie Mascot Greeting */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 shadow-xs text-pink-700 text-xs uppercase tracking-widest font-semibold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
            <span>Official Sibling Celebration Special 🎀</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <PookieCharacter type="bunny" size="md" mood="happy" />
            <PookieCharacter type="bear" size="lg" mood="winking" />
            <PookieCharacter type="kitty" size="md" mood="happy" />
          </div>

          <div className="text-xs uppercase tracking-tight opacity-60 font-semibold mb-1">
            Welcome Back Dolly Di.. haha
          </div>

          {/* EXACT HEAD TITLE WITH EDITORIAL SERIF AESTHETIC */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#5d4037] leading-tight max-w-4xl tracking-tight"
          >
            Happy Birthday{' '}
            <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">
              "Whatever"
            </span>{' '}
            😂<br />
            I mean <span className="text-pink-600">Dolly Di..hahahha</span>
          </motion.h1>

          <p className="text-base sm:text-lg italic opacity-80 mt-2 font-serif text-[#5d4037]">
            ✨ Sibling Banter + Pure Love + Infinite Celebrations ✨
          </p>
        </div>

        {/* Central Content Grid: Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          {/* Left: Featured Photo with Editorial Polaroid Frame */}
          <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.45, duration: 0.6 }}
  className="lg:col-span-6 flex justify-center"
>
  <div className="relative group max-w-md w-full">
    <div className="washi-tape-top" />

    <div className="bg-white/85 backdrop-blur-md p-5 pb-7 rounded-[40px] shadow-sm border border-pink-100 rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300 flex flex-col h-full justify-between">
      <div className="relative aspect-4/3 rounded-[28px] overflow-hidden bg-pink-50 border border-pink-200/80">
        
        {/* Direct Image Implementation */}
        <img
          src="123.jpeg"
          alt="Dolly Di - Birthday Queen"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlaid Stamps / Badges */}
        <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-pink-600 shadow-xs flex items-center gap-1 border border-pink-100 pointer-events-none">
          <span>🤍</span>
          <span>Lovely</span>
        </div>
        <div className="absolute bottom-3 left-3 z-20 bg-pink-500/90 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-xs pointer-events-none">
          Sweetest Smile Di 🌸
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#5d4037]/50 mb-1">
          Captured Moment • Scene 01 (123.jpeg)
        </div>
        <p className="font-serif italic text-xl text-[#5d4037]">
          "Smile so sweet it brightens our entire world!" 💫
        </p>
        <p className="text-xs text-pink-500 italic mt-0.5">
          The Signature Dolly Di Radiance
        </p>
      </div>
    </div>
  </div>
</motion.div>
          {/* Right: Warm Wishes & Heartfelt Sibling Love Note */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="lg:col-span-6 space-y-5 flex flex-col justify-between"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-[40px] p-7 sm:p-8 shadow-sm border border-pink-100 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="absolute -top-10 -right-10 opacity-20 w-40 h-40 bg-pink-300 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-pink-100/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💌</span>
                    <h3 className="font-serif italic text-2xl text-[#5d4037]">
                      Warm Wishes
                    </h3>
                  </div>
                  <span className="text-[10px] bg-pink-100 text-pink-700 px-3 py-1 rounded-full uppercase font-bold tracking-widest">
                    Favorite Sibling Note
                  </span>
                </div>

                <div className="space-y-3.5 text-[#5d4037] leading-relaxed text-sm sm:text-base">
                  <p className="italic">
                    Dear <span className="font-bold text-pink-600 not-italic">Dolly Di</span>, wishing you the happiest, sweetest, and most joyful birthday ever! 🎉
                  </p>
                  <p className="italic opacity-85">
                    You're not just my sister, you're the person who knows all my secrets (unfortunately) and still loves me. From calling you <em>"Whatever😂"</em> to always trusting your guidance and care, here's to another year of us being the best duo!
                  </p>
                  <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-100 text-[#5d4037] text-xs sm:text-sm font-medium italic">
                    🌸 May this new year bring you endless smiles, delicious treats, wardrobe upgrades, stress-free days, and infinite happiness!
                  </div>
                </div>

                {/* HIDDEN HEART BUTTON SECTION */}
                <div className="mt-5 pt-4 border-t border-pink-100/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-pink-600 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                      <span>Press for Love:</span>
                    </p>
                    <p className="text-xs text-[#5d4037]/70 italic">
                      Click the glowing hidden heart button for a surprise!
                    </p>
                  </div>

                  {/* THE HIDDEN HEART BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerHiddenHeart}
                    id="btn-hidden-heart-trigger"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
                    title="Click for Love!"
                  >
                    <Heart className={`w-4 h-4 ${heartFound ? 'fill-white' : 'fill-pink-200'}`} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {heartFound ? `Loved (${clickCount}x)` : 'Press for Love'}
                    </span>
                  </motion.button>
                </div>

                {/* Heart Found Celebration Card */}
                <AnimatePresence>
                  {heartFound && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0 }}
                      className="mt-3 p-3 bg-pink-50/90 rounded-2xl border border-pink-200 text-center"
                    >
                      <p className="text-xs font-semibold text-pink-700 flex items-center justify-center gap-1.5">
                        <PartyPopper className="w-4 h-4 text-pink-500" />
                        <span>Confetti Shower! Sibling love sent to Dolly Di! (x{clickCount}) 💖</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Next Chapter Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  soundFX.playPop();
                  onNext();
                }}
                id="btn-page1-continue"
                className="px-6 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Continue to Chapter 2: The Science of Gorgeous</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

