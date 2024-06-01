import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '@/styles/globals.css'
import React from 'react'
import { TailwindIndicator } from '@/components/TailwindIndicator'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'MOSS',
  description: 'Open Source EEG Data Analysis Platform'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased',
          fontSans.variable)}>
          {children}
          <Toaster />
          <TailwindIndicator />
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}
