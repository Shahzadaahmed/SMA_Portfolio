'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { animate, createScope, stagger, utils } from 'animejs';

interface Particle {
  x: number;
  y: number;
  size: number;
  colorIndex: number;
};

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4'];
const COUNT = 45;

const ParticleBackground = () => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate positions only on the client to avoid SSR/CSR mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: COUNT }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        colorIndex: i % 3,
      })),
    );
  }, []);

  // Start animations once particles have been mounted
  useEffect(() => {
    if (particles.length === 0 || !root.current) return;

    scope.current = createScope({ root: root as any }).add(() => {
      animate('.anime-particle', {
        translateX: () => `${utils.random(-180, 180)}px`,
        translateY: () => `${utils.random(-180, 180)}px`,
        opacity: () => utils.random(0.05, 0.4),
        scale: () => utils.random(0.5, 2),
        duration: () => utils.random(5000, 11000),
        delay: stagger(80),
        ease: 'inOut(2)',
        loop: true,
        alternate: true,
      });
    });

    return () => {
      scope.current?.revert();
      scope.current = null;
    };
  }, [particles]);

  if (particles.length === 0) return null;

  return (
    <div
      ref={root}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="anime-particle absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: COLORS[p.colorIndex],
            opacity: 0.15,
            boxShadow: `0 0 ${p.size * 4}px ${COLORS[p.colorIndex]}`,
          }}
        />
      ))}
    </div>
  );
};

export default memo(ParticleBackground);