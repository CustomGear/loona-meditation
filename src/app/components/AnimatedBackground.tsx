'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BackgroundParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<BackgroundParticle[]>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-purple-500/5 to-blue-500/5 blur-3xl"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Additional ambient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
} 