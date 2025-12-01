import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'none';
}

const FadeIn: React.FC<Props> = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });

    if (domRef.current) observer.observe(domRef.current);

    return () => observer.disconnect();
  }, []);

  const transformClass = direction === 'up' 
    ? (isVisible ? 'translate-y-0' : 'translate-y-8')
    : '';

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${transformClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeIn;