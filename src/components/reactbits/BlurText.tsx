import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, type Transition } from 'framer-motion';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
};

export const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 80,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px',
  stepDuration = 0.4
}) => {
  const elements = useMemo(() => {
    return animateBy === 'words' ? text.split(' ') : text.split('');
  }, [text, animateBy]);

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const fromSnapshot = useMemo(
    () => ({
      filter: 'blur(10px)',
      opacity: 0,
      y: direction === 'top' ? -25 : 25
    }),
    [direction]
  );

  const toSnapshot = useMemo(
    () => ({
      filter: 'blur(0px)',
      opacity: 1,
      y: 0
    }),
    []
  );

  return (
    <div ref={ref} className={`blur-text flex flex-wrap justify-center items-center ${className}`.trim()}>
      {elements.map((segment, index) => {
        const spanTransition: Transition = {
          duration: stepDuration,
          delay: (index * delay) / 1000,
          ease: [0.16, 1, 0.3, 1]
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? toSnapshot : fromSnapshot}
            transition={spanTransition}
            className="inline-block will-change-[transform,filter,opacity]"
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </div>
  );
};

export default BlurText;
