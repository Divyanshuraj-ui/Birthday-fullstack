import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { KeyRound, Sparkles, Lock, AlertCircle } from 'lucide-react';
import { PookieCharacter } from './PookieCharacter';
import { soundFX } from '../utils/audio';

interface LoginScreenProps {
  onUnlock: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const validCodes = ['2580'];

  const handleUnlock = (codeToTest?: string) => {
    const code = (codeToTest !== undefined ? codeToTest : passcode).trim();
    
    if (!code) {
      setErrorMsg('Please enter the secret code! 🌸');
      soundFX.playCuteBoing();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    if (validCodes.includes(code)) {
      // Valid!
      setErrorMsg('');
      soundFX.playSuccessFanfare();
      
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#ec4899', '#fbcfe8', '#fb7185', '#ffd1dc'],
      });

      setTimeout(() => {
        onUnlock();
      }, 500);
    } else {
      setErrorMsg('Incorrect secret code! Only someone who knows the key can enter 🙈');
      soundFX.playCuteBoing();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#fce4ec] relative overflow-hidden text-[#5d4037]">
      {/* Decorative background blurs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top right editorial verification pill */}
      <div className="absolute top-4 right-4 z-20 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-pink-200 text-xs font-medium flex items-center gap-2 shadow-xs text-[#5d4037]">
        <span>Gate: Security Protocol Active</span>
        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-[40px] p-7 sm:p-9 shadow-sm border border-pink-100 relative z-10 text-center"
      >
        <div className="washi-tape-top" />

        {/* Animated Pookie Mascot */}
        <div className="flex justify-center mb-2">
          <PookieCharacter
            type="bear"
            size="lg"
            mood={passcode.length > 0 ? 'winking' : 'happy'}
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-[11px] font-bold uppercase tracking-widest mb-3">
          <Lock className="w-3.5 h-3.5 text-pink-500" />
          <span>VIP Sister Access Only 🎀</span>
        </div>

        <div className="text-xs uppercase tracking-tight text-[#5d4037]/60 font-semibold mb-1">
          Welcome to Dolly's World
        </div>

        <h2 className="font-serif italic text-3xl sm:text-4xl text-[#5d4037] mb-2 leading-tight">
          Dolly Di's Vault 🗝️
        </h2>

        <p className="text-sm text-[#5d4037]/80 mb-6 leading-relaxed">
          A surprise birthday collection for the one and only <span className="font-serif italic font-bold text-pink-600">Dolly Di</span>! Enter the secret code to explore.
        </p>

        {/* Code Input Box */}
        <motion.div
          animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="relative">
            <input
              type="text"
              id="secret-passcode-input"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUnlock();
              }}
              placeholder="Enter Secret Key..."
              className="w-full text-center px-4 py-3.5 bg-white/70 border border-pink-200 rounded-full text-[#5d4037] placeholder-pink-300 font-sans text-base focus:outline-hidden focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all uppercase tracking-wider shadow-xs"
              autoFocus
            />
            <KeyRound className="w-4 h-4 text-pink-400 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-1 text-xs text-rose-600 font-medium bg-rose-50/80 p-2.5 rounded-2xl border border-rose-200"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Action Button */}
          <div className="pt-1">
            <button
              onClick={() => handleUnlock()}
              id="btn-unlock-vault"
              className="w-full py-3.5 px-6 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Unlock Birthday Surprise ✨</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
