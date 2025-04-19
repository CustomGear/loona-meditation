import { motion } from 'framer-motion';

interface GlowingOrbProps {
  className?: string;
  size?: number;
  color?: string;
}

export const GlowingOrb = ({ 
  className = "", 
  size = 200, 
  color = "rgba(139, 92, 246, 0.5)" // Default purple color
}: GlowingOrbProps) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px solid ${color}`,
          boxShadow: `0 0 20px ${color}`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </div>
  );
}; 