"use client";
import DataFormatChooser from "@/components/LoadData/DataFormatChooser/DataFormatChooserComponent";
import React from "react";

export default function Page(): React.JSX.Element{
  return (
    <div className="m-auto max-w-2xl">
      <h2>Loading Data from File</h2>
      <DataFormatChooser />
    </div>
  );
};
