'use client'

import { ChevronRightIcon, FolderIcon } from '../Icons/Icons'
import { Button } from '../ui/button'

export default function FileComponent (): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-center">
            Choose Project Location
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Select the directory where you&apos;d like to save your project
            files.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                /Users/username/Documents
              </span>
              <Button variant="ghost" size="icon">
                <ChevronRightIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <FolderIcon className="w-6 h-6 text-yellow-500" />
                <span>Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <FolderIcon className="w-6 h-6 text-yellow-500" />
                <span>Pictures</span>
              </div>
              <div className="flex items-center gap-2">
                <FolderIcon className="w-6 h-6 text-yellow-500" />
                <span>Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <FolderIcon className="w-6 h-6 text-yellow-500" />
                <span>Desktop</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
