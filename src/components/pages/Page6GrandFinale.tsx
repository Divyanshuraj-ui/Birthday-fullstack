import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, PartyPopper, RotateCcw, Mail, Star, Cake, Volume2 } from 'lucide-react';
import { PookieCharacter } from '../PookieCharacter';
import { soundFX } from '../../utils/audio';

interface Page6Props {
  onRestart: () => void;
}

export const Page6GrandFinale: React.FC<Page6Props> = ({ onRestart }) => {
  const [letterOpen, setLetterOpen] = useState(false);
  const [wishesCount, setWishesCount] = useState(1);

  const fireGrandConfetti = () => {
    soundFX.playSuccessFanfare();
    setWishesCount((prev) => prev + 1);

    // Multi-angle grand confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f472b6', '#ec4899', '#f43f5e', '#fb7185', '#ffe4e8', '#ffd700', '#c084fc'],
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.25),
      spread: 26,
      startVelocity: 55,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.2),
      spread: 60,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.35),
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 text-[#5d4037]">
      {/* Grand Title & Pookie Squad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 text-pink-700 text-xs uppercase tracking-widest font-semibold">
          <PartyPopper className="w-3.5 h-3.5 text-pink-500" />
          <span>Grand Birthday Finale &amp; Pookie Squad Wishes 🎀✨</span>
        </div>

        <h2 className="font-serif italic text-3xl sm:text-4xl md:text-6xl text-[#5d4037] leading-tight">
          Happy Birthday, <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Dolly Di</span>! 👑🎂💖
        </h2>

        <p className="font-serif italic text-base sm:text-xl text-[#5d4037]/80">
          "May your year be as sweet, radiant, and wonderful as you are!"
        </p>

        {/* The Entire Pookie Squad in full celebration! */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-4">
          <PookieCharacter type="bunny" size="lg" mood="celebrating" />
          <PookieCharacter type="bear" size="xl" mood="winking" />
          <PookieCharacter type="cake" size="lg" />
          <PookieCharacter type="kitty" size="lg" mood="happy" />
        </div>
      </motion.div>

      {/* Summary Scrapbook Card with Interactive Love Letter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Sibling Promise & Wishes Envelope */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[40px] shadow-sm border border-pink-100 relative overflow-hidden"
        >
          <div className="washi-tape-top" />

          <div className="flex items-center justify-between border-b border-pink-100/80 pb-3 mb-4">
            <h3 className="font-serif italic text-xl text-[#5d4037] flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-500" />
              <span>A Special Letter for Dolly Di</span>
            </h3>
            <button
              onClick={() => {
                soundFX.playPop();
                setLetterOpen(!letterOpen);
              }}
              id="btn-toggle-unfold-letter"
              className="text-xs px-3.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold uppercase tracking-wider rounded-full border border-pink-200 transition-colors cursor-pointer"
            >
              {letterOpen ? 'Fold Letter ✉️' : 'Unfold Letter 💌'}
            </button>
          </div>

          {/* Letter Content */}
          <div className="space-y-4 text-[#5d4037] leading-relaxed">
            <p className="font-serif italic font-medium text-lg text-[#5d4037]">
              Dearest <span className="font-bold text-pink-600">Dolly Di</span>,
            </p>

            <p className="text-sm sm:text-base font-serif italic text-[#5d4037]/90 leading-relaxed">
              Thank you for being the most supportive, funny, patient, and caring elder sister anyone could ever ask for. Through every Holi celebration, every family wedding outfit debate, every late night gossip call, and every funny sheet mask moment — you make our family complete and joyful!
            </p>

            <AnimatePresence>
              {letterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-2 text-sm sm:text-base border-t border-pink-100/80"
                >
                  <p className="bg-[#f8bbd0]/30 p-4 rounded-2xl border border-pink-200/80 text-[#5d4037] italic font-serif text-base sm:text-lg">
                    "No matter how old we get, or how much I tease you about 'Whatever😂' or 'Jail Na Chala Jaun', you will always remain our queen and the best Di in the universe!"
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-pink-600">
                    Always here for you, in laughter, drama, shopping, and endless celebration!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-2 text-right">
              <p className="font-serif italic text-xl text-pink-600">
                With all my love &amp; respect,
              </p>
              <p className="text-xs uppercase tracking-widest font-bold text-[#5d4037]/70 mt-1">
                Your Everlasting Partner-In-Crime 💖
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: Interactive Celebrations & Confetti Cannon */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 space-y-5"
        >
          {/* Confetti Blast Box */}
          <div className="bg-white/85 backdrop-blur-md p-6 sm:p-7 rounded-[40px] shadow-sm border border-pink-100 text-center space-y-4">
            <h4 className="font-serif italic text-xl text-[#5d4037] flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Birthday Shower Cannon</span>
            </h4>

            <p className="text-xs text-[#5d4037]/80 italic">
              Press the magic celebration button to blast infinite pastel confetti &amp; sound fanfares!
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={fireGrandConfetti}
              id="btn-grand-confetti-blast"
              className="w-full py-4 px-6 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PartyPopper className="w-4 h-4 animate-bounce" />
              <span>Blast Grand Confetti! 🎉 ({wishesCount})</span>
            </motion.button>

            {/* Quick Sibling Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-semibold text-[#5d4037]">
              <div className="p-2.5 bg-pink-50/70 rounded-2xl border border-pink-100">
                👑 Best Elder Sister
              </div>
              <div className="p-2.5 bg-pink-50/70 rounded-2xl border border-pink-100">
                ✨ 100% G-O-R-Ge-O-U-S
              </div>
              <div className="p-2.5 bg-pink-50/70 rounded-2xl border border-pink-100">
                🍰 Lifetime Sweets Pass
              </div>
              <div className="p-2.5 bg-pink-50/70 rounded-2xl border border-pink-100">
                🎀 Pookie Approved
              </div>
            </div>
          </div>

          {/* Replay Scrapbook Action */}
          <div className="bg-[#f8bbd0]/30 p-5 rounded-[32px] border border-pink-200/80 text-center space-y-3">
            <p className="font-serif italic text-base text-[#5d4037]">
              Loved the memory tour?
            </p>
            <button
              onClick={() => {
                soundFX.playPop();
                onRestart();
              }}
              id="btn-restart-scrapbook"
              className="px-6 py-3 bg-white hover:bg-pink-50 text-[#5d4037] text-xs uppercase tracking-wider font-semibold rounded-full shadow-xs border border-pink-200 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay from Chapter 1 🔄</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
