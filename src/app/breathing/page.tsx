'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const BREATHE_IN_TIME = 4;
const HOLD_TIME = 4;
const BREATHE_OUT_TIME = 4;

export default function BreathingExercise() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          if (phase === 'in' && newProgress >= BREATHE_IN_TIME) {
            setPhase('hold');
            return 0;
          } else if (phase === 'hold' && newProgress >= HOLD_TIME) {
            setPhase('out');
            return 0;
          } else if (phase === 'out' && newProgress >= BREATHE_OUT_TIME) {
            setPhase('in');
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, phase]);

  const getMessage = () => {
    switch (phase) {
      case 'in':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'out':
        return 'Breathe Out';
    }
  };

  const getScale = () => {
    switch (phase) {
      case 'in':
        return 1 + (progress / BREATHE_IN_TIME) * 0.3;
      case 'hold':
        return 1.3;
      case 'out':
        return 1.3 - (progress / BREATHE_OUT_TIME) * 0.3;
    }
  };

  return (
    <main className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto">
        <button 
          onClick={() => router.back()}
          className="btn-primary mb-8 flex items-center"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="relative flex justify-center items-center min-h-[400px]">
          <motion.div
            className="orb"
            animate={{
              scale: getScale(),
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              scale: { duration: 0.5 },
              opacity: { duration: 2, repeat: Infinity },
            }}
          />
          
          <motion.div
            className="absolute text-2xl font-bold text-white/80"
            initial={false}
            animate={{
              opacity: isPlaying ? 1 : 0,
              y: isPlaying ? 0 : 20,
            }}
          >
            {getMessage()}
          </motion.div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-primary p-6 rounded-full"
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8" />
            )}
          </button>
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p className="text-lg mb-2">Box Breathing Exercise</p>
          <p>Breathe in for 4 seconds</p>
          <p>Hold for 4 seconds</p>
          <p>Breathe out for 4 seconds</p>
        </div>
      </div>
    </main>
  );
} 