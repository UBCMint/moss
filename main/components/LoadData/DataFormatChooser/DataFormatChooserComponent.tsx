"use client";

interface FileUploadProgress {
  progress: number;
  File: File;
}

enum FileTypes {
  Csv = "csv",
  Edf = "edf",
}

export default function DataFormatChooser() {
  return (
    <h1>
      This will select which datat type and route it to the correct component
    </h1>
  )
}
