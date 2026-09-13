import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../data/birthday';

export const CuteMusicBtn: React.FC<{ autoStart?: boolean }> = ({ autoStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const startSynthMelody = () => {
    try {
      if (!synthCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const notes: { [key: string]: number } = {
        C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
        C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99
      };

      const melody = [
        { note: 'G4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'A4', dur: 0.7 }, { note: 'G4', dur: 0.7 },
        { note: 'C5', dur: 0.7 }, { note: 'B4', dur: 1.1 },
        { note: 'G4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'A4', dur: 0.7 }, { note: 'G4', dur: 0.7 },
        { note: 'D5', dur: 0.7 }, { note: 'C5', dur: 1.1 },
        { note: 'G4', dur: 0.35 }, { note: 'G4', dur: 0.35 }, { note: 'G5', dur: 0.7 }, { note: 'E5', dur: 0.7 },
        { note: 'C5', dur: 0.7 }, { note: 'B4', dur: 0.7 }, { note: 'A4', dur: 0.7 },
        { note: 'F5', dur: 0.35 }, { note: 'F5', dur: 0.35 }, { note: 'E5', dur: 0.7 }, { note: 'C5', dur: 0.7 },
        { note: 'D5', dur: 0.7 }, { note: 'C5', dur: 1.4 }
      ];

      let idx = 0;
      const playNote = () => {
        if (!ctx || ctx.state !== 'running') return;
        const current = melody[idx];
        const freq = notes[current.note];
        if (freq) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + current.dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + current.dur * 1.1);
        }
        idx = (idx + 1) % melody.length;
      };

      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = window.setInterval(playNote, 520);
      playNote();
    } catch {
      // ignore
    }
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!isPlaying) {
      if (audio) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          startSynthMelody();
          setIsPlaying(true);
        });
      } else {
        startSynthMelody();
        setIsPlaying(true);
      }
      // Show toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      if (audio) audio.pause();
      stopSynthMelody();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (autoStart) {
      toggleMusic();
    }
    return () => {
      stopSynthMelody();
    };
  }, [autoStart]);

  useEffect(() => {
    const handlePauseBg = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthMelody();
    };

    const handleResumeBg = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('pause-bg-music', handlePauseBg);
    window.addEventListener('resume-bg-music', handleResumeBg);

    return () => {
      window.removeEventListener('pause-bg-music', handlePauseBg);
      window.removeEventListener('resume-bg-music', handleResumeBg);
    };
  }, [isPlaying]);

  // Music wave bars animation
  const bars = [4, 7, 3, 8, 5, 6, 3, 7];

  return (
    <>
      <audio ref={audioRef} src={CONFIG.music} loop />

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-20 left-1/2 z-[9998] bg-white/90 backdrop-blur-sm text-[#6b3f63] font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg border border-pink-100"
          >
            🎵 Music is playing~
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="music-btn"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="fixed bottom-5 right-5 z-[999] bg-[#fffdfb] text-[#6b3f63] font-semibold text-sm sm:text-[0.95rem] rounded-full py-3 px-4 shadow-[0_6px_18px_rgba(107,63,99,0.18)] flex items-center gap-2 border border-[#ffd6e8] overflow-hidden"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        animate={{
          boxShadow: isPlaying
            ? ['0 6px 18px rgba(255,111,168,0.2)', '0 10px 28px rgba(255,111,168,0.45)', '0 6px 18px rgba(255,111,168,0.2)']
            : '0 6px 18px rgba(107,63,99,0.18)'
        }}
        transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0 }}
      >
        {/* Music wave visualizer */}
        <div className="flex items-end gap-[2px] h-5">
          {bars.map((height, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-[#ff6fa8]"
              animate={isPlaying ? {
                height: [`${height * 2}px`, `${(height + 4) * 2}px`, `${height * 2}px`]
              } : {
                height: '4px'
              }}
              transition={{
                duration: 0.6 + i * 0.08,
                repeat: isPlaying ? Infinity : 0,
                ease: 'easeInOut',
                delay: i * 0.06
              }}
              style={{ height: isPlaying ? `${height * 2}px` : '4px' }}
            />
          ))}
        </div>
        <span className={isPlaying ? 'text-[#ff6fa8]' : ''}>
          {isPlaying ? 'Playing' : 'Music'}
        </span>
      </motion.button>
    </>
  );
};
