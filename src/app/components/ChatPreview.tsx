import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ChatPreview() {
  const router = useRouter();

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-8 mb-24 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="bg-[#0A0A1A] rounded-xl p-6 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20" />
        
        <h2 className="text-xl font-light text-white/90 mb-6">Ready to work on personal growth?</h2>
        
        <div className="space-y-4 mb-6">
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-[#0F0F24] p-4 rounded-xl text-white/90 max-w-[80%]">
              What area of your life would you like to develop?
            </div>
          </motion.div>
        </div>

        <motion.button
          className="w-full bg-[#0F0F24] text-white/90 p-4 rounded-xl hover:bg-[#161633] transition-colors flex items-center justify-center gap-2 group btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/chat')}
        >
          <span>Start Chatting</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 text-white/70 group-hover:text-white/90 transition-colors"
          >
            <path fillRule="evenodd" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97 2.335.343 4.723.521 7.152.521 2.429 0 4.817-.178 7.152-.521 1.978-.29 3.348-2.024 3.348-3.97V6.741c0-1.946-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
} 