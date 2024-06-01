'use client'

import React from 'react'

export default function Loading (): JSX.Element {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-8 border-black border-t-transparent" />
        <p className="font-semibold">Loading...</p>
      </div>
    </div>
  )
}
