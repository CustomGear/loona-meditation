'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { PlayIcon, PauseIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function MeditationSession() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const controls = useAnimation();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
      
      controls.start({
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    } else {
      controls.start({
        scale: 1,
        opacity: 0.8,
        transition: { duration: 0.5 }
      });
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, controls]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-black p-4 relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <motion.button 
          onClick={() => router.back()}
          className="btn-primary mb-12 flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </motion.button>

        <div className="relative flex justify-center items-center min-h-[400px]">
          <motion.div
            className="orb"
            animate={controls}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                style={{
                  width: '4px',
                  height: '4px',
                  transform: `rotate(${(360 / 8) * i}deg) translateX(100px)`,
                }}
                animate={{
                  opacity: isPlaying ? [0.4, 1, 0.4] : 0.4,
                  scale: isPlaying ? [1, 1.5, 1] : 1,
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
          
          <motion.div
            className="absolute text-6xl font-extralight gradient-text"
            initial={false}
            animate={{
              scale: isPlaying ? [1, 1.05, 1] : 1,
              opacity: isPlaying ? 1 : 0.7,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {formatTime(timeLeft)}
          </motion.div>
        </div>

        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-primary p-8 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8" />
            )}
          </motion.button>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-extralight gradient-text mb-4">
            Quick Meditation Session
          </h2>
          <p className="text-gray-400 text-lg">
            Find a comfortable position and focus on your breath
          </p>
        </motion.div>
      </div>
    </main>
  );
} 