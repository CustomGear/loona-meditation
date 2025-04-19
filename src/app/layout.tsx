import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { HomeIcon, BookOpenIcon, UserIcon } from '@heroicons/react/24/outline'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LUNAMEDITATE',
  description: 'A peaceful meditation experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg border-t border-gray-800">
          <div className="max-w-md mx-auto px-6">
            <div className="flex justify-around py-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                <HomeIcon className="w-6 h-6" />
              </Link>
              <Link href="/journal" className="text-gray-400 hover:text-white transition-colors">
                <BookOpenIcon className="w-6 h-6" />
              </Link>
              <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                <UserIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </nav>
      </body>
    </html>
  )
}
