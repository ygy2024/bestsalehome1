import { useRef, useEffect, useState } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';

export default function FadeInSection({ children, className = '', ...rest }: { children: ReactNode, className?: string } & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} fade-in-section${visible ? ' visible' : ''}`} {...rest}>
      {children}
    </div>
  );
} 