"use client";

import React, { useEffect, useState } from "react";

interface TableCompProps {
  file: File;
}

export default function TableComp({ file }: TableCompProps) {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n").map((row) => row.split(","));
      setCsvData(rows);
      setIsLoading(false);
      setErrorMessage("");
    };
    reader.onerror = () => {
      setErrorMessage("Error reading file");
      setIsLoading(false);
    };
    reader.readAsText(file);
  }, [file]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
    );
  }

  if (errorMessage) {
    return (
      <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
    );
  }

  return (
    <div>
      {csvData.length > 0 && (
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
      )}
    </div>
  );
}
