import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('button, a, input, select, textarea, [role="button"]');
        setIsHovered(Boolean(isClickable));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing animation
    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central Sharp Crosshair Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isHovered
              ? 'w-2 h-2 bg-rose shadow-[0_0_8px_#FF3B9D]'
              : 'w-1.5 h-1.5 bg-cerulean shadow-[0_0_6px_#38BDF8]'
          }`}
        />
      </div>

      {/* Outer Futuristic Target Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`
        }}
      >
        <div
          className={`rounded-full border border-dashed transition-all duration-200 flex items-center justify-center ${
            isHovered
              ? 'w-9 h-9 border-rose rotate-45 scale-110 shadow-[0_0_15px_rgba(255,59,157,0.4)]'
              : 'w-6 h-6 border-cerulean/50 scale-100'
          }`}
        />
      </div>
    </>
  );
};
