import React from 'react';
import { PageId } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  unlockedPages: Set<PageId>;
  onLockApp: () => void;
}

const PAGES_ORDER: { id: PageId; label: string; num: string; icon: string }[] = [
  { id: 'page1', label: 'Bond & Wishes', num: '01', icon: '💖' },
  { id: 'page2', label: 'G-O-R-Ge-O-U-S', num: '02', icon: '🧪' },
  { id: 'page3', label: 'Shared Memories', num: '03', icon: '📸' },
  { id: 'page4', label: 'Jail Na Chala Jaun', num: '04', icon: '🚨' },
  { id: 'page5', label: 'Fun Quiz & Cake', num: '05', icon: '🎂' },
  { id: 'page6', label: 'Grand Wishes', num: '06', icon: '💌' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  onLockApp,
}) => {
  const currentIndex = PAGES_ORDER.findIndex((p) => p.id === currentPage);

  const goToPrev = () => {
    if (currentIndex > 0) {
      soundFX.playPop();
      onSelectPage(PAGES_ORDER[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentIndex < PAGES_ORDER.length - 1) {
      soundFX.playPop();
      onSelectPage(PAGES_ORDER[currentIndex + 1].id);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/40 backdrop-blur-md border-b border-pink-200/50 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Editorial Brand / Title */}
        <div className="flex items-center gap-3">
          <span className="text-xl">✨</span>
          <div>
            <h1 className="font-serif italic text-xl sm:text-2xl text-pink-500 leading-tight">
              Dolly's World ✨
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#5d4037]/70 font-semibold hidden sm:block">
              Chapter {PAGES_ORDER[currentIndex]?.num} • {PAGES_ORDER[currentIndex]?.label}
            </p>
          </div>
        </div>

        {/* Page Nav Chips (Desktop/Tablet) with Editorial uppercase tracking */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-[#5d4037]">
          {PAGES_ORDER.map((page) => {
            const isCurrent = currentPage === page.id;
            return (
              <button
                key={page.id}
                id={`nav-btn-${page.id}`}
                onClick={() => {
                  soundFX.playPop();
                  onSelectPage(page.id);
                }}
                className={`py-1 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'border-b-2 border-pink-500 text-pink-600 font-bold'
                    : 'opacity-70 hover:opacity-100 hover:text-pink-600'
                }`}
              >
                <span>{page.num}</span>
                <span>{page.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/60 backdrop-blur-md p-1 rounded-full border border-pink-200/80">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              id="nav-prev-page"
              className="p-1 rounded-full text-[#5d4037] hover:bg-pink-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-[11px] font-semibold text-pink-700 px-2 py-0.5 bg-pink-100/80 rounded-full">
              {currentIndex + 1}/{PAGES_ORDER.length}
            </span>

            <button
              onClick={goToNext}
              disabled={currentIndex === PAGES_ORDER.length - 1}
              id="nav-next-page"
              className="p-1 rounded-full text-[#5d4037] hover:bg-pink-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              soundFX.playSparkle();
              onLockApp();
            }}
            id="btn-lock-scrapbook"
            className="text-xs px-3 py-1.5 bg-white/70 hover:bg-pink-100 text-[#5d4037] rounded-full border border-pink-200 flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            title="Lock with Secret Code"
          >
            <span>🔒</span>
            <span className="hidden md:inline font-semibold text-[11px] uppercase tracking-wider">Lock</span>
          </button>
        </div>
      </div>
    </header>
  );
};
