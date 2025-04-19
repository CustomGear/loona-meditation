import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
}

export default function GlowingOrb() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 15;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360,
      y: Math.random() * 360,
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Main Orb Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/50 to-blue-400/50 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Core Orb */}
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-500/80 to-blue-500/80"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 0.9, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
            }}
            animate={{
              x: [particle.x, particle.x + 20, particle.x],
              y: [particle.y, particle.y + 20, particle.y],
              rotate: [particle.rotation, particle.rotation + 360],
              opacity: [particle.opacity, particle.opacity + 0.2, particle.opacity],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Inner Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-300/20 to-blue-300/20 blur-md"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
} 