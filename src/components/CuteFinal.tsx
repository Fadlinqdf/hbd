import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CONFIG } from '../data/birthday';
import { FloatingDecos, triggerFx } from './CuteEffects';
import { BlurText } from './reactbits/BlurText';
import { MagnetButton } from './reactbits/MagnetButton';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const CuteFinal: React.FC = () => {
  const [showGrandFinale, setShowGrandFinale] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleLastClick = () => {
    triggerFx.all();
    setShowGrandFinale(true);
  };

  return (
    <section
      id="final"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-5 text-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #ffd6e8, #e6d9ff 50%, #ffe3c9)' }}
    >
      <FloatingDecos count={8} />

      <motion.div
        ref={ref}
        className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          id="final-title"
          className="text-[clamp(2.2rem,7vw,3.5rem)] font-display text-[#ff6fa8] leading-tight"
          style={{ textShadow: '3px 3px 0 #fffdfb' }}
        >
          <BlurText
            text={`HAPPY BIRTHDAY, ${CONFIG.name}! 🎂🎀💗`}
            delay={70}
            animateBy="words"
            className="font-display"
          />
        </h1>

        <div className="mt-8 space-y-2.5">
          {CONFIG.finalLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + idx * 0.12, duration: 0.5 }}
              className={`text-lg sm:text-xl font-bold ${
                idx === CONFIG.finalLines.length - 1
                  ? 'text-[#ff6fa8] text-xl sm:text-2xl mt-4 font-display'
                  : 'text-[#6b3f63]'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          id="final-signed"
          className="mt-8 font-display text-lg text-[#8a5f82] font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          — From {CONFIG.fromName} 💌
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
        >
          <MagnetButton
            id="last-click-btn"
            onClick={handleLastClick}
            strength={0.25}
            className="font-display font-semibold text-lg text-white py-4 sm:py-5 px-10 sm:px-12 rounded-full shadow-[0_14px_35px_rgba(255,111,168,0.5)] transition-all duration-300 animate-bounce-gift"
            style={{ background: 'linear-gradient(135deg, #ff6fa8, #ff8fc2)' }}
          >
            One Last Click 💗
          </MagnetButton>
        </motion.div>
      </motion.div>

      {/* Grand Finale Modal */}
      <AnimatePresence>
        {showGrandFinale && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGrandFinale(false)}
            className="fixed inset-0 z-[6000] flex flex-col items-center justify-center text-center p-6 bg-[#ffd6e8]/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.7, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <SpotlightCard
                spotlightColor="rgba(255, 111, 168, 0.3)"
                className="rounded-[30px] p-8 sm:p-12 shadow-2xl border-2 border-[#ff8fc2]"
              >
                <motion.div
                  className="text-6xl mb-4 select-none"
                  animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1.2, 1.2, 1] }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  🎂🎉🎀
                </motion.div>
                <h2 className="text-[clamp(1.8rem,7vw,2.6rem)] font-display text-[#ff6fa8] font-bold">
                  HAPPY BIRTHDAY, {CONFIG.name}!!!
                </h2>
                <p className="mt-4 text-base sm:text-lg font-bold text-[#6b3f63] leading-relaxed">
                  I hope you smiled at least once while looking at this. hehe 🎀🌸
                </p>

                <motion.div
                  className="mt-6 flex justify-center gap-3 text-2xl select-none"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💖💗💓💕💖
                </motion.div>

                <div className="mt-8">
                  <MagnetButton
                    onClick={() => setShowGrandFinale(false)}
                    strength={0.2}
                    className="bg-gradient-to-r from-[#ff6fa8] to-[#ff8fc2] text-white font-display font-bold py-3.5 px-8 rounded-full shadow-[0_10px_24px_rgba(255,111,168,0.35)] transition-transform hover:scale-105 active:scale-95"
                  >
                    close & keep smiling 🌸
                  </MagnetButton>
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
