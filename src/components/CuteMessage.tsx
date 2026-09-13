import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CONFIG } from '../data/birthday';
import { FloatingDecos, triggerFx } from './CuteEffects';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const CuteMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      triggerFx.hearts();
    }
  };

  return (
    <section
      id="message"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-5 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #cdeaff, #e6d9ff)' }}
    >
      <FloatingDecos count={6} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-[clamp(1.6rem,5vw,2.4rem)] font-display text-[#ff6fa8] mb-8">
          A Little Message For You 💌
        </h2>

        {!isOpen ? (
          <motion.div
            onClick={handleOpenEnvelope}
            className="cursor-pointer flex flex-col items-center"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, -2, 2, 0]
            }}
            transition={{
              y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            <div className="text-8xl select-none drop-shadow-lg">💌</div>
            <motion.p
              className="mt-4 font-bold font-display text-[#8a5f82] text-lg bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-md border border-pink-100"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to open! 🌸
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="w-full"
          >
            <SpotlightCard
              spotlightColor="rgba(255, 158, 170, 0.25)"
              className="border border-[#ffd6e8] shadow-[0_20px_50px_rgba(107,63,99,0.18)] p-8 sm:p-10 text-left w-full"
            >
              <div className="space-y-4 text-base sm:text-lg text-[#6b3f63] leading-relaxed whitespace-pre-line font-medium">
                {CONFIG.letter.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-[#ffd6e8] flex justify-between items-center text-sm sm:text-base font-bold text-[#ff6fa8] font-display">
                <span>With lots of love ♡</span>
                <span>— {CONFIG.fromName}</span>
              </div>
            </SpotlightCard>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
