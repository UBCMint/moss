"use client";

import React, { useState, useEffect, useRef } from "react";
import { TimeSeries, SmoothieChart } from "smoothie";
import { subscribeToEEGData } from "./server/api/utils/dataStream";
import {
  Card,
  ChannelNumber,
  CardDescription,
  CompanyName,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EEGData {
  nChannelsVector: number[];
  eegChannelSize: number;
}

export default function Home(): React.JSX.Element {
  const [headsets, setHeadsets] = useState([]); 
  const [eegData, setEegData] = useState<EEGData[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeSeries = useRef<TimeSeries>();



  useEffect(() => {
    async function fetchHeadsets() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/headsets`);  
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setHeadsets(data);
      } catch (error) {
        console.error("Error fetching headsets:", error);
      }
    }
    fetchHeadsets();
  }, []);



  useEffect(() => {
    timeSeries.current = new TimeSeries();
    const smoothie = new SmoothieChart({
      grid: {
        lineWidth: 2,
        millisPerLine: 1000,
        verticalSections: 6,
      },
      labels: {
        fontSize: 15,
        precision: 2,
      },
    });
    smoothie.addTimeSeries(timeSeries.current);
    smoothie.streamTo(canvasRef.current!, 1000); 
    return () => {
      smoothie.stop();
    };
  }, []);

  useEffect(() => {
    const cleanup = subscribeToEEGData((newData: EEGData) => {
      setEegData((prevData) => [...prevData, newData]);
      if (timeSeries.current) {
        newData.nChannelsVector.forEach((value, index) => {
          timeSeries.current?.append(new Date().getTime(), value);
        });
      }
    });

    return () => {
      cleanup();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-4xl font-bold">
            MINT&apos;s Neurotech Open Source Project
          </h1>
          <p className="text-2xl p-2">
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
                {/* Optional: Display data here if needed */}
              </div>
            ))}
            <canvas ref={canvasRef} width={1000} height={500} />
          </div>
        </div>
      </div>

    {/* the code below fails to show up, it should show a card compoent like below but with the headset data fix it */}

    <div>
  {headsets.map((headset: any) => (
    <Card key={headset.id}>
      <CardHeader>
        <CardTitle>{headset.name}</CardTitle>
        <CardDescription>Description: {headset.description}</CardDescription>
      </CardHeader>
      <ChannelNumber>Channel: {headset.channelNumber}</ChannelNumber>
      <CompanyName>Company: {headset.company}</CompanyName>
    </Card>
  ))}
</div>


    {/* the code above fails to show up, it should show a card compoent like below but with the headset data */}


      <Card>
            <CardHeader>
              <CardTitle>Headset Name</CardTitle>
              <CardDescription>Description: Lorem ipsum dolor sit amet,  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </CardDescription>
            </CardHeader>
            <ChannelNumber>
              <p>Channel Number</p>
            </ChannelNumber>
            <CompanyName>
              <p>Company</p>
            </CompanyName>
          </Card>
    </main>
  );
}
