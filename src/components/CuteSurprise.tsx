import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FloatingDecos, triggerFx } from './CuteEffects';
import { MagnetButton } from './reactbits/MagnetButton';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { RoseBouquet3D } from './RoseBouquet3D';
import { CONFIG } from '../data/birthday';

export const CuteSurprise: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleOpen = () => {
    if (!isOpened) {
      setIsOpened(true);
      triggerFx.all();
    }
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  return (
    <section
      id="surprise"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff8f1, #ffe3c9 50%, #ffd6e8)' }}
    >
      <FloatingDecos count={6} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center max-w-2xl w-full"
      >
        <h2 className="text-[clamp(1.6rem,5vw,2.4rem)] font-display text-[#ff6fa8] mb-8 drop-shadow-sm">
          Wait... I Have One More Thing 🎁
        </h2>

        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15, rotate: 8 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                onClick={handleOpen}
                className="text-9xl cursor-pointer select-none drop-shadow-2xl"
                animate={{
                  rotate: [-4, 4, -4],
                  y: [0, -14, 0]
                }}
                transition={{
                  rotate: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
              >
                🎁
              </motion.div>

              <div className="flex flex-col items-center gap-1.5">
                <p className="font-display text-xl sm:text-2xl text-[#8a5f82] font-semibold">
                  Don't click it... seriously! 👀
                </p>
                <p className="text-xs sm:text-sm text-[#8a5f82]/70">
                  Ada hadiah bunga spesial 3D yang udah disiapin buat kamu 🌹
                </p>
              </div>

              <MagnetButton
                onClick={handleOpen}
                strength={0.25}
                className="font-display font-semibold text-base sm:text-lg text-white py-3.5 px-9 rounded-full shadow-[0_12px_28px_rgba(255,111,168,0.45)] transition-all hover:shadow-[0_16px_36px_rgba(255,111,168,0.6)] cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #ff6fa8, #ff8fc2)' }}
              >
                Buka Kadonya Sekarang! 🎀
              </MagnetButton>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="w-full flex flex-col items-center"
            >
              <SpotlightCard
                spotlightColor="rgba(255, 111, 168, 0.25)"
                className="rounded-[28px] p-5 sm:p-8 shadow-[0_20px_50px_rgba(107,63,99,0.18)] border border-[#ffd6e8] bg-white/95 backdrop-blur-md w-full max-w-xl text-center"
              >
                {/* Header Badge & Title */}
                <div className="flex flex-col items-center gap-2 mb-4">
                  <motion.div
                    className="inline-flex items-center gap-1.5 bg-pink-100/80 text-[#ff6fa8] font-bold text-xs sm:text-sm px-3.5 py-1 rounded-full border border-pink-200"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <span>🌹</span> Special Flowers For {CONFIG.name}
                  </motion.div>
                  <h3 className="text-[clamp(1.5rem,4.5vw,2.2rem)] font-display text-[#ff6fa8] font-bold">
                    SURPRISEEEE!!! 🌹💗
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8a5f82] font-medium max-w-md">
                    Buket bunga mawar cantik yang gak akan pernah layu khusus buat kamu ✨
                  </p>
                </div>

                {/* 3D Rose Bouquet Viewer Container */}
                <div className="relative w-full rounded-[22px] overflow-hidden bg-gradient-to-b from-[#fff5f8] via-[#ffe3c9]/40 to-[#ffd6e8]/50 shadow-[0_16px_36px_rgba(107,63,99,0.15)] border-2 border-pink-200">
                  {/* Floating Stickers */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-[#ff6fa8] shadow-md -rotate-6 z-20 font-display select-none pointer-events-none">
                    for you 🎀
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-[#6b3f63] shadow-md rotate-6 z-20 font-display select-none pointer-events-none">
                    ✨ 360° 3D ✨
                  </span>

                  {/* 3D Canvas */}
                  <RoseBouquet3D modelPath="/models/bouquet-rose-red/source/rose-bouquet-red.glb" />

                  {/* Touch/drag hint */}
                  <div className="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none z-20">
                    <span className="bg-white/80 backdrop-blur-xs text-[#8a5f82] text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow-xs border border-pink-100/60">
                      👆 Geser / Drag untuk memutar 3D
                    </span>
                  </div>
                </div>

                {/* Romantic caption */}
                <p className="mt-4 text-xs sm:text-sm text-[#6b3f63] font-medium max-w-md mx-auto leading-relaxed">
                  "Semoga hari-harimu selalu seindah dan seharum bunga mawar ini, dikelilingi banyak kebahagiaan! 🌸"
                </p>

                {/* Close Button */}
                <div className="mt-5 flex justify-center">
                  <button
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 bg-white border border-pink-200 hover:bg-pink-50 text-[#8a5f82] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                  >
                    <span>🎁</span> Tutup Kado
                  </button>
                </div>

                {/* Ribbon & Deco Bottom */}
                <div className="mt-5 flex justify-center gap-3">
                  {['🎀', '🌹', '💗', '🌹', '🎀'].map((e, i) => (
                    <motion.span
                      key={i}
                      className="text-xl sm:text-2xl select-none"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

