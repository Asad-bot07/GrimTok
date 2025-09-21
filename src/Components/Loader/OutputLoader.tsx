import React, { useState, useEffect } from 'react';

interface SequentialLoaderProps {
  onComplete?: () => void;
  duration?: number; // Total duration in seconds
  // enableSound?: boolean;
}

const OutputLoader: React.FC<SequentialLoaderProps> = ({
  onComplete,
  duration = 15,
  // enableSound = true
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingMessages = [
    "Consulting the Grim Reaper…",
    "Rolling dice with fate 🎲…",
    "Checking horoscope with Satan 🔥…",
    "Downloading your funeral playlist…",
    "Scanning sins (this may take forever)…"
  ];

  const messageTimings = [
    { start: 0, end: 20 },
    { start: 20, end: 40 },
    { start: 40, end: 60 },
    { start: 60, end: 80 },
    { start: 80, end: 100 }
  ];

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = duration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update message index based on progress
      const currentTimingIndex = messageTimings.findIndex(
        t => newProgress >= t.start && newProgress < t.end
      );
      if (currentTimingIndex !== -1) {
        setCurrentMessageIndex(currentTimingIndex);
      }

      // Complete condition
      if (newProgress >= 100) {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) setTimeout(onComplete, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
      <div className="text-center relative z-10 p-6 max-w-2xl mx-auto">
        {!isComplete ? (
          <>
            <div className="text-4xl mb-4">💀</div>
            <div className="text-xl font-bold text-gray-200 min-h-[2rem]">
              {loadingMessages[currentMessageIndex]}
            </div>
            <div className="mt-4 w-full h-2 bg-gray-700 rounded overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        ) : (
          <div className="text-green-400 text-2xl font-bold">Process Complete! ✅</div>
        )}
      </div>
    </div>
  );
};

export default OutputLoader;
