'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Journal() {
  const journalEntries = [
    {
      id: 1,
      date: 'Today',
      duration: '15 min',
      mood: 'Peaceful',
      notes: 'Focused on breath awareness. Felt very centered.',
    },
    {
      id: 2,
      date: 'Yesterday',
      duration: '20 min',
      mood: 'Calm',
      notes: 'Guided meditation session. Deep relaxation achieved.',
    },
  ];

  return (
    <main className="min-h-screen bg-black p-4">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Journal
      </h1>

      <div className="max-w-md mx-auto">
        <button className="card w-full flex items-center p-6 mb-8">
          <div className="bg-green-500/20 p-3 rounded-full mr-4">
            <PencilIcon className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-lg font-semibold">New Entry</span>
        </button>

        <div className="space-y-4">
          {journalEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-gray-300">{entry.date}</span>
                </div>
                <span className="text-sm text-gray-400">{entry.duration}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-purple-400 font-medium">Mood: </span>
                  <span className="ml-2 text-gray-300">{entry.mood}</span>
                </div>
                <p className="text-gray-400">{entry.notes}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 