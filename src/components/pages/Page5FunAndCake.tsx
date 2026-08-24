import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Cake, Sparkles, Heart, ArrowRight, ArrowLeft, Flame, Award, HelpCircle, CheckCircle2 } from 'lucide-react';
import { PookieCharacter } from '../PookieCharacter';
import { SISTER_QUIZ } from '../../data/memoriesData';
import { soundFX } from '../../utils/audio';

interface Page5Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Page5FunAndCake: React.FC<Page5Props> = ({ onNext, onPrev }) => {
  // Cake cutting & candles state
  const [candlesLit, setCandlesLit] = useState(true);
  const [cakeCut, setCakeCut] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const handleBlowCandles = () => {
    soundFX.playSuccessFanfare();
    setCandlesLit(false);
    setWishMade(true);

    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fb7185', '#ec4899', '#fde047', '#a855f7'],
    });
  };

  const handleCutCake = () => {
    soundFX.playPop();
    setCakeCut(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (quizAnswered) return;
    soundFX.playPop();
    setSelectedOption(optionIdx);
    setQuizAnswered(true);

    if (optionIdx === SISTER_QUIZ[currentQuizIndex].correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    soundFX.playPop();
    setSelectedOption(null);
    setQuizAnswered(false);
    if (currentQuizIndex < SISTER_QUIZ.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 text-[#5d4037]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 text-pink-700 text-xs uppercase tracking-widest font-semibold">
          <Cake className="w-3.5 h-3.5 text-pink-500" />
          <span>Chapter 05: Cake Cutting &amp; Sister Trivia 🎂✨</span>
        </div>

        <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#5d4037]">
          Make a Wish &amp; Blow the <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Candles</span>!
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#5d4037]/80">
          "A virtual birthday cake baked with 100% sisterly love!" 🍓
        </p>
      </motion.div>

      {/* Grid: Left Virtual Cake, Right Sister Trivia */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Virtual Birthday Cake Ceremony */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-6 bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[40px] shadow-sm border border-pink-100 text-center space-y-5 relative overflow-hidden"
        >
          <div className="washi-tape-top" />

          <div className="flex items-center justify-between border-b border-pink-100/80 pb-3">
            <h3 className="font-serif italic text-xl text-[#5d4037] flex items-center gap-2">
              <span>🎂</span>
              <span>Dolly Di's Birthday Cake</span>
            </h3>
            <span className="text-[11px] bg-pink-50 text-pink-700 border border-pink-200 font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
              {candlesLit ? 'Candles Lit 🔥' : 'Wish Made ✨'}
            </span>
          </div>

          {/* Interactive Cake Illustration */}
          <div className="py-4 flex flex-col items-center justify-center relative">
            <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
              <PookieCharacter
                type="cake"
                size="xl"
                animate={candlesLit}
              />
            </div>

            {/* Status Text */}
            <p className="font-serif italic text-base sm:text-lg text-[#5d4037] font-medium mt-3 px-4">
              {candlesLit
                ? '✨ Make a silent wish in your heart, then blow out the candles! ✨'
                : cakeCut
                ? '🍰 First virtual slice served to Dolly Di with lots of love!'
                : '🎉 Yay! Your wish is on its way to coming true! Now cut the cake!'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            {candlesLit ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBlowCandles}
                id="btn-blow-candles"
                className="w-full py-3.5 px-6 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Flame className="w-4 h-4 text-amber-200 animate-bounce" />
                <span>Blow the Candles 💨🎂</span>
              </motion.button>
            ) : !cakeCut ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCutCake}
                id="btn-cut-cake"
                className="w-full py-3.5 px-6 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Cut the Birthday Cake 🔪🍰</span>
              </motion.button>
            ) : (
              <div className="w-full py-3.5 px-4 bg-pink-50 rounded-full text-[#5d4037] border border-pink-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Cake Cut &amp; Celebrated with Family! 🥳</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Fun Sibling Trivia Quiz */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-6 bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[40px] shadow-sm border border-pink-100 space-y-4 relative"
        >
          <div className="washi-tape-top" />

          <div className="flex items-center justify-between border-b border-pink-100/80 pb-3">
            <h3 className="font-serif italic text-xl text-[#5d4037] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-pink-500" />
              <span>Dolly Di Trivia Quiz</span>
            </h3>
            <span className="text-[11px] bg-pink-50 text-pink-700 border border-pink-200 font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
              Q {currentQuizIndex + 1}/{SISTER_QUIZ.length}
            </span>
          </div>

          <div className="space-y-3">
            <p className="font-serif italic text-base sm:text-lg text-[#5d4037] leading-snug">
              {SISTER_QUIZ[currentQuizIndex].question}
            </p>

            {/* Options */}
            <div className="space-y-2 pt-1">
              {SISTER_QUIZ[currentQuizIndex].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === SISTER_QUIZ[currentQuizIndex].correctIndex;
                let btnStyle = 'bg-white/80 hover:bg-pink-50 border-pink-200 text-[#5d4037]';

                if (quizAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-semibold';
                  } else {
                    btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={quizAnswered}
                    onClick={() => handleQuizAnswer(idx)}
                    id={`btn-quiz-option-${idx}`}
                    className={`w-full p-3.5 rounded-2xl border text-left font-serif text-sm transition-all flex items-center justify-between cursor-pointer shadow-xs ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {quizAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Funny Explanation after answer */}
            <AnimatePresence>
              {quizAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#f8bbd0]/30 rounded-2xl border border-pink-200/80 text-center space-y-2"
                >
                  <p className="text-xs font-serif italic text-[#5d4037]">
                    "{SISTER_QUIZ[currentQuizIndex].funnyReaction}"
                  </p>
                  {currentQuizIndex < SISTER_QUIZ.length - 1 && (
                    <button
                      onClick={nextQuizQuestion}
                      id="btn-quiz-next-q"
                      className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-[11px] uppercase tracking-wider rounded-full shadow-xs cursor-pointer"
                    >
                      Next Question ➡️
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => {
            soundFX.playPop();
            onPrev();
          }}
          id="btn-page5-back"
          className="px-5 py-2.5 bg-white/70 hover:bg-pink-100 text-[#5d4037] text-xs uppercase tracking-wider font-semibold rounded-full border border-pink-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Chapter 4</span>
        </button>

        <button
          onClick={() => {
            soundFX.playPop();
            onNext();
          }}
          id="btn-page5-continue"
          className="px-6 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
        >
          <span>Continue to Final Chapter: Grand Wishes</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
