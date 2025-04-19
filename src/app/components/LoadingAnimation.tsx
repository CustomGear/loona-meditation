'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingAnimation() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const particleCount = 30;

  useEffect(() => {
    // Update dimensions on client-side
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    initialX: (Math.random() - 0.5) * dimensions.width,
    initialY: (Math.random() - 0.5) * dimensions.height,
    size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
    delay: Math.random() * 0.5
  }));

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      onAnimationComplete={() => document.body.style.overflow = 'auto'}
    >
      <div className="relative w-32 h-32">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-1 h-1 bg-blue-400 rounded-full loading-particle-${particle.size}`}
            initial={{ 
              x: particle.initialX,
              y: particle.initialY,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: 0,
              y: 0,
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 2,
              delay: particle.delay,
              ease: "easeInOut",
              times: [0, 0.7, 1]
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ 
            scale: [0.2, 1.2, 1],
            opacity: [0, 1, 0.8]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.7, 1]
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
} 