import React from 'react';
import { motion } from 'motion/react';

export const FloatingDecorations: React.FC = () => {
  // Pre-calculated fixed positions so no hydration mismatch
  const items = [
    { type: 'heart', top: '10%', left: '4%', size: 'text-2xl', delay: 0, duration: 4 },
    { type: 'sparkle', top: '22%', right: '6%', size: 'text-xl', delay: 1, duration: 3.5 },
    { type: 'balloon', top: '65%', left: '5%', size: 'text-3xl', delay: 2, duration: 5 },
    { type: 'bow', top: '80%', right: '7%', size: 'text-2xl', delay: 0.5, duration: 4.2 },
    { type: 'star', top: '45%', left: '3%', size: 'text-xl', delay: 1.5, duration: 3.8 },
    { type: 'heart', top: '55%', right: '4%', size: 'text-2xl', delay: 2.2, duration: 4.5 },
    { type: 'sparkle', top: '88%', left: '12%', size: 'text-lg', delay: 0.8, duration: 3.2 },
    { type: 'star', top: '15%', right: '15%', size: 'text-xl', delay: 1.2, duration: 4.1 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className={`absolute select-none opacity-40 hover:opacity-80 transition-opacity ${item.size}`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
          animate={{
            y: [-15, 15, -15],
            rotate: [-6, 6, -6],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            repeat: Infinity,
            duration: item.duration,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.type === 'heart' && '💖'}
          {item.type === 'sparkle' && '✨'}
          {item.type === 'balloon' && '🎈'}
          {item.type === 'bow' && '🎀'}
          {item.type === 'star' && '⭐'}
        </motion.div>
      ))}
    </div>
  );
};
