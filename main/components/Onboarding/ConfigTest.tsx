'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading'

interface ConfigTestProps {
  present: boolean
}

export default function ConfigTest ({ present }: ConfigTestProps): JSX.Element {
  const [configData, setConfigData] = React.useState<any>()

  const getConfig = useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      try {
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
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        <span className="text-2xl">Config:</span>
        {` ${present.toString()}`}
      </h1>
      {present
        ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-lg font-semibold">Config is present</p>
          {getConfig.isSuccess && (<pre className="p-4 text-sm bg-gray-100 rounded-md">
            {JSON.stringify(configData, null, 2)}
          </pre>)}
          {getConfig.isPending && <Loading />}
          </div>
          )
        : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-lg font-semibold">Config is not present</p>
              </div>
          )}
    </>
  )
}
