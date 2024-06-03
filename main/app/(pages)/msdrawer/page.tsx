'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { CheckIcon } from '@/components/Icons/Icons'
import { Checkbox } from '@/components/ui/checkbox'

export default function DrawerDemo (): React.JSX.Element {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const handleOptionSelect = (option: string): void => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option))
      setErrorMessage(null)
    } else {
      if (selectedOptions.length < 4) {
        setSelectedOptions([...selectedOptions, option])
        setErrorMessage(null)
      } else {
        setErrorMessage('You can only select up to 4 options.')
      }
    }
  }
  const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
    'Option 10'
  ]
  return (
    <div>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
          <div className="mx-auto w-full p-5">
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
              <DrawerDescription>Description</DrawerDescription>
              {(errorMessage != null) && <div className="bg-red-100 text-red-800 rounded-md p-4 mt-4">{errorMessage}</div>}
            </DrawerHeader>
            <ScrollArea className={`${(errorMessage != null) ? 'h-[70dvh]' : 'h-[80dvh]'} mb-10`}>
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 rounded-md p-4 transition-colors ${
                    selectedOptions.includes(option)
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => { handleOptionSelect(option) }}
                >
                  <Checkbox
                    checked={selectedOptions.includes(option)}
                    onCheckedChange={() => { handleOptionSelect(option) }}
                    className="peer sr-only"
                  />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">
                    <div className="font-semibold">{option}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Label>
                  {selectedOptions.includes(option) && <CheckIcon className="w-5 h-5 text-primary" />}
                </div>
              ))}
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
