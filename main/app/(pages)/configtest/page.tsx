'use client'

import React from 'react'
import Loading from '@/components/Loading'
import { toast } from '@/components/ui/use-toast'
import ConfigTest from '@/components/Onboarding/ConfigTest'
import { useQuery } from '@tanstack/react-query'

export default function MainPage (): JSX.Element {
  // Mutation that checks if local.config.json is present or not
  const checkConfig = useQuery({
    queryKey: [],
    queryFn: async () => {
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

  return (
    <div className='z-10'>
        <div className="flex flex-col h-screen justify-center items-center">
          {checkConfig.isPending && <Loading />}
          {checkConfig.isError && <p>Error!</p>}
          {checkConfig.isSuccess && (
            <div>
              <ConfigTest present={checkConfig.data.config} />
            </div>
          )}
        </div>
      <div className="absolute left-0 top-0 h-[100vh] w-full bg-off-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center -z-10" />
    </div>
  )
}
