import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Footer() {
  const router = useRouter();

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-[#0A0A1A]/90 backdrop-blur-lg border-t border-white/5 p-4 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <motion.button
          className="p-3 rounded-xl hover:bg-[#161633] transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/70 group-hover:text-white/90">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </motion.button>

        <motion.button
          className="p-3 rounded-xl hover:bg-[#161633] transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/meditation')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/70 group-hover:text-white/90">
            <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
          </svg>
        </motion.button>

        <motion.button
          className="p-3 rounded-xl hover:bg-[#161633] transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/chat')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/70 group-hover:text-white/90">
            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 002.583-.509 6.722 6.722 0 002.073-1.379l.866-.99a7.647 7.647 0 014.073-2.102.75.75 0 00-.154-1.49 9.147 9.147 0 00-4.87 2.512l-.867.99a5.221 5.221 0 01-1.61 1.072 5.221 5.221 0 01-2.006.395 5.208 5.208 0 01-.93-.079v-.002L4.804 21.644z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97 2.335.343 4.723.521 7.152.521 2.429 0 4.817-.178 7.152-.521 1.978-.29 3.348-2.024 3.348-3.97V6.741c0-1.946-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
          </svg>
        </motion.button>

        <motion.button
          className="p-3 rounded-xl hover:bg-[#161633] transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/profile')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/70 group-hover:text-white/90">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
} 