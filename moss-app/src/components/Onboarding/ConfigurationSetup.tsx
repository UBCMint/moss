/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ChevronRightIcon } from '../Icons/Icons'
import { toast as sonnerToast } from 'sonner'

const FormSchema = z.object({
  type: z.enum(['newConfig', 'copyConfig'], {
    required_error: 'Please select an option'
  })
})

export default function ConfigurationSetup (): JSX.Element {
  const [showCreateAlert, setShowCreateAlert] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: 'newConfig'
    }
  })

  function onSubmit (data: z.infer<typeof FormSchema>): void {
    if (process.env.NODE_ENV === 'development') {
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      })
    }
    if (data.type === 'newConfig') {
      setShowCreateAlert(true)
    }
  }

  const createConfig = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/utils/checkConfig`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: 'MINT' })
          }
        )
        if (!res.ok) {
          sonnerToast.error('Configuration creation failed')
          throw new Error('Network response was not ok')
        } else {
          sonnerToast.success('Configuration created successfully')
        }
        const data = await res.json()
        if (data != null) {
          return data
        } else {
          throw new Error('Fetching error, config not boolean')
        }
      } catch (error) {
        throw new Error(
          'Error in fetching config: ' + (error as Error).message
        )
      }
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 px-10">
        <FormLabel className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          No configuration found! <span className="underline">Create</span> or{' '}
          <span className="underline">copy</span> one.
        </FormLabel>
        <div className="w-full space-y-6 flex justify-center items-center">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem
                      className={`${
                        field.value === 'newConfig'
                          ? 'border-mint-black border-2 bg-gray-100 text-gray-600'
                          : 'bg-mint-green '
                      } flex space-x-3 space-y-0 w-full p-12 rounded-lg mt-4 items-center justify-left h-12 font-semibold`}
                    >
                      <FormControl>
                        <RadioGroupItem value="newConfig" className="" />
                      </FormControl>
                      <FormLabel className="text-lg font-semibold">
                        Create a new configuration
                      </FormLabel>
                    </FormItem>
                    <FormItem
                      className={`${
                        field.value === 'copyConfig'
                          ? 'border-mint-black border-2 bg-gray-100 '
                          : 'bg-mint-green'
                      } flex space-x-3 space-y-0 w-full p-12 rounded-lg mt-4 items-center justify-left h-12 font-semibold`}
                    >
                      <FormControl>
                        <RadioGroupItem value="copyConfig" className="" />
                      </FormControl>
                      <FormLabel className="text-lg font-semibold">
                        Copy a configuration
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full max-w-[300px] p-8 rounded-full mt-4 items-center justify-center h-12 text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-mint-green-500 focus:ring-offset-2 focus:ring-offset-mint-green-200 hover:shadow-md"
        >
          Continue
          <ChevronRightIcon className="w-6 h-6 ml-2" />
        </Button>
      </form>
      <AlertDialog open={showCreateAlert} onOpenChange={setShowCreateAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a new configuration?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to create a new configuration? Any past
              configurations will be lost if present.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                sonnerToast.warning('Configuration creation cancelled')
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                createConfig.mutate()
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  )
}
