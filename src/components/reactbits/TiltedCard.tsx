import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, type SpringOptions } from 'framer-motion';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  className?: string;
  imageClassName?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  children?: React.ReactNode;
}

const springValues: SpringOptions = {
  damping: 25,
  stiffness: 150,
  mass: 1.2
};

export const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText = 'Polaroid photo',
  captionText = '',
  className = '',
  imageClassName = '',
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  children
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const glareOpacity = useSpring(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY });
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    glareOpacity.set(0.45);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }

  return (
    <div
      ref={ref}
      className={`relative [perspective:1000px] flex flex-col items-center justify-center cursor-pointer select-none ${className}`.trim()}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative [transform-style:preserve-3d] will-change-transform w-full h-full"
        style={{
          rotateX,
          rotateY,
          scale
        }}
      >
        {/* Child card/polaroid structure */}
        {children ? (
          children
        ) : (
          <div className="relative bg-white p-3.5 pb-8 rounded-[14px] shadow-[0_18px_40px_rgba(107,63,99,0.18)] border border-pink-100 overflow-hidden w-full">
            <div className="w-full aspect-square rounded-[8px] overflow-hidden bg-gradient-to-br from-[#ffd6e8] to-[#cdeaff]">
              <img
                src={imageSrc}
                alt={altText}
                className={`w-full h-full object-cover ${imageClassName}`}
              />
            </div>
            {captionText && (
              <div className="text-center font-display mt-3 text-[#6b3f63] font-semibold text-sm">
                {captionText}
              </div>
            )}
          </div>
        )}

        {/* Dynamic Specular Glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[14px] z-30 transition-opacity duration-300"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 65%)`
          }}
        />
      </motion.div>
    </div>
  );
};

export default TiltedCard;
