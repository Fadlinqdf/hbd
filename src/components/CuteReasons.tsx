import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CONFIG } from '../data/birthday';
import { FloatingDecos } from './CuteEffects';
import { SpotlightCard } from './reactbits/SpotlightCard';

export const CuteReasons: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="reasons"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-5 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffe3c9, #ffd6e8)' }}
    >
      <FloatingDecos count={6} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-5xl mx-auto"
      >
        <h2 className="text-[clamp(1.6rem,5vw,2.4rem)] font-display text-[#ff6fa8] mb-3">
          Okay... Here's Why You're Special 💗
        </h2>
        <p className="text-[#8a5f82]/70 text-sm sm:text-base font-medium mb-10">
          (bukan cuma satu dua alasan, tapi buanyak banget)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: idx * 0.12,
                duration: 0.6,
                type: 'spring',
                stiffness: 180,
                damping: 20
              }}
            >
              <SpotlightCard
                spotlightColor="rgba(255, 111, 168, 0.2)"
                className="h-full rounded-[20px] p-7 text-center shadow-[0_14px_30px_rgba(107,63,99,0.15)] border border-pink-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(107,63,99,0.22)]"
              >
                <motion.div
                  className="text-4xl mb-3 select-none"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5 + idx * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {reason.icon}
                </motion.div>
                <h3 className="font-display text-[#ff6fa8] text-xl mb-2 font-bold">
                  {reason.title}
                </h3>
                <p className="text-sm sm:text-[0.95rem] text-[#8a5f82] leading-relaxed font-medium">
                  {reason.text}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Quote at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 bg-white/70 backdrop-blur-sm rounded-[20px] p-6 border border-pink-100 shadow-md max-w-lg mx-auto"
        >
          <p className="text-[#6b3f63] font-display text-lg font-semibold leading-relaxed">
            "You make the world a little brighter just by being in it." 🌸
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
