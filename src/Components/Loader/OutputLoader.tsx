import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SequentialLoaderProps {
  onComplete?: () => void;
  duration?: number; // Total duration in seconds
  enableSound?: boolean;
}

const OutputLoader: React.FC<SequentialLoaderProps> = ({
  onComplete,
  duration = 15,
  enableSound = true
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(enableSound);
  const [isComplete, setIsComplete] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

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

  // Sound creation
  const createAtmosphericSound = useCallback(() => {
    if (!soundEnabled) return;
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    audioContextRef.current = new AudioContext();
    oscillatorRef.current = audioContextRef.current.createOscillator();
    gainNodeRef.current = audioContextRef.current.createGain();

    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContextRef.current.destination);

    oscillatorRef.current.frequency.setValueAtTime(30, audioContextRef.current.currentTime);
    oscillatorRef.current.type = 'sawtooth';

    gainNodeRef.current.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);

    oscillatorRef.current.start();
  }, [soundEnabled]);

  const stopSound = useCallback(() => {
    if (audioContextRef.current) audioContextRef.current.close();
    audioContextRef.current = null;
    oscillatorRef.current = null;
    gainNodeRef.current = null;
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newState = !prev;
      if (newState) createAtmosphericSound();
      else stopSound();
      return newState;
    });
  }, [createAtmosphericSound, stopSound]);

  // Main progress and message logic
  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = duration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      const currentTiming = messageTimings.findIndex(t => newProgress >= t.start && newProgress < t.end);
      if (currentTiming !== -1) setCurrentMessageIndex(currentTiming);

      if (newProgress >= 100) {
        clearInterval(interval);
        setIsComplete(true);
        stopSound();
        if (onComplete) setTimeout(onComplete, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete, stopSound]);

  // Cleanup on unmount
  useEffect(() => () => stopSound(), [stopSound]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
      {/* <button
        onClick={toggleSound}
        className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded z-10"
      >
        {soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
      </button> */}

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
