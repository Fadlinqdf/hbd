import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FloatingDecos, triggerFx } from './CuteEffects';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const CuteGame: React.FC = () => {
  const [sliderVal, setSliderVal] = useState(0);
  const [hasTriggered100, setHasTriggered100] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const getResultText = (val: number) => {
    if (val <= 15) return { text: 'Impossible 😭', color: '#8a5f82' };
    if (val <= 40) return { text: 'Maybe... 🤔', color: '#8a5f82' };
    if (val <= 65) return { text: 'Getting there 👀', color: '#ff8fc2' };
    if (val < 100) return { text: 'Pretty cute! 🌸', color: '#ff6fa8' };
    return { text: 'ERROR: TOO CUTE 💥💗', color: '#ff6fa8' };
  };

  const result = getResultText(sliderVal);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderVal(val);
    if (val >= 100 && !hasTriggered100) {
      setHasTriggered100(true);
      triggerFx.confetti();
      triggerFx.hearts();
      triggerFx.balloons();
    } else if (val < 100 && hasTriggered100) {
      setHasTriggered100(false);
    }
  };

  return (
    <section
      id="game"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-5 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #e6d9ff, #cdeaff)' }}
    >
      <FloatingDecos count={6} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full flex flex-col items-center"
      >
        <h2 className="text-[clamp(1.6rem,5vw,2.4rem)] font-display text-[#ff6fa8] mb-3">
          Birthday Challenge 🎮💗
        </h2>
        <p className="text-[#8a5f82]/70 text-sm font-medium mb-10">
          (spoiler: the answer is always 100%)
        </p>

        <div className="max-w-[500px] w-full">
          <SpotlightCard
            spotlightColor="rgba(205, 234, 255, 0.4)"
            className="rounded-[28px] p-8 sm:p-12 shadow-[0_20px_45px_rgba(107,63,99,0.18)] border border-[#ffd6e8]"
          >
            <p className="font-display text-xl sm:text-2xl text-[#6b3f63] mb-6">
              How cute are you today?
            </p>

            <div className="relative w-full py-2">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={handleSliderChange}
                className="w-full h-3.5 rounded-lg cursor-pointer"
                style={{
                  accentColor: '#ff6fa8',
                  background: `linear-gradient(to right, #ff8fc2 ${sliderVal}%, #ffd6e8 ${sliderVal}%)`
                }}
              />
              <div className="flex justify-between text-xs text-[#8a5f82]/60 mt-1 font-medium">
                <span>0%</span>
                <span className="font-bold text-[#ff6fa8]">{sliderVal}%</span>
                <span>100%</span>
              </div>
            </div>

            <motion.div
              className="mt-6 font-display text-2xl sm:text-3xl min-h-[2.2em] flex items-center justify-center font-bold"
              style={{ color: result.color }}
              key={Math.floor(sliderVal / 10)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {result.text}
            </motion.div>

            <AnimatePresence>
              {sliderVal >= 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="mt-5 bg-[#fff3c4] rounded-[16px] p-4 sm:p-5 font-bold text-[#a06a00] text-sm sm:text-base border border-[#ffe3c9] shadow-md"
                >
                  <strong>WARNING!!!</strong>
                  <br />
                  The system has detected an extremely cute birthday girl.
                  <br />
                  Please remain adorable. 🎀✨
                </motion.div>
              )}
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </motion.div>
    </section>
  );
};
