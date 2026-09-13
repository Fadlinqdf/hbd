import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { CuteOpening } from './components/CuteOpening';
import { CuteHero } from './components/CuteHero';
import { CuteMessage } from './components/CuteMessage';
import { CuteGallery } from './components/CuteGallery';
import { CuteReasons } from './components/CuteReasons';
import { CuteGame } from './components/CuteGame';
import { CuteSurprise } from './components/CuteSurprise';
import { CuteWish } from './components/CuteWish';
import { CuteFinal } from './components/CuteFinal';
import { ProgressBar, CursorEffects } from './components/CuteEffects';
import { CuteMusicBtn } from './components/CuteMusicBtn';

export function App() {
  const [hasOpened, setHasOpened] = useState(false);

  // Smooth scroll with Lenis
  useEffect(() => {
    if (!hasOpened) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [hasOpened]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Fixed UI Layer */}
      <ProgressBar />
      <CursorEffects />
      <CuteMusicBtn autoStart={hasOpened} />

      {/* Opening Intro Gate */}
      <AnimatePresence>
        {!hasOpened && (
          <CuteOpening onOpen={() => setHasOpened(true)} />
        )}
      </AnimatePresence>

      {/* Main Experience */}
      <AnimatePresence>
        {hasOpened && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full flex flex-col"
          >
            <CuteHero />
            <CuteMessage />
            <CuteGallery />
            <CuteReasons />
            <CuteGame />
            <CuteSurprise />
            <CuteWish />
            <CuteFinal />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
