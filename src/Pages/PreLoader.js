import React, { useState, useEffect } from "react";

function PreLoader() {
  const [loadingText, setLoadingText] = useState("TradeBridge");
  const [blurredText, setBlurredText] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (blurredText.length < loadingText.length) {
        setBlurredText((prev) => prev + loadingText[blurredText.length]);
      } else {
        clearInterval(intervalId);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [loadingText, blurredText]);

  return (
    <div className="flex justify-center items-center bg-indigo-500 h-screen">
      <h1 className="font-bold text-5xl">
        <span style={{ textShadow: `0 0 5px #000` }}>{blurredText}</span>
        {loadingText.slice(blurredText.length)}
      </h1>
    </div>
  );
}

export default PreLoader;
