'use client';

import { motion } from 'framer-motion';
import { ArrowLeftIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const guidedMeditations = [
  {
    id: 1,
    title: 'Mindful Breathing',
    duration: '10 min',
    description: 'Focus on your breath to find inner peace',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Body Scan',
    duration: '15 min',
    description: 'Release tension throughout your body',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Loving Kindness',
    duration: '12 min',
    description: 'Cultivate compassion and positive energy',
    color: 'pink',
  },
];

export default function GuidedMeditation() {
  const router = useRouter();

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

        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Guided Meditations
        </h1>

        <div className="space-y-4">
          {guidedMeditations.map((meditation) => (
            <motion.div
              key={meditation.id}
              className="parallax-card card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: meditation.id * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="parallax-content">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{meditation.title}</h3>
                  <span className="text-sm text-gray-400">{meditation.duration}</span>
                </div>
                <p className="text-gray-400 mb-4">{meditation.description}</p>
                <button 
                  className={`btn-primary w-full flex items-center justify-center bg-${meditation.color}-500/20`}
                  onClick={() => router.push(`/guided/${meditation.id}`)}
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Start Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 