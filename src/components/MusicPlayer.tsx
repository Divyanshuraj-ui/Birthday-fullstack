import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      soundFX.stopMelody();
      setIsPlaying(false);
    } else {
      soundFX.playPop();
      setIsPlaying(true);
      soundFX.playHappyBirthdayMelody(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundFX.setMuted(nextMute);
    if (nextMute && isPlaying) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full shadow-md border border-pink-200/80 text-[#5d4037]">
      <button
        onClick={toggleMusic}
        id="btn-play-birthday-tune"
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
          isPlaying
            ? 'bg-pink-500 text-white shadow-xs animate-pulse'
            : 'bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200'
        }`}
        title="Play Birthday Melody"
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span>{isPlaying ? 'Playing Song 🎵' : 'Play Song 🎶'}</span>
      </button>

      <button
        onClick={() => {
          soundFX.playSparkle();
        }}
        id="btn-sparkle-fx"
        className="p-1.5 text-pink-600 hover:text-pink-800 hover:bg-pink-50 rounded-full transition-colors cursor-pointer"
        title="Sparkle Sound"
      >
        <Sparkles className="w-4 h-4" />
      </button>

      <button
        onClick={toggleMute}
        id="btn-toggle-sound-mute"
        className="p-1.5 text-pink-600 hover:text-pink-800 hover:bg-pink-50 rounded-full transition-colors cursor-pointer"
        title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
};
