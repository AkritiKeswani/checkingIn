import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/navigation'
import { ReplitAuthProvider } from '@/components/ReplitAuthProvider'

export const metadata: Metadata = {
  title: 'CheckingIn - AI Wellness Coach',
  description: 'Your AI wellness coach that analyzes health data screenshots and provides personalized guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReplitAuthProvider>
          <Navigation />
          {children}
        </ReplitAuthProvider>
      </body>
    </html>
  )
}