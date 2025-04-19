'use client';

import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ClockIcon, 
  CogIcon,
  BellIcon 
} from '@heroicons/react/24/outline';

export default function Profile() {
  const stats = [
    { label: 'Total Sessions', value: '28' },
    { label: 'Meditation Hours', value: '12.5' },
    { label: 'Current Streak', value: '5 days' },
  ];

  return (
    <main className="min-h-screen bg-black p-4">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Profile
      </h1>

      {/* Profile Header */}
      <div className="max-w-md mx-auto">
        <div className="card p-6 mb-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Luna Meditator</h2>
          <p className="text-gray-400">Mindfulness Explorer</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-4 text-center"
            >
              <div className="text-xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <button className="card w-full flex items-center p-6">
            <div className="bg-blue-500/20 p-3 rounded-full mr-4">
              <BellIcon className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-lg">Notifications</span>
          </button>

          <button className="card w-full flex items-center p-6">
            <div className="bg-purple-500/20 p-3 rounded-full mr-4">
              <ChartBarIcon className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-lg">Statistics</span>
          </button>

          <button className="card w-full flex items-center p-6">
            <div className="bg-green-500/20 p-3 rounded-full mr-4">
              <CogIcon className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-lg">Settings</span>
          </button>
        </div>
      </div>
    </main>
  );
} 