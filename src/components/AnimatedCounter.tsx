import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animFrame: number;

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentVal = Math.floor(easedProgress * end);

      setCount(currentVal);

      if (progress < 1) {
        animFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animFrame);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      {prefix}
      {count.toLocaleString('ar-SA')}
      {suffix}
    </span>
  );
};
