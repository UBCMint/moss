'use client'

import React from 'react'
import { MintLogo, ChevronRightIcon } from '@/components/Icons/Icons'
import { Button } from '@/components/ui/button'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

const words = 'Visualizing Brainwaves made easy.'

export default function Component (): JSX.Element {
  return (
    <div className='z-10'>
      <div className="flex flex-col h-screen">
        <div className="flex-1 relative">
          <MintLogo className="absolute top-6 left-6 w-20 h-20 text-white" />
          <div className="absolute bottom-6 left-6 p-4 rounded-md max-w-[500px]">
            <h1 className="text-4xl font-bold mb-2">MOSS</h1>
            <div className="font-semibold text-xl">
              <TextGenerateEffect words={words} className='text-mint-black' />
            </div>
          </div>
          <div className="absolute bottom-6 right-6">
            <Button className="p-10 rounded-full text-xl font-semibold hover:bg-slate-300 hover:text-black shadow-md">
              Continue
              <ChevronRightIcon className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 h-[100vh] w-full bg-off-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center -z-10" />
    </div>
  )
}
