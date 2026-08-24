import React from 'react';
import { motion } from 'motion/react';

interface PookieProps {
  type?: 'bear' | 'bunny' | 'kitty' | 'cake' | 'gift' | 'bow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'winking' | 'eating' | 'shy' | 'celebrating';
  className?: string;
  animate?: boolean;
}

export const PookieCharacter: React.FC<PookieProps> = ({
  type = 'bear',
  size = 'md',
  mood = 'happy',
  className = '',
  animate = true,
}) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44',
  };

  const getCharacterContent = () => {
    switch (type) {
      case 'bunny':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Long Bunny Ears */}
            <motion.path
              d="M 50 70 C 40 10, 65 5, 70 65 Z"
              fill="#FFE4E8"
              stroke="#F472B6"
              strokeWidth="4"
              animate={animate ? { rotate: [-2, 3, -2] } : undefined}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
            <path d="M 55 60 C 48 20, 62 18, 66 58 Z" fill="#FBCFE8" />

            <motion.path
              d="M 110 70 C 120 10, 95 5, 90 65 Z"
              fill="#FFE4E8"
              stroke="#F472B6"
              strokeWidth="4"
              animate={animate ? { rotate: [2, -3, 2] } : undefined}
              transition={{ repeat: Infinity, duration: 2.7, ease: 'easeInOut' }}
            />
            <path d="M 105 60 C 112 20, 98 18, 94 58 Z" fill="#FBCFE8" />

            {/* Bunny Head */}
            <circle cx="80" cy="95" r="48" fill="#FFF5F7" stroke="#F472B6" strokeWidth="4" />

            {/* Pink Bow on ear */}
            <g transform="translate(48, 55) scale(0.65)">
              <polygon points="0,0 20,-10 20,10" fill="#EC4899" />
              <polygon points="0,0 -20,-10 -20,10" fill="#EC4899" />
              <circle cx="0" cy="0" r="6" fill="#BE185D" />
            </g>

            {/* Eyes */}
            {mood === 'winking' ? (
              <>
                <circle cx="64" cy="92" r="5" fill="#4A2835" />
                <path d="M 90 92 Q 96 85 102 92" stroke="#4A2835" strokeWidth="4" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <circle cx="64" cy="92" r="5.5" fill="#4A2835" />
                <circle cx="62" cy="90" r="2" fill="#FFFFFF" />
                <circle cx="96" cy="92" r="5.5" fill="#4A2835" />
                <circle cx="94" cy="90" r="2" fill="#FFFFFF" />
              </>
            )}

            {/* Blush cheeks */}
            <ellipse cx="54" cy="102" rx="7" ry="4" fill="#FDA4AF" opacity="0.8" />
            <ellipse cx="106" cy="102" rx="7" ry="4" fill="#FDA4AF" opacity="0.8" />

            {/* Cute nose & mouth */}
            <polygon points="80,98 76,94 84,94" fill="#F43F5E" />
            <path d="M 76 102 Q 80 106 84 102" stroke="#4A2835" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Tiny Heart above head */}
            <motion.path
              d="M 80 28 C 76 22, 68 22, 68 30 C 68 37, 80 44, 80 44 C 80 44, 92 37, 92 30 C 92 22, 84 22, 80 28 Z"
              fill="#F43F5E"
              animate={animate ? { y: [-3, 3, -3], scale: [0.95, 1.1, 0.95] } : undefined}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
          </svg>
        );

      case 'kitty':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Kitty Cat Ears */}
            <polygon points="45,70 30,30 75,50" fill="#FFE4E8" stroke="#F472B6" strokeWidth="4" strokeLinejoin="round" />
            <polygon points="48,65 38,40 68,52" fill="#FDA4AF" />

            <polygon points="115,70 130,30 85,50" fill="#FFE4E8" stroke="#F472B6" strokeWidth="4" strokeLinejoin="round" />
            <polygon points="112,65 122,40 92,52" fill="#FDA4AF" />

            {/* Head */}
            <circle cx="80" cy="95" r="48" fill="#FFF5F7" stroke="#F472B6" strokeWidth="4" />

            {/* Whiskers */}
            <line x1="40" y1="96" x2="20" y2="92" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="40" y1="102" x2="20" y2="105" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="120" y1="96" x2="140" y2="92" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="120" y1="102" x2="140" y2="105" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />

            {/* Eyes */}
            <circle cx="64" cy="92" r="5.5" fill="#4A2835" />
            <circle cx="62" cy="89.5" r="2" fill="#FFFFFF" />
            <circle cx="96" cy="92" r="5.5" fill="#4A2835" />
            <circle cx="94" cy="89.5" r="2" fill="#FFFFFF" />

            {/* Blush */}
            <ellipse cx="54" cy="102" rx="7" ry="4" fill="#FDA4AF" opacity="0.85" />
            <ellipse cx="106" cy="102" rx="7" ry="4" fill="#FDA4AF" opacity="0.85" />

            {/* Mouth */}
            <path d="M 74 100 Q 80 104 80 98 Q 80 104 86 100" stroke="#4A2835" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Party Hat */}
            <polygon points="80,20 62,60 98,60" fill="#F472B6" stroke="#DB2777" strokeWidth="3" />
            <circle cx="80" cy="18" r="6" fill="#FBBF24" />
            <line x1="68" y1="45" x2="92" y2="45" stroke="#FFF" strokeWidth="2.5" />
          </svg>
        );

      case 'cake':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-lg">
            {/* Cake plate */}
            <ellipse cx="80" cy="138" rx="65" ry="12" fill="#FBCFE8" stroke="#F472B6" strokeWidth="3" />

            {/* Bottom tier */}
            <rect x="35" y="95" width="90" height="40" rx="8" fill="#FFF0F5" stroke="#F472B6" strokeWidth="3.5" />
            <path d="M 35 105 Q 45 115 55 105 Q 65 115 75 105 Q 85 115 95 105 Q 105 115 115 105 Q 120 115 125 105 L 125 95 L 35 95 Z" fill="#F472B6" />

            {/* Top tier */}
            <rect x="50" y="65" width="60" height="32" rx="6" fill="#FFF5F7" stroke="#F472B6" strokeWidth="3" />
            <path d="M 50 73 Q 60 81 70 73 Q 80 81 90 73 Q 100 81 110 73 L 110 65 L 50 65 Z" fill="#FB7185" />

            {/* Berries / Frosting cherries */}
            <circle cx="62" cy="65" r="5" fill="#E11D48" />
            <circle cx="80" cy="65" r="5" fill="#E11D48" />
            <circle cx="98" cy="65" r="5" fill="#E11D48" />

            {/* Candles */}
            <rect x="68" y="44" width="4" height="20" fill="#FBBF24" rx="1" />
            <rect x="78" y="40" width="4" height="24" fill="#F472B6" rx="1" />
            <rect x="88" y="44" width="4" height="20" fill="#60A5FA" rx="1" />

            {/* Candle Flames */}
            <motion.ellipse
              cx="70"
              cy="38"
              rx="4"
              ry="6"
              fill="#F59E0B"
              animate={animate ? { scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] } : undefined}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            <motion.ellipse
              cx="80"
              cy="34"
              rx="4.5"
              ry="7"
              fill="#EF4444"
              animate={animate ? { scale: [1.2, 0.9, 1.2], opacity: [1, 0.7, 1] } : undefined}
              transition={{ repeat: Infinity, duration: 0.9 }}
            />
            <motion.ellipse
              cx="90"
              cy="38"
              rx="4"
              ry="6"
              fill="#F59E0B"
              animate={animate ? { scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] } : undefined}
              transition={{ repeat: Infinity, duration: 0.75 }}
            />
          </svg>
        );

      case 'bear':
      default:
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Bear Ears */}
            <circle cx="48" cy="58" r="22" fill="#FFE4E8" stroke="#F472B6" strokeWidth="4" />
            <circle cx="48" cy="58" r="12" fill="#FDA4AF" />

            <circle cx="112" cy="58" r="22" fill="#FFE4E8" stroke="#F472B6" strokeWidth="4" />
            <circle cx="112" cy="58" r="12" fill="#FDA4AF" />

            {/* Head */}
            <circle cx="80" cy="94" r="50" fill="#FFF5F7" stroke="#F472B6" strokeWidth="4" />

            {/* Snout Area */}
            <ellipse cx="80" cy="100" rx="20" ry="14" fill="#FFE4E8" />

            {/* Nose */}
            <polygon points="80,95 74,90 86,90" fill="#4A2835" />
            {/* Mouth */}
            <path d="M 75 97 Q 80 102 85 97" stroke="#4A2835" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Eyes */}
            {mood === 'winking' ? (
              <>
                <circle cx="62" cy="85" r="5.5" fill="#4A2835" />
                <circle cx="60" cy="83" r="2" fill="#FFFFFF" />
                <path d="M 92 85 Q 98 78 104 85" stroke="#4A2835" strokeWidth="4" strokeLinecap="round" fill="none" />
              </>
            ) : mood === 'shy' ? (
              <>
                <path d="M 56 86 Q 62 80 68 86" stroke="#4A2835" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 92 86 Q 98 80 104 86" stroke="#4A2835" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <circle cx="62" cy="85" r="5.5" fill="#4A2835" />
                <circle cx="60" cy="82.5" r="2" fill="#FFFFFF" />
                <circle cx="98" cy="85" r="5.5" fill="#4A2835" />
                <circle cx="96" cy="82.5" r="2" fill="#FFFFFF" />
              </>
            )}

            {/* Blush cheeks */}
            <ellipse cx="50" cy="98" rx="8" ry="5" fill="#FDA4AF" opacity="0.85" />
            <ellipse cx="110" cy="98" rx="8" ry="5" fill="#FDA4AF" opacity="0.85" />

            {/* Cute Birthday Party Hat with Pom-pom */}
            <polygon points="80,16 65,52 95,52" fill="#EC4899" stroke="#BE185D" strokeWidth="3" />
            <line x1="70" y1="40" x2="90" y2="40" stroke="#FFF" strokeWidth="3" />
            <circle cx="80" cy="14" r="7" fill="#FBBF24" />

            {/* Little floating stars / hearts */}
            <motion.path
              d="M 125 45 L 127 51 L 133 53 L 127 55 L 125 61 L 123 55 L 117 53 L 123 51 Z"
              fill="#FBBF24"
              animate={animate ? { rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] } : undefined}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className={`inline-block select-none ${sizeMap[size]} ${className}`}
      animate={animate ? { y: [-4, 4, -4] } : undefined}
      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
    >
      {getCharacterContent()}
    </motion.div>
  );
};
