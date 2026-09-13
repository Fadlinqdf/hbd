import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CONFIG } from '../data/birthday';
import { FloatingDecos } from './CuteEffects';

export const CuteWish: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="wish"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-5 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #cdeaff, #e6d9ff)' }}
    >
      <FloatingDecos count={6} />

      <motion.div
        ref={ref}
        className="relative z-10 max-w-lg w-full mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-[clamp(1.6rem,5vw,2.4rem)] font-display text-[#ff6fa8] mb-4">
          My Birthday Wish For You 🌷✨
        </h2>

        <p className="text-base sm:text-lg text-[#6b3f63] font-bold mb-8">
          I hope this new chapter of your life is filled with:
        </p>

        <div className="flex flex-col gap-3">
          {CONFIG.wishes.map((wish, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40, scale: 0.92 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{
                delay: idx * 0.12 + 0.2,
                duration: 0.55,
                type: 'spring',
                stiffness: 200,
                damping: 22
              }}
              whileHover={{ scale: 1.04, x: 4 }}
              className="bg-white/80 backdrop-blur-sm rounded-full py-3.5 px-6 text-base sm:text-lg font-bold text-[#6b3f63] shadow-[0_4px_15px_rgba(107,63,99,0.08)] border border-pink-100 cursor-default"
            >
              {wish}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-10 font-display text-lg sm:text-xl text-[#ff6fa8] font-bold"
        >
          And most importantly... I hope you always remember how amazing and special you are. ♡
        </motion.p>

        {/* Star trail decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 flex justify-center gap-4 text-3xl select-none"
        >
          {['⭐', '🌟', '💫', '🌟', '⭐'].map((star, i) => (
            <motion.span
              key={i}
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              {star}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
