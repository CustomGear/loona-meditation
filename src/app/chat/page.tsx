'use client';

import { motion } from 'framer-motion';
import ChatLogic from './ChatLogic';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#030303] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a0a1a] via-[#050510] to-[#030303] flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden bg-[url('/noise.png')] opacity-[0.015] mix-blend-soft-light pointer-events-none" />
      <div className="fixed inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-4 sm:py-8 relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl text-white/70 hover:text-white/90 transition-colors mb-4"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-b from-[#0A0A1A]/80 to-[#0F0F24]/80 rounded-2xl h-[calc(100vh-8rem)] flex flex-col overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm relative"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-blue-500/5 opacity-50 pointer-events-none" />
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#0A0A1A]/90 to-[#0F0F24]/90 relative z-10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-50" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/40 via-purple-400/40 to-indigo-400/40 opacity-50 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-light text-white/90 tracking-wide">Chat with Luna</h1>
                <p className="text-sm text-white/50">Your mindfulness companion</p>
              </div>
            </div>
          </div>

          {/* Chat Logic Component */}
          <ChatLogic />
        </motion.div>
      </div>
    </main>
  );
} 