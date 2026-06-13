import { useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

export default function ShinyText({
  text,
  baseColor = '#64CEFB',
  shineColor = '#ffffff',
  speed = 3,
  spread = 100,
  className = '',
}) {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;
    const cycle = ((t / 1000) / speed) % 1;
    const pos = cycle * 200 - 30;
    ref.current.style.backgroundImage = `linear-gradient(${spread}deg,
      ${baseColor} 0%,
      ${baseColor} ${Math.max(0, pos)}%,
      ${shineColor} ${pos + 12}%,
      ${baseColor} ${Math.min(100, pos + 24)}%,
      ${baseColor} 100%)`;
  });

  return (
    <span
      ref={ref}
      className={className}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${baseColor}, ${baseColor})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        display: 'block',
      }}
    >
      {text}
    </span>
  );
}
