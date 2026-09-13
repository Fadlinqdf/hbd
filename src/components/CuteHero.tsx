import React, { useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { CONFIG } from '../data/birthday';
import { FloatingDecos } from './CuteEffects';
import { BlurText } from './reactbits/BlurText';
import { TiltedCard } from './reactbits/TiltedCard';
import { MagnetButton } from './reactbits/MagnetButton';
import CountUp from './reactbits/CountUp';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
  })
};

export const CuteHero: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(CONFIG.heroImage);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  const scrollToNext = () => {
    const el = document.getElementById('message');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { label: 'Alasan kamu spesial', value: 999, suffix: '+' },
    { label: 'Hari penuh kenangan', value: 365, suffix: '' },
    { label: 'Bintang buat kamu', value: 1000000, suffix: '+' },
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-5 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffe3c9, #fff8f1 70%, #ffd6e8)' }}
    >
      <FloatingDecos count={8} />

      {/* Hero Title */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        style={{ y: parallaxY }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            id="hero-title"
            className="text-[clamp(2.2rem,7vw,3.8rem)] font-display text-[#ff6fa8] leading-tight drop-shadow-sm"
            style={{ textShadow: '3px 3px 0 #fffdfb' }}
          >
            <BlurText
              text={`HAPPY BIRTHDAY, ${CONFIG.name}! 🎂💗`}
              delay={70}
              animateBy="words"
              className="font-display"
            />
          </h1>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.5}
          className="mt-3.5 text-[clamp(1rem,3vw,1.35rem)] text-[#8a5f82] font-semibold"
        >
          Finally... your special day is here! ✨
        </motion.p>
      </motion.div>

      {/* 3D Tilted Polaroid */}
      <motion.div
        className="relative z-10 mt-10 max-w-[340px] w-full"
        initial={{ opacity: 0, y: 60, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.4, type: 'spring', stiffness: 120, damping: 18 }}
      >
        <TiltedCard
          imageSrc={imgSrc}
          altText={`Foto ${CONFIG.name}`}
          scaleOnHover={1.06}
          rotateAmplitude={14}
        >
          <div className="relative bg-white p-[18px] pb-[46px] rounded-[16px] shadow-[0_20px_45px_rgba(107,63,99,0.2)] border border-pink-100">
            {/* Stickers */}
            <span className="absolute -top-4 -left-6 bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#ff6fa8] shadow-[0_6px_14px_rgba(107,63,99,0.18)] -rotate-12 z-20 font-display select-none">
              cutie 💕
            </span>
            <span className="absolute -bottom-3 right-4 bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#ff6fa8] shadow-[0_6px_14px_rgba(107,63,99,0.18)] rotate-6 z-20 font-display select-none">
              birthday girl 🎀
            </span>
            <span className="absolute top-[38%] -left-7 bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#ff6fa8] shadow-[0_6px_14px_rgba(107,63,99,0.18)] -rotate-6 z-20 font-display select-none">
              ✨ pretty ✨
            </span>
            <span className="absolute -top-3 -right-4 bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#ff6fa8] shadow-[0_6px_14px_rgba(107,63,99,0.18)] rotate-12 z-20 font-display select-none">
              100% adorable
            </span>

            <div className="w-full aspect-square rounded-[8px] overflow-hidden bg-gradient-to-br from-[#ffd6e8] to-[#e6d9ff]">
              <img
                src={imgSrc}
                alt="Foto Utama"
                onError={() => setImgSrc(CONFIG.heroImageFallback)}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div
              id="hero-caption"
              className="text-center font-display mt-3.5 text-[#6b3f63] text-base font-semibold"
            >
              {CONFIG.heroCaption}
            </div>
          </div>
        </TiltedCard>
      </motion.div>

      {/* Fun Stats Row */}
      <motion.div
        className="relative z-10 mt-12 grid grid-cols-3 gap-4 max-w-lg w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-[16px] py-4 px-3 shadow-[0_8px_22px_rgba(107,63,99,0.12)] text-center"
          >
            <div className="font-display text-[#ff6fa8] text-xl font-bold">
              <CountUp to={stat.value} duration={2.5} delay={0.3 * i} />
              <span>{stat.suffix}</span>
            </div>
            <div className="text-[10px] sm:text-xs text-[#8a5f82] font-medium mt-0.5 leading-tight">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll CTA */}
      <motion.div
        className="relative z-10 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <MagnetButton
          onClick={scrollToNext}
          strength={0.25}
          className="font-display font-semibold text-base bg-white text-[#6b3f63] py-3.5 px-8 rounded-full shadow-[0_8px_22px_rgba(107,63,99,0.18)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(107,63,99,0.25)] border border-pink-100"
        >
          There's More 👀
        </MagnetButton>

        {/* Scroll indicator */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-1.5 text-[#8a5f82]/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-medium">scroll down</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};
