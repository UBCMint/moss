'use client'

import React from 'react'

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return <div className='w-full min-h-screen bg-off-white'>{children}</div>
}
