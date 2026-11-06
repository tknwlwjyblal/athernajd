import React, { useEffect, useState } from 'react';

export const LuxuryCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [cursorText, setCursorText] = useState<string>('');

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [role="button"], [data-interactive="true"]');
      if (interactive) {
        setIsHovering(true);
        const customAction = interactive.getAttribute('data-cursor-action');
        setCursorText(customAction || '');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth trailing animation frame for the outer aura ring
    let animId: number;
    let currX = -100;
    let currY = -100;

    const followLoop = () => {
      currX += (position.x - currX) * 0.18;
      currY += (position.y - currY) * 0.18;
      setTrailingPos({ x: currX, y: currY });
      animId = requestAnimationFrame(followLoop);
    };

    animId = requestAnimationFrame(followLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Outer Luxury Trailing Fluid Aura */}
      <div
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.75 : isHovering ? 1.55 : 1
          })`,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
        }}
        className={`absolute top-0 left-0 rounded-full border transition-colors duration-200 flex items-center justify-center ${
          isHovering
            ? 'w-12 h-12 bg-[#c5a059]/15 border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.4)] backdrop-blur-[1px]'
            : 'w-8 h-8 bg-transparent border-[#c5a059]/50'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-bold text-[#775a19] tracking-tight whitespace-nowrap animate-pulse">
            {cursorText}
          </span>
        )}
      </div>

      {/* 2. Inner Golden Dot */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 1.8 : isHovering ? 0.4 : 1
          })`,
          transition: 'transform 0.08s ease-out',
        }}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#775a19] shadow-[0_0_6px_#c5a059]"
      />
    </div>
  );
};
