'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000
          }
        }
      })
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
