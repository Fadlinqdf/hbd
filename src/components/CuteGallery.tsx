import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CONFIG } from '../data/birthday';
import { FloatingDecos } from './CuteEffects';

export const CuteGallery: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const closeModal = () => {
    setIsVideoModalOpen(false);
    window.dispatchEvent(new CustomEvent('resume-bg-music'));
  };

  return (
    <section
      id="gallery"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-5 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #d3f6e3, #fff8f1)' }}
    >
      <FloatingDecos count={6} />

      <motion.div
        ref={ref}
        className="relative z-10 w-full max-w-lg mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-[clamp(1.6rem,5vw,2.4rem)] font-display text-[#ff6fa8] mb-2 drop-shadow-sm">
          A Collection of You 📸🌷
        </h2>
        <p className="text-[#8a5f82]/70 text-sm font-medium mb-10">
          (momen manis tentang kamu ✨)
        </p>

        {/* Video Memory Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div
            onClick={() => setIsVideoModalOpen(true)}
            className="group relative bg-white p-4 pb-6 rounded-[22px] shadow-[0_16px_36px_rgba(107,63,99,0.18)] border-2 border-pink-200 cursor-pointer transition-all duration-300 hover:shadow-[0_22px_48px_rgba(107,63,99,0.26)] hover:-translate-y-2"
          >
            {/* Stickers */}
            <span className="absolute -top-3 -left-3 bg-[#ff6fa8] text-white px-3.5 py-1 rounded-full text-xs font-bold shadow-md -rotate-6 z-20 font-display select-none">
              🎬 in motion
            </span>
            <span className="absolute -top-3 -right-3 bg-white text-[#ff6fa8] border border-pink-200 px-3 py-1 rounded-full text-xs font-bold shadow-md rotate-6 z-20 font-display select-none">
              ✨ click to watch ✨
            </span>

            {/* Muted auto-loop video preview */}
            <div className="relative w-full aspect-video rounded-[14px] overflow-hidden bg-black shadow-inner">
              <video
                src={CONFIG.surpriseVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                <motion.div
                  className="w-14 h-14 rounded-full bg-white/90 text-[#ff6fa8] flex items-center justify-center shadow-xl text-lg font-bold"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  ▶
                </motion.div>
              </div>
            </div>

            <div className="text-center mt-3.5 font-display text-base text-[#6b3f63] font-bold">
              Special Moment ♡ 🎥
            </div>
            <p className="text-xs text-[#8a5f82]/70 mt-1">
              (klik untuk tonton dengan suara penuh 🔊)
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#6b3f63]/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-[26px] p-5 sm:p-6 max-w-xl w-full text-center shadow-2xl border-2 border-pink-200"
            >
              <button
                onClick={closeModal}
                className="absolute -top-3.5 -right-3.5 bg-[#ff6fa8] text-white w-9 h-9 rounded-full font-bold shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer z-30"
              >
                ✕
              </button>

              <div className="font-display text-xl text-[#ff6fa8] font-bold mb-3">
                🎬 Special Video For {CONFIG.name}
              </div>

              <div className="w-full rounded-[16px] overflow-hidden bg-black shadow-inner border border-pink-100">
                <video
                  src={CONFIG.surpriseVideo}
                  autoPlay
                  controls
                  playsInline
                  onPlay={() => window.dispatchEvent(new CustomEvent('pause-bg-music'))}
                  onPause={() => window.dispatchEvent(new CustomEvent('resume-bg-music'))}
                  onEnded={() => window.dispatchEvent(new CustomEvent('resume-bg-music'))}
                  className="w-full max-h-[480px] object-contain mx-auto block"
                />
              </div>

              <p className="mt-3 text-sm text-[#8a5f82] font-semibold">
                Memories in motion ♡
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
