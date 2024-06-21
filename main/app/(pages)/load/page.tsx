'use client'

import React from 'react'
import Loading from '@/components/Loading'
import { toast } from '@/components/ui/use-toast'
import { useQuery } from '@tanstack/react-query'

export default function MainPage (): JSX.Element {
  const checkConfig = useQuery({
    queryKey: [],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/dataFormatParsers`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(async (res) => await res.json())
        console.log(res)
        return res
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
    <div className="z-10">
      <div className="flex flex-col h-screen justify-center items-center">
        {Boolean(checkConfig.isPending) && <Loading />}
        {Boolean(checkConfig.isError) && <p>Error!</p>}
        {Boolean(checkConfig.isSuccess) && (
          <div>
            {checkConfig.data.fileTypes.map((type: string) => (
              <div key={type}>{type}</div>
            ))}
            {checkConfig.data.customTypes.map((type: string) => (
              <div key={type}>{type}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
