'use client'

import React from 'react'

import {
  MintLogo,
  SearchIcon,
  KeyboardArrowDownIcon
} from '@/components/Icons/Icons'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type Options = 'az' | 'recadd' | 'chanum'

export default function HeadsetsPage (): JSX.Element {
  const [position, setPosition] = React.useState<Options>('az')

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mx-6">
        <div className="space-y-2">
          <h3 className="mt-6 text-2xl font-bold tracking-tigh">
            Headset Home
          </h3>
          <p className="font-semibold">
            A library of NeuroTech headsets and their features.
          </p>
        </div>
        <div className="flex items-center">
          <MintLogo className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="w-2/4 mx-6 mt-10 flex min-w-[500px]">
        <div className="flex items-center w-2/3 max-w-3xl bg-white rounded-md border-2 shadow-md">
          <SearchIcon className="ml-3 h-5 w-5 text-gray-400 dark:text-gray-50 rounded-md " />
          <Input
            type="search"
            placeholder="Type a command or search..."
            className="w-full py-2 pr-3 pl-1 text-gray-900 placeholder-gray-400 bg-transparent border-l-0 dark:text-gray-100"
            focusOff={true}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="relative mx-2 w-1/4 justify-start text-sm text-gray-500 shadow-md"
            >
              Sort by...{' '}
              <span className="absolute right-2">
                <KeyboardArrowDownIcon className="h-6 w-6" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={(value: string) => {
                setPosition(value as Options)
              }}
            >
              <DropdownMenuRadioItem value="az">A-Z</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="recadd">
                Recently Added
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="chanum">
                Channel Number
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
