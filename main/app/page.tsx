'use client'

import React from 'react'
import { MintLogo, ChevronRightIcon } from '@/components/Icons/Icons'
import { Button } from '@/components/ui/button'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { Transition } from '@tailwindui/react'
import { useMutation } from '@tanstack/react-query'
import Loading from '@/components/Loading'
import { toast } from '@/components/ui/use-toast'
import Configuration from '@/components/Onboarding/Configuration'
import { toast as sonnerToast } from 'sonner'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

// Different stages that occur
// opening: The opening screen
// checkConfig: The screen to check the configuration
type stageType = 'opening' | 'checkConfig'

export default function MainPage (): JSX.Element {
  const [screen, setScreen] = React.useState<stageType>('opening')
  const [open, setOpen] = React.useState(false)

  function onContinue (): void {
    setScreen('checkConfig')
    checkConfig.mutate()
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => { document.removeEventListener('keydown', down) }
  }, [])

  // Mutation that checks if local.config.json is present or not
  const checkConfig = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/utils/checkConfig`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(async (res) => await res.json())
        if (typeof (res.config) === 'boolean') {
          return res
        } else {
          throw new Error('Fetching error, config not boolean')
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          toast({
            title: 'Error',
            description: 'Error in fetching config',
            variant: 'destructive'
          })
        }
        throw new Error('Error in fetching config')
      }
    }
  })

  function deleteConfigFn (): void {
    deleteConfig.mutate()
  }

  const deleteConfig = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/utils/checkConfig`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(async (res) => await res.json())
        if (typeof (res.message) === 'string') {
          sonnerToast.success('Config deleted')
          return res
        } else {
          throw new Error('Fetching error, message not string')
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          toast({
            title: 'Error',
            description: 'Error in deleting config',
            variant: 'destructive'
          })
        }
        throw new Error('Error in deleting config')
      }
    }
  })

  return (
    <div className='z-10'>
      {/* Opening page where user starts and calls mutation */}
      <Transition
        show={screen === 'opening'}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex flex-col h-screen">
          <div className="flex-1 relative">
            <MintLogo className="absolute top-6 left-6 w-20 h-20 text-white" />
            <div className="absolute bottom-6 left-6 p-4 rounded-md max-w-[500px]">
              <h1 className="text-4xl font-bold mb-2">MOSS</h1>
              <div className="font-semibold text-xl">
                <TextGenerateEffect words={'Visualizing Brainwaves made easy.'} className='text-mint-black' />
              </div>
            </div>
            <div className="absolute bottom-6 right-6">
              <Button
                className="p-10 rounded-full text-xl font-semibold hover:bg-slate-300 hover:text-black shadow-md"
                onClick={() => { onContinue() }}
              >
                Continue
                <ChevronRightIcon className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Transition>
      {/* Checks config, if present, user continues. If not create new. */}
      <Transition
        show={screen === 'checkConfig'}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex flex-col h-screen justify-center items-center">
          {checkConfig.isPending && <Loading />}
          {checkConfig.isError && <p>Error!</p>}
          {checkConfig.isSuccess && (
            <div>
              <Configuration present={Boolean(checkConfig.data.config)} />
            </div>
          )}
        </div>
      </Transition>
      <div className="absolute left-0 top-0 h-[100vh] w-full bg-off-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center -z-10" />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem >
              <span onClick={() => { deleteConfigFn() }}>Delete Config</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
