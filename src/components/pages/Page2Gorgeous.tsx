import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Atom } from 'lucide-react';
import { PookieCharacter } from '../PookieCharacter';
import { ScrapbookImage } from '../ScrapbookImage';
import { GORGEOUS_ELEMENTS } from '../../data/memoriesData';
import { soundFX } from '../../utils/audio';

interface Page2Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Page2Gorgeous: React.FC<Page2Props> = ({ onNext, onPrev }) => {
  const [selectedElement, setSelectedElement] = useState<number | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 text-[#5d4037]">
      {/* Chapter Title & Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 text-pink-700 text-xs uppercase tracking-widest font-semibold">
          <Atom className="w-3.5 h-3.5 text-pink-500 animate-spin" />
          <span>Scientific Fact Confirmed By NASA &amp; Family 🧪✨</span>
        </div>

        <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#5d4037]">
          The Science of <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">G-O-R-Ge-O-U-S</span>
        </h2>
        <p className="font-serif italic text-lg sm:text-xl text-[#5d4037]/80">
          "Periodic Table Proof that Dolly Di is 100% pure beauty!" 💖
        </p>
      </motion.div>

      {/* GORGEOUS.PNG Chemistry Interactive Breakdown Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md p-7 sm:p-9 rounded-[40px] shadow-sm border border-pink-100 relative overflow-hidden"
      >
        {/* Editorial Mascot Header */}
        <div className="flex items-center justify-between mb-4 border-b border-pink-100/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔬</span>
            <div>
              <h3 className="font-serif italic text-xl text-[#5d4037]">
                Elemental Formula of Dolly Di
              </h3>
              <p className="text-[11px] text-[#5d4037]/60 uppercase tracking-wider font-semibold">Tap on any chemical element box to uncover its meaning</p>
            </div>
          </div>
          <PookieCharacter type="kitty" size="sm" mood="winking" />
        </div>

        {/* The Famous Quote */}
        <div className="bg-[#f8bbd0]/30 p-5 sm:p-6 rounded-[28px] border border-pink-200/80 text-center mb-6">
          <p className="font-serif italic text-base sm:text-lg text-[#5d4037] leading-relaxed">
            “You must be made of{' '}
            <span className="font-bold text-pink-600 not-italic">Gallium</span>,{' '}
            <span className="font-bold text-pink-600 not-italic">Oxygen</span>,{' '}
            <span className="font-bold text-pink-600 not-italic">Rhodium</span>,{' '}
            <span className="font-bold text-pink-600 not-italic">Germanium</span>,{' '}
            <span className="font-bold text-pink-600 not-italic">Oxygen</span>,{' '}
            <span className="font-bold text-pink-600 not-italic">Uranium</span> and{' '}
            <span className="font-bold text-pink-600 not-italic">Sulfur</span>...{' '}
            because you're <span className="font-bold text-pink-600 not-italic tracking-wider uppercase">G O R Ge O U S</span>!”
          </p>
        </div>

        {/* Periodic Table Chemistry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {GORGEOUS_ELEMENTS.map((el, index) => {
            const isSelected = selectedElement === index;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedElement(isSelected ? null : index);
                }}
                className={`p-3.5 rounded-2xl text-center border transition-all flex flex-col items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-pink-500 text-white border-pink-600 shadow-md ring-2 ring-pink-200'
                    : 'bg-white/90 hover:bg-pink-50 text-[#5d4037] border-pink-200/80'
                }`}
              >
                <div className="flex justify-between w-full text-[10px] opacity-60 font-mono">
                  <span>{el.atomicNumber}</span>
                  <span>{el.atomicMass}</span>
                </div>
                <div className="my-1">
                  <span className={`font-serif italic text-2xl sm:text-3xl font-bold ${isSelected ? 'text-white' : 'text-pink-500'}`}>
                    {el.symbol}
                  </span>
                </div>
                <div className="w-full">
                  <span className="text-[10px] uppercase tracking-wider font-semibold block truncate opacity-80">{el.name}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Element Detail Card */}
        {selectedElement !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-4 bg-white/90 rounded-2xl border border-pink-200 text-center shadow-xs"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
              Element {GORGEOUS_ELEMENTS[selectedElement].symbol} ({GORGEOUS_ELEMENTS[selectedElement].name}):
            </span>
            <p className="text-sm text-[#5d4037] mt-1 font-serif italic">
              "{GORGEOUS_ELEMENTS[selectedElement].description}"
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Featured Images: 12.jpeg and one.jpeg with Editorial Gallery Frames */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#5d4037]/50 mb-1">
            Gallery Showcase
          </div>
          <h3 className="font-serif italic text-2xl sm:text-3xl text-[#5d4037] flex items-center justify-center gap-2">
            <span>✨ Exhibition of Perfection ✨</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#5d4037]/70 italic mt-0.5">
            Featuring high-glam traditional moments: <strong>12.jpeg</strong> &amp; <strong>one.jpeg</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Card 1: 12.jpeg (Peach Outfit with Sibling Smiles) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="relative group"
          >
            <div className="washi-tape-top" />
            <div className="bg-white/85 backdrop-blur-md p-5 pb-6 rounded-[36px] shadow-sm border border-pink-100 rotate[-1deg] group-hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-pink-50 border border-pink-200/80">
                <img
                  src="src/images/12.jpeg"
                  alt="Dolly Di in Peach Outfit"
                  className="w-full h-full object-cover object-center"
                  />
                
                <ScrapbookImage
                  slotId="12"
                  defaultFilename="12.jpeg"
                  alt="Dolly Di in Peach Outfit"
                  fallbackTitle="12.jpeg"
                  fallbackSubtitle="Peach Outfit • Sibling Smiles 💖"
                  fallbackPookie="bunny"
                />

                <div className="absolute top-3 left-3 z-20 bg-pink-500/90 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full shadow-xs pointer-events-none">
                  Peach Glam ✨
                </div>
              </div>

              <div className="mt-3.5 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#5d4037]/50">
                  Scene 01: Perfection 
                </div>
                <h4 className="font-serif italic text-xl text-[#5d4037] mt-0.5">
                  The Royal Peach Ensemble 👑
                </h4>
                <p className="text-xs text-pink-500 italic mt-0.5">
                  "Effortlessly stunning, always radiant!"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: one.jpeg (Orange Lehenga/Bridal Glam Beauty) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="relative group"
          >
            <div className="washi-tape-top" />
            <div className="bg-white/85 backdrop-blur-md p-5 pb-6 rounded-[36px] shadow-sm border border-pink-100 rotate-1 group-hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-pink-50 border border-pink-200/80">
                <img
                  src="src/images/18.jpeg"
                  alt="Dolly Di in Peach Outfit"
                  className="w-full h-full object-cover object-center"
                  />
                
                <ScrapbookImage
                  slotId="one"
                  defaultFilename="one.jpeg"
                  alt="Dolly Di in Festive Outfit (one.jpeg)"
                  fallbackTitle="one.jpeg"
                  fallbackSubtitle="Grand Festive Splendor 🌟"
                  fallbackPookie="bear"
                />

                <div className="absolute top-3 left-3 z-20 bg-pink-500/90 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full shadow-xs pointer-events-none">
                  Slide B • 10/10 💎
                </div>
              </div>

              <div className="mt-3.5 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#5d4037]/50">
                  Slide B: Captured 
                </div>
                <h4 className="font-serif italic text-xl text-[#5d4037] mt-0.5">
                  Festive Orange &amp; Gold Sparkle 🪔
                </h4>
                <p className="text-xs text-pink-500 italic mt-0.5">
                  "No camera filter needed when you shine like this!"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => {
            soundFX.playPop();
            onPrev();
          }}
          id="btn-page2-back"
          className="px-5 py-2.5 bg-white/70 hover:bg-pink-100 text-[#5d4037] text-xs uppercase tracking-wider font-semibold rounded-full border border-pink-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Chapter 1</span>
        </button>

        <button
          onClick={() => {
            soundFX.playPop();
            onNext();
          }}
          id="btn-page2-continue"
          className="px-6 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
        >
          <span>Continue to Chapter 3</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

