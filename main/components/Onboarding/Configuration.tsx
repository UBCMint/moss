'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading'
import { Button } from '../ui/button'
import { ChevronRightIcon } from '../Icons/Icons'
import Link from 'next/link'
import ConfigurationSetup from './ConfigurationSetup'

interface ConfigTestProps {
  present: boolean
}

export default function Configuration ({
  present
}: ConfigTestProps): JSX.Element {
  const [configData, setConfigData] = React.useState<any>()

  const getConfig = useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      try {
        console.log(present)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/utils/getConfig`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(async (res) => await res.json())
        if (res != null) {
          setConfigData(res)
          return res
        } else {
          throw new Error('Fetching error, config not boolean')
        }
      } catch (error) {
        throw new Error('Error in fetching config')
      }
    },
    enabled: present
  })

  return (
    <div className="w-full md:mx-6 mx-4">
      {present
        ? (
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          {getConfig.isSuccess && (
            <div className="w-full">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                <span className="text-xl lg:text-2xl">Welcome back</span>{' '}
                <span className="text-mint-green">{configData.name}</span>
              </h1>
              <Link href="/dashboard">
                <Button className="w-full max-w-[300px] p-8 rounded-full mt-4 items-center justify-center h-12 text-lg font-semibold text-white bg-mint-green hover:bg-mint-green-600 focus:outline-none focus:ring-2 focus:ring-mint-green-500 focus:ring-offset-2 focus:ring-offset-mint-green-200 hover:shadow-md hover:scale-105 transition duration-300 ease-in-out">
                  Go to Dashboard
                  <ChevronRightIcon className="w-6 h-6 ml-2" />
                </Button>
              </Link>
            </div>
          )}
          {getConfig.isPending && <Loading />}
        </div>
          )
        : (
        <div className="flex flex-col items-center justify-center w-full">
          <ConfigurationSetup />
        </div>
          )}
    </div>
  )
}
