import { TailwindIndicator } from '@/components/TailwindIndicator'
import "@/styles/globals.css"
import { Metadata } from "next"
import React from 'react'

import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

import { Greeting } from "@/components/greeting"
import { StyleSwitcher } from "@/components/style-switcher"
import { ThemeProvider } from "@/components/theme-provider"

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function MyApp({ children }: ExamplesLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-clip bg-black">
      <head />
      <ReactQueryClientProvider>
      <body className="overflow-clip bg-transparent font-sans antialiased scrollbar-none">
        <Greeting />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="h-screen overflow-clip">
            <div
              className={cn(
                "h-screen overflow-auto border-t bg-background pb-8",
                // "scrollbar-none"
                "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
              )}
            >
              {children}
            </div>
          </div>
          <Toaster />
          <SonnerToaster />
          <TailwindIndicator />
        </ThemeProvider>
        <StyleSwitcher />
      </body>
      </ReactQueryClientProvider>
    </html>
  )
}

export const metadata: Metadata = {
  icons: {
    shortcut: ["#"],
  },
}
