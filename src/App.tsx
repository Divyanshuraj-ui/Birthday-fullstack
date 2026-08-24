import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { PhotoProvider } from './context/PhotoContext';
import { LoginScreen } from './components/LoginScreen';
import { Navbar } from './components/Navbar';
import { FloatingDecorations } from './components/FloatingDecorations';
import { MusicPlayer } from './components/MusicPlayer';
import { Page1Greeting } from './components/pages/Page1Greeting';
import { Page2Gorgeous } from './components/pages/Page2Gorgeous';
import { Page3Memories } from './components/pages/Page3Memories';
import { Page4RoastJail } from './components/pages/Page4RoastJail';
import { Page5FunAndCake } from './components/pages/Page5FunAndCake';
import { Page6GrandFinale } from './components/pages/Page6GrandFinale';

export function AppContent() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<PageId>('page1');
  const [unlockedPages, setUnlockedPages] = useState<Set<PageId>>(new Set(['page1']));

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleLockApp = () => {
    setIsUnlocked(false);
  };

  const navigateToPage = (page: PageId) => {
    setUnlockedPages((prev) => new Set([...prev, page]));
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-[#fce4ec] text-[#5d4037] relative">
        <FloatingDecorations />
        <LoginScreen onUnlock={handleUnlock} />
        <MusicPlayer />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#fce4ec] text-[#5d4037] flex flex-col relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-950 font-sans">
      {/* Background Floating Kawaii Elements */}
      <FloatingDecorations />

      {/* Top Scrapbook Header Navigation */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={navigateToPage}
        unlockedPages={unlockedPages}
        onLockApp={handleLockApp}
      />

      {/* Main Content Viewport with animated page transitions */}
      <main className="flex-1 relative z-10 pb-16">
        <AnimatePresence mode="wait">
          {currentPage === 'page1' && (
            <motion.div
              key="page1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Page1Greeting onNext={() => navigateToPage('page2')} />
            </motion.div>
          )}

          {currentPage === 'page2' && (
            <motion.div
              key="page2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Page2Gorgeous
                onNext={() => navigateToPage('page3')}
                onPrev={() => navigateToPage('page1')}
              />
            </motion.div>
          )}

          {currentPage === 'page3' && (
            <motion.div
              key="page3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Page3Memories
                onNext={() => navigateToPage('page4')}
                onPrev={() => navigateToPage('page2')}
              />
            </motion.div>
          )}

          {currentPage === 'page4' && (
            <motion.div
              key="page4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Page4RoastJail
                onNext={() => navigateToPage('page5')}
                onPrev={() => navigateToPage('page3')}
              />
            </motion.div>
          )}

          {currentPage === 'page5' && (
            <motion.div
              key="page5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Page5FunAndCake
                onNext={() => navigateToPage('page6')}
                onPrev={() => navigateToPage('page4')}
              />
            </motion.div>
          )}

          {currentPage === 'page6' && (
            <motion.div
              key="page6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Page6GrandFinale onRestart={() => navigateToPage('page1')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Audio & Birthday Melody Player */}
      <MusicPlayer />

      {/* Editorial Aesthetic Footer */}
      <footer className="py-4 px-6 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5d4037]/60 border-t border-pink-200/50 bg-white/40 backdrop-blur-md relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
        <span>Pookies &amp; Cakes</span>
        <span>•</span>
        <span>Endless Love For Dolly Di</span>
        <span>•</span>
        <span>Memories 2024</span>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <PhotoProvider>
      <AppContent />
    </PhotoProvider>
  );
}

export default App;
