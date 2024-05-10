'use client'

import React, { useState, useEffect, useRef } from 'react'
import { TimeSeries, SmoothieChart } from 'smoothie'
import { subscribeToEEGData } from './server/api/utils/dataStream'

interface EEGData {
  nChannelsVector: number[]
  eegChannelSize: number
}

export default function Home (): React.JSX.Element {
  const [headsets, setHeadsets] = useState([])
  const [eegData, setEegData] = useState<EEGData[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeSeries = useRef<TimeSeries>()

  useEffect(() => {
    const getHeadsets = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/headsets`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const data = await response.json()
        setHeadsets(data)
      } catch (error: any) {
        console.log(`error: ${error.message}`)
      }
    }
    getHeadsets().catch((error) => {
      console.log(`error: ${error.message}`)
    })

    timeSeries.current = new TimeSeries()

    const smoothie = new SmoothieChart({
      grid: {
        lineWidth: 2, // Increase the width of grid lines
        millisPerLine: 1000, // Milliseconds per grid line
        verticalSections: 6 // Increase the number of vertical sections
      },
      labels: {
        fontSize: 15, // Font size of labels
        precision: 2 // Precision of values displayed on the y-axis
      }
    })
    smoothie.addTimeSeries(timeSeries.current)
    smoothie.streamTo(canvasRef.current!, 1000) // 1000ms interval for streaming
    return () => {
      smoothie.stop()
    }
  }, [])

  useEffect(() => {
    const cleanup = subscribeToEEGData((newData: EEGData) => {
      setEegData((prevData) => [...prevData, newData])
      if (timeSeries.current) {
        newData.nChannelsVector.forEach((value, index) => {
          timeSeries.current?.append(new Date().getTime(), value)
        })
      }
    })

    return () => {
      cleanup()
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-4xl font-bold">
            MINT&apos;s Neurotech Open Source Project
          </h1>
          <p className="text-2xl p-2 ">
            Welcome to the MINT&apos;s Neurotech Open Source Project. The
            following are your headset options:
          </p>
          {headsets.map((headset: any) => (
            <div key={headset.id}>
              <p>{headset.name}</p>
            </div>
          ))}
          <div>
            {eegData.length > 0 && (
              <p>EEG Channel Size: {eegData[0].eegChannelSize}</p>
            )}
            {eegData.map((data, index) => (
              <div key={index}>
                {/* <p>N Channels Vector: {data.nChannelsVector.join(', ')}</p> */}
              </div>
            ))}
            <canvas ref={canvasRef} width={1000} height={500} />
          </div>
        </div>
      </div>
    </main>
  )
}
