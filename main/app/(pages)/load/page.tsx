"use client";
import { Input } from "@/components/ui/input";
import React, { useState, ChangeEvent } from "react";

const Page: React.FC = () => {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }
    if (!file.name.endsWith(".csv")) {
      setErrorMessage("Please upload a CSV file.");
      return;
    }
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n").map((row) => row.split(","));
      setCsvData(rows);
      setErrorMessage("");
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Loading Data from File</h1>
      <Input
        type="file"
        onChange={handleFileUpload}
        accept=".csv"
        style={{ marginBottom: "10px" }}
      />
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
      )}
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
      ) : (
        csvData.length > 0 && (
          <table className="w-full">
            <tbody>
              {csvData.map((row, index) => (
                <tr className="m-0 border-t p-0 even:bg-muted" key={index}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{ border: "1px solid #ccc", padding: "8px" }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default Page;
