import React, { useRef, useState, MouseEvent } from 'react';
import { soundEngine } from '../utils/audioEffects';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  spotlightColor?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  withSound?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.015,
  spotlightColor = 'rgba(197, 160, 89, 0.16)',
  onClick,
  withSound = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Calculate normalized coords between -1 and 1
    const normX = (x / width) * 2 - 1;
    const normY = (y / height) * 2 - 1;

    const rotateX = -normY * maxTilt;
    const rotateY = normX * maxTilt;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );

    setSpotlightPos({
      x: (x / width) * 100,
      y: (y / height) * 100,
      opacity: 1,
    });
  };

  const handleMouseEnter = () => {
    // Subtle entry state
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    if (withSound) {
      soundEngine.playClick();
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      style={{
        transform: isPressed ? `${transform} scale3d(0.985, 0.985, 0.985)` : transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease',
      }}
      className={`relative rounded-2xl will-change-transform ${className}`}
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(circle 280px at ${spotlightPos.x}% ${spotlightPos.y}%, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Children Content */}
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};
