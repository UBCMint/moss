'use client'

import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
let socket;


export default function Home (): React.JSX.Element {
  /**
   * @TODO Fix type of headsets state
  */
  const [headsets, setHeadsets] = useState([])


  const [randomInt, setRandomInt] = useState(0);
  useEffect(() => {
    const socketInitializer = async () => {

      // Initialize the socket connection
    await fetch('http://localhost:3000/server/api/socket');
    socket = io()

      socket.on("randomNumber", (data: number) => {
        setRandomInt(data);
      });
    };

    socketInitializer();

    // Clean up the socket connection on component unmount
  }, []);

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
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-4xl font-bold">
            MINT&apos;s Neurotech Open Source Project
          </h1>
          <p className="text-2xl p-2 ">
            Welcome to the MINT&apos;s Neurotech Open Source Project. The following are your headset options:
          </p>
          <div>
      <h1>Random Integer: {randomInt}</h1>
    </div>
          {headsets.map((headset: any) => (
              <div key={headset.id}>
                <p>{headset.name}</p>
              </div>
          ))}
        </div>
      </div>

    </main>
  )
}
