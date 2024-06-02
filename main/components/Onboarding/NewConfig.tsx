/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

/**
 * @todo Create an onboarding form that sets up the user's configuration. See sample in ConfiguratinSetup.tsx
*/

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

export default function NewConfig (): JSX.Element {
  const FormSchema = z.object({
    name: z.string().min(2, {
      message: 'Name should be at least 2 characters'
    })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ''
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Welcome! What&apos;s your name?
              </FormLabel>
              <FormControl className='flex space-x-3 space-y-0 w-full p-6 rounded-lg mt-4 items-center justify-left h-12 font-semibold'>
                <Input placeholder="Enter your name" className='text-xl' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
