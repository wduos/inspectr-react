import { useRef, useEffect, useState, useCallback } from "react";

export function useSynth() {
  const audioCtxRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize or resume the AudioContext on user interaction
  const initContext = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playTone = useCallback((frequency = 440, duration = 1000) => {
    initContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // 1. Create nodes
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // 2. Configure oscillator and gain
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);

    // 3. Connect nodes: Oscillator -> Gain -> Destination
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // 4. Trigger playback
    oscillator.start();
    setIsPlaying(true);

    // 5. Automatically stop after the specified duration
    const timer = setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
      setIsPlaying(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return { playTone, isPlaying };
}
