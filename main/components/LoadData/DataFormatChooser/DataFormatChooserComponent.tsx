"use client";

import { Input } from "@/components/ui/input";
import React, { useState, ChangeEvent } from "react";
import TableComp from "../FormatComponents/CSV/TableComp";

enum FileTypes {
  Csv = "csv",
  Edf = "edf",
}

export default function DataFormatChooser() {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileTypes | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      setErrorMessage("Please select a file.");
      return;
    }

    if (selectedFile.type.includes(FileTypes.Csv)) {
      setFileType(FileTypes.Csv);
      setFile(selectedFile);
      setErrorMessage("");
    } else if (selectedFile.type.includes(FileTypes.Edf)) {
      setFileType(FileTypes.Edf);
      setFile(selectedFile);
      setErrorMessage("");
    } else {
      setErrorMessage("Unsupported file format");
      return;
    }
  };

  const renderDataView = () => {
    switch (fileType) {
      case FileTypes.Csv:
        return <TableComp file={file as File} />;
      case FileTypes.Edf:
        // return <EDFComponent file={file as File} />;
        return <div>EDF file format support coming soon!</div>;
      default:
        return <div>Unsupported file format</div>;
    }
  };

  return (
    <div>
      <Input
        type="file"
        onChange={handleFileUpload}
        accept=".csv,.edf"
        style={{ marginBottom: "10px" }}
      />
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
      )}
      {file && renderDataView()}
    </div>
  );
}
