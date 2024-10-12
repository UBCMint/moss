"use client"

import { useCallback } from "react"
import { WindowTitlebar } from "tauri-controls"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from "@/components/ui/menubar"

import { AboutDialog } from "./about-dialog"
import { MintLogo } from "./Icons/Icons"
import { MenuModeToggle } from "./menu-mode-toggle"
import { Dialog, DialogTrigger } from "./ui/dialog"

export function Menu() {
  const closeWindow = useCallback(async () => {
    const { appWindow } = await import("@tauri-apps/plugin-window")
    appWindow.close()
  }, [])

  return (
    <WindowTitlebar
    // controlsOrder="left"
    // className="pl-0"
    // windowControlsProps={{ platform: "windows", justify: false }}
    >
      <Menubar className="rounded-none border-b border-none pl-2 lg:pl-3">
        <MenubarMenu>
          <div className="inline-flex h-fit w-fit items-center text-cyan-500">
            <MintLogo className="h-6 w-6" />
          </div>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-bold">MOSS</MenubarTrigger>
          <Dialog modal={false}>
            <MenubarContent>
              <DialogTrigger asChild>
                <MenubarItem>About App</MenubarItem>
              </DialogTrigger>

              <MenubarSeparator />
              <MenubarItem>
                Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarShortcut />
              <MenubarItem onClick={closeWindow}>
                Quit App <MenubarShortcut>⌘Q</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>

            <AboutDialog />
          </Dialog>
        </MenubarMenu>

        <MenuModeToggle />

      </Menubar>
    </WindowTitlebar>
  )
}
