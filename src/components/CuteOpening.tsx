import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerFx } from './CuteEffects';
import { MagnetButton } from './reactbits/MagnetButton';

interface CuteOpeningProps {
  onOpen: () => void;
}

const lines = [
  'pssst... 👀',
  'I made something special for you...',
  'because today is a VERY special day 🎀'
];

export const CuteOpening: React.FC<CuteOpeningProps> = ({ onOpen }) => {
  const [displayText, setDisplayText] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let charIdx = 0;
    let isCancelled = false;

    const typeLine = () => {
      if (isCancelled) return;
      const currentLine = lines[lineIdx];
      if (charIdx <= currentLine.length) {
        setDisplayText(currentLine.slice(0, charIdx));
        charIdx++;
        setTimeout(typeLine, 42);
      } else {
        if (lineIdx < lines.length - 1) {
          setTimeout(() => {
            if (isCancelled) return;
            setLineIdx(prev => prev + 1);
          }, 1000);
        } else {
          setTimeout(() => { if (!isCancelled) setShowBtn(true); }, 500);
        }
      }
    };

    setDisplayText('');
    const t = setTimeout(typeLine, lineIdx === 0 ? 300 : 0);
    return () => { isCancelled = true; clearTimeout(t); };
  }, [lineIdx]);

  const handleOpen = () => {
    triggerFx.all();
    setIsFadingOut(true);
    setTimeout(onOpen, 800);
  };

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.section
          id="opening"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-5 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #e6d9ff, #ffd6e8 55%, #ffe3c9)' }}
        >
          {/* Animated background orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${120 + i * 60}px`,
                height: `${120 + i * 60}px`,
                background: i % 2 === 0
                  ? 'radial-gradient(circle, rgba(255,143,194,0.25), transparent)'
                  : 'radial-gradient(circle, rgba(230,217,255,0.3), transparent)',
                left: `${10 + i * 18}%`,
                top: `${15 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.6
              }}
            />
          ))}

          {/* Floating emoji ring */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {['🌸', '💖', '✨', '🎀', '🦋', '💗', '⭐', '🌷'].map((emoji, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${8 + i * 11.5}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -18, 0],
                  rotate: [0, i % 2 === 0 ? 12 : -12, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          {/* Typewriter block */}
          <div className="relative z-10 min-h-[4.5em] max-w-[700px] flex items-center justify-center">
            <motion.h1
              key={lineIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[clamp(1.6rem,5.5vw,2.7rem)] font-display text-[#6b3f63] leading-relaxed drop-shadow-sm"
            >
              <span>{displayText}</span>
              <span
                className="inline-block w-[3px] h-[1.1em] bg-[#6b3f63] ml-1.5 align-middle"
                style={{ animation: 'blink 0.9s step-end infinite' }}
              />
            </motion.h1>
          </div>

          <AnimatePresence>
            {showBtn && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="mt-10 relative z-10"
              >
                <MagnetButton
                  onClick={handleOpen}
                  strength={0.2}
                  className="group relative overflow-hidden font-display text-lg sm:text-xl font-semibold text-white py-4 sm:py-5 px-9 sm:px-11 rounded-full shadow-[0_12px_35px_rgba(255,111,168,0.5)] transition-all duration-300 animate-bounce-gift"
                  style={{ background: 'linear-gradient(135deg, #ff6fa8, #ff8fc2)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Open Your Birthday Gift 🎁
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                </MagnetButton>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-sm text-[#8a5f82]/70 font-medium"
                >
                  psst, there's a surprise inside 🌸
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
