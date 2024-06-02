import { useState } from "react";

const RunnerClip = () => {
  const [buttonState, setButtonState] = useState("Download");

  const handleClick = () => {
    if (buttonState === "Download") {
      setButtonState("Downloading");
    } else if (buttonState === "Downloading") {
      setButtonState("Use");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded shadow-md">
      <div className="text-xl font-semibold">Title</div>
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded ${
          buttonState === "Download"
            ? "bg-green-500 text-white"
            : buttonState === "Downloading"
            ? "bg-gradient-to-r from-green-500 to-white text-black"
            : "bg-green-500 text-white"
        }`}
        disabled={buttonState === "Use"}
      >
        {buttonState}
      </button>
    </div>
  );
};

export default RunnerClip;
