import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagnetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
  className?: string;
  children: React.ReactNode;
}

export const MagnetButton: React.FC<MagnetButtonProps> = ({
  strength = 0.25,
  className = '',
  children,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useSpring(0, { stiffness: 180, damping: 15 });
  const y = useSpring(0, { stiffness: 180, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.94 }}
      className={`relative will-change-transform ${className}`.trim()}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

export default MagnetButton;
