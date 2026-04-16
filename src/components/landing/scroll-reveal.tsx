'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({ children, delay = 0, y = 28, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Don't animate elements already visible on page load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    el.style.opacity = '0';
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
