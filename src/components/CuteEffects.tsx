import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

// Confetti & balloons bursts
export const triggerFx = {
  confetti: () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6, x: 0.3 },
      colors: ['#ff8fc2', '#ff6fa8', '#ffd6e8', '#fff3c4', '#cdeaff']
    });
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6, x: 0.7 },
      colors: ['#ff8fc2', '#ff6fa8', '#ffd6e8', '#fff3c4', '#cdeaff']
    });
  },
  hearts: () => {
    const emojis = ['💖', '💗', '💕', '💓', '🌸', '🎀'];
    const container = document.getElementById('fx-layer');
    if (!container) return;

    for (let i = 0; i < 25; i++) {
      const el = document.createElement('span');
      el.className = 'fixed pointer-events-none select-none z-[4500] text-2xl';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${Math.random() * 95}vw`;
      el.style.bottom = '-40px';

      const drift = Math.random() * 120 - 60;
      const duration = 2000 + Math.random() * 2000;

      el.animate(
        [
          { transform: 'translate(0, 0) scale(0.6)', opacity: 1 },
          { transform: `translate(${drift}px, -105vh) scale(1.3)`, opacity: 0 }
        ],
        { duration, easing: 'ease-out' }
      );

      container.appendChild(el);
      setTimeout(() => el.remove(), duration + 100);
    }
  },
  balloons: () => {
    const container = document.getElementById('fx-layer');
    if (!container) return;

    const balloonEmojis = ['🎈', '🎀', '🌸', '✨'];
    for (let i = 0; i < 15; i++) {
      const el = document.createElement('span');
      el.className = 'fixed pointer-events-none select-none z-[4500] text-3xl';
      el.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
      el.style.left = `${Math.random() * 95}vw`;
      el.style.bottom = '-50px';

      const drift = Math.random() * 160 - 80;
      const duration = 3000 + Math.random() * 2500;

      el.animate(
        [
          { transform: 'translate(0, 0)', opacity: 1 },
          { transform: `translate(${drift}px, -115vh) rotate(${Math.random() * 40 - 20}deg)`, opacity: 0 }
        ],
        { duration, easing: 'cubic-bezier(0.2, 0.6, 0.4, 1)' }
      );

      container.appendChild(el);
      setTimeout(() => el.remove(), duration + 100);
    }
  },
  all: () => {
    triggerFx.confetti();
    triggerFx.hearts();
    triggerFx.balloons();
  }
};

// Top Progress Bar
export const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[5px] z-[9999] rounded-r-md transition-all duration-100 ease-out"
      style={{
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, #ff6fa8, #e6d9ff, #ff8fc2)'
      }}
    />
  );
};

// Floating background decorations for sections
export const FloatingDecos: React.FC<{ count?: number }> = ({ count = 6 }) => {
  const [decos, setDecos] = useState<
    { id: number; char: string; left: string; top: string; size: string; duration: string; delay: string }[]
  >([]);

  useEffect(() => {
    const emojis = ['🌸', '💖', '✨', '⭐', '☁️', '🦋', '🍓', '💗', '🎀'];
    const items = Array.from({ length: count }, (_, i) => ({
      id: i,
      char: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 90}%`,
      top: `${Math.random() * 85}%`,
      size: `${1 + Math.random() * 1.5}rem`,
      duration: `${4 + Math.random() * 4}s`,
      delay: `${Math.random() * 3}s`
    }));
    setDecos(items);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[1]">
      {decos.map((d) => (
        <span
          key={d.id}
          className="absolute opacity-80 animate-float-y"
          style={{
            left: d.left,
            top: d.top,
            fontSize: d.size,
            animationDuration: d.duration,
            animationDelay: d.delay
          }}
        >
          {d.char}
        </span>
      ))}
    </div>
  );
};

// Global cursor sparkles & click emoji burst
export const CursorEffects: React.FC = () => {
  useEffect(() => {
    let lastSpark = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSpark < 90) return;
      lastSpark = now;

      const spark = document.createElement('span');
      spark.className = 'fixed pointer-events-none z-[9998] text-sm animate-[sparkPop_0.9s_ease-out_forwards]';
      spark.textContent = ['✨', '💫', '🌟'][Math.floor(Math.random() * 3)];
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      spark.style.setProperty('--dx', `${Math.random() * 30 - 15}px`);
      spark.style.setProperty('--dy', `${-20 - Math.random() * 20}px`);
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 900);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, a, input, [role="button"]')) return;

      const emojis = ['💗', '🌸', '✨', '🎀', '💕', '🦋', '⭐'];
      const el = document.createElement('span');
      el.className = 'fixed pointer-events-none z-[9998] text-2xl animate-[clickFloat_1.1s_ease-out_forwards]';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${e.clientX - 13}px`;
      el.style.top = `${e.clientY - 13}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return <div id="fx-layer" className="fixed inset-0 pointer-events-none z-[4500] overflow-hidden" />;
};
