import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { PrepProvider } from '@/components/prep-provider'
import { AppSidebar } from '@/components/app-sidebar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'AI Contest Prep Prediction',
  description:
    '16-week body composition forecasting and coaching support for natural bodybuilding contest prep.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <PrepProvider>
          <div className="flex min-h-dvh">
            <AppSidebar />
            <main className="flex-1 overflow-x-hidden">{children}</main>
          </div>
        </PrepProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
