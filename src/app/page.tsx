'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRouter } from 'next/navigation';

const AffirmationText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <motion.div 
      className="flex flex-col items-center space-y-6 mb-16 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-sm tracking-[0.3em] text-white/40 uppercase font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Today's Affirmation
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="text-2xl md:text-3xl font-light text-white/90 relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          >
            <span className="relative z-10">{word}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const Particle = ({ index }: { index: number }) => {
  const x = useMotionValue(Math.random() * 100);
  const y = useMotionValue(Math.random() * 100);
  const scale = useMotionValue(Math.random() * 2 + 0.5);

  useEffect(() => {
    const controls = animate(x, Math.random() * 100, {
      duration: Math.random() * 10 + 10,
      repeat: Infinity,
      ease: "linear"
    });

    return controls.stop;
  }, [x]);

  useEffect(() => {
    const controls = animate(y, Math.random() * 100, {
      duration: Math.random() * 10 + 10,
      repeat: Infinity,
      ease: "linear"
    });

    return controls.stop;
  }, [y]);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
      style={{
        x: useTransform(x, [0, 100], [0, window.innerWidth]),
        y: useTransform(y, [0, 100], [0, window.innerHeight]),
        scale
      }}
    />
  );
};

export default function Home() {
  const router = useRouter();
  const todaysAffirmation = "I breathe in clarity. I exhale tension.";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute w-full h-full rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
          <div className="absolute w-full h-full rounded-full bg-purple-500/20 blur-[80px] animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute w-full h-full rounded-full bg-indigo-500/20 blur-[60px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-400/40 via-purple-400/40 to-indigo-400/40 opacity-50 animate-gradient" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#030303] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a0a1a] via-[#050510] to-[#030303] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden bg-[url('/noise.png')] opacity-[0.015] mix-blend-soft-light pointer-events-none" />
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Title */}
      <motion.div
        className="text-center mb-16 px-4 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-50" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] text-white relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 animate-text-shimmer">
            LUNA MEDITATE
          </span>
        </h1>
      </motion.div>

      {/* Glowing Orb */}
      <motion.div
        className="relative w-48 sm:w-56 h-48 sm:h-56 mb-16 group"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute w-full h-full rounded-full bg-blue-500/20 blur-[100px] animate-pulse group-hover:blur-[120px] transition-all duration-500" />
        <div className="absolute w-full h-full rounded-full bg-purple-500/20 blur-[80px] animate-pulse group-hover:blur-[100px] transition-all duration-500" style={{ animationDelay: '0.5s' }} />
        <div className="absolute w-full h-full rounded-full bg-indigo-500/20 blur-[60px] animate-pulse group-hover:blur-[80px] transition-all duration-500" style={{ animationDelay: '1s' }} />
        <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-400/40 via-purple-400/40 to-indigo-400/40 opacity-50 animate-gradient group-hover:opacity-70 transition-opacity duration-500" />
        <div className="absolute inset-0 rounded-full border border-white/10 backdrop-blur-sm group-hover:border-white/20 transition-all duration-500" />
      </motion.div>

      {/* Today's Affirmation */}
      <AffirmationText text={todaysAffirmation} />

      {/* Navigation Buttons */}
      <motion.div
        className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-5xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={() => router.push('/chat')}
          className="group flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a3a]/80 to-[#2a2a4a]/80 p-4 sm:p-8 rounded-2xl text-center hover:from-[#2a2a4a]/90 hover:to-[#3a3a5a]/90 transition-all duration-500 border border-white/5 hover:border-white/20 shadow-lg hover:shadow-2xl relative overflow-hidden backdrop-blur-sm"
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={(e: MouseEvent) => {
            const button = e.currentTarget as HTMLButtonElement;
            button.addEventListener('mousemove', (e: MouseEvent) => {
              const rect = button.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              button.style.setProperty('--mouse-x', `${x}px`);
              button.style.setProperty('--mouse-y', `${y}px`);
            });
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(120,120,255,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 transition-all duration-500 group-hover:translate-x-[calc((var(--mouse-x)-50%)*0.1)] group-hover:translate-y-[calc((var(--mouse-y)-50%)*0.1)]">
            <div className="text-white/90 text-sm sm:text-xl mb-1 sm:mb-2 font-medium tracking-wider group-hover:text-white/100 transition-colors duration-500">CHAT</div>
            <p className="text-white/50 text-xs tracking-wide group-hover:text-white/70 transition-colors duration-500">Personal Growth</p>
          </div>
        </motion.button>

        <motion.button
          onClick={() => router.push('/meditation')}
          className="group flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a3a]/80 to-[#2a2a4a]/80 p-4 sm:p-8 rounded-2xl text-center hover:from-[#2a2a4a]/90 hover:to-[#3a3a5a]/90 transition-all duration-500 border border-white/5 hover:border-white/20 shadow-lg hover:shadow-2xl relative overflow-hidden backdrop-blur-sm"
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={(e: MouseEvent) => {
            const button = e.currentTarget as HTMLButtonElement;
            button.addEventListener('mousemove', (e: MouseEvent) => {
              const rect = button.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              button.style.setProperty('--mouse-x', `${x}px`);
              button.style.setProperty('--mouse-y', `${y}px`);
            });
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(120,120,255,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 transition-all duration-500 group-hover:translate-x-[calc((var(--mouse-x)-50%)*0.1)] group-hover:translate-y-[calc((var(--mouse-y)-50%)*0.1)]">
            <div className="text-white/90 text-sm sm:text-xl mb-1 sm:mb-2 font-medium tracking-wider group-hover:text-white/100 transition-colors duration-500">MEDITATE</div>
            <p className="text-white/50 text-xs tracking-wide group-hover:text-white/70 transition-colors duration-500">Guided Sessions</p>
          </div>
        </motion.button>

        <motion.button
          onClick={() => router.push('/journal')}
          className="group flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a3a]/80 to-[#2a2a4a]/80 p-4 sm:p-8 rounded-2xl text-center hover:from-[#2a2a4a]/90 hover:to-[#3a3a5a]/90 transition-all duration-500 border border-white/5 hover:border-white/20 shadow-lg hover:shadow-2xl relative overflow-hidden backdrop-blur-sm"
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={(e: MouseEvent) => {
            const button = e.currentTarget as HTMLButtonElement;
            button.addEventListener('mousemove', (e: MouseEvent) => {
              const rect = button.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              button.style.setProperty('--mouse-x', `${x}px`);
              button.style.setProperty('--mouse-y', `${y}px`);
            });
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(120,120,255,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 transition-all duration-500 group-hover:translate-x-[calc((var(--mouse-x)-50%)*0.1)] group-hover:translate-y-[calc((var(--mouse-y)-50%)*0.1)]">
            <div className="text-white/90 text-sm sm:text-xl mb-1 sm:mb-2 font-medium tracking-wider group-hover:text-white/100 transition-colors duration-500">JOURNAL</div>
            <p className="text-white/50 text-xs tracking-wide group-hover:text-white/70 transition-colors duration-500">Daily Reflections</p>
          </div>
        </motion.button>
      </motion.div>
    </main>
  );
}
