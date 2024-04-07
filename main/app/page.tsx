"use client";

import React, { useState, useEffect } from "react";
import { subscribeToEEGData } from "./server/api/utils/dataStream";

interface EEGData {
  nChannelsVector: number[];
  eegChannelSize: number;
}

import Link from 'next/link';

export default function Home(): React.JSX.Element {
  /**
   * @TODO Fix type of headsets state
   */
  const [headsets, setHeadsets] = useState([]);
  const [eegData, setEegData] = useState<EEGData[]>([]);

  useEffect(() => {
    const getHeadsets = async (): Promise<void> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/headsets`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setHeadsets(data);
      } catch (error: any) {
        console.log(`error: ${error.message}`);
      }
    };
    getHeadsets().catch((error) => {
      console.log(`error: ${error.message}`);
    });

    const cleanup = subscribeToEEGData((newData: EEGData) => {
      setEegData((prevData) => [...prevData, newData]);
    });

    return () => cleanup(); // Clean up on component unmount
  }, []);

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
              <Link href={`/headset/${headset.name}`}>
                <button>
                  <p>{headset.name}</p>
                </button>
              </Link>
            </div>
            
          ))}
          <div>
            {eegData.length > 0 && (
              <p>EEG Channel Size: {eegData[0].eegChannelSize}</p>
            )}
            {eegData.map((data, index) => (
              <div key={index}>
                <p>N Channels Vector: {data.nChannelsVector.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
