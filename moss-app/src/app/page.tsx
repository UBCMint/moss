"use client"

import React from "react"

import { ChevronRightIcon, MintLogo } from "@/components/Icons/Icons"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { useRouter } from "next/navigation"

export default function MainPage(): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => {
      document.removeEventListener("keydown", down)
    }
  }, [])

  function submitButton() {
    router.push("/home")
  }

  return (
    <div className="z-10 bg-off-white dark:bg-black bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
      <div className="flex h-[95vh] flex-col">
        <div className="relative flex-1">
          <MintLogo className="absolute left-6 top-6 h-20 w-20 text-white" />
          <div className="absolute bottom-6 left-6 max-w-[500px] rounded-md p-4">
            <h1 className="mb-2 text-4xl font-bold">MOSS</h1>
            <div className="text-xl font-semibold">
              <TextGenerateEffect
                words={"Visualizing Brainwaves made easy."}
                className="text-mint-black dark:text-off-white"
              />
            </div>
          </div>
          <div className="absolute bottom-6 right-6">
            <Button className="rounded-full p-10 text-xl font-semibold shadow-md hover:bg-slate-300 hover:text-black"
              onClick={() => submitButton()}
            >
              Continue
              <ChevronRightIcon className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem className="hover:bg-slate-700">
              <span>Delete Config</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
