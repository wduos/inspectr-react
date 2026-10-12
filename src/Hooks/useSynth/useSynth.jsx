import { useRef, useEffect, useState, useCallback } from "react";

export function useSynth() {
  const audioCtxRef = useRef(null);
  const reverbNodeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to generate a simple synthetic impulse response for reverb
  const createReverbBuffer = (ctx, duration = 1.5, decay = 2.0) => {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const impulse = ctx.createBuffer(2, length, sampleRate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const n = i;
      // Exponentially decaying white noise
      const decayFactor = Math.pow(1 - n / length, decay);
      left[i] = (Math.random() * 2 - 1) * decayFactor;
      right[i] = (Math.random() * 2 - 1) * decayFactor;
    }

    return impulse;
  };

  // Initialize AudioContext & Reverb Node on user interaction
  const initContext = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Setup ConvolverNode for Reverb
      const convolver = ctx.createConvolver();
      convolver.buffer = createReverbBuffer(ctx, 1.2, 2.5);
      convolver.connect(ctx.destination);
      reverbNodeRef.current = convolver;
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playTone = useCallback((frequency = 440, duration = 1.0) => {
    initContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Create nodes
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const dryGain = ctx.createGain();
    const wetGain = ctx.createGain();

    // 2. Configure Oscillator (Triangle wave for soft pluck)
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, now);

    // 3. Configure Pluck Envelope (Fast Attack + Exponential Decay)
    const maxGain = 0.3;
    const attackTime = 0.005; // 5ms attack
    const decayTime = Math.min(duration, 0.8); // Decay length

    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(maxGain, now + attackTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      now + attackTime + decayTime,
    );

    // 4. Mix Dry (Direct) & Wet (Reverb) Signals
    dryGain.gain.setValueAtTime(0.7, now); // 70% direct signal
    wetGain.gain.setValueAtTime(0.3, now); // 30% reverb mix

    // 5. Signal Routing:
    // Oscillator -> Gain Node
    // Gain Node -> Dry Gain -> Main Output (Destination)
    // Gain Node -> Wet Gain -> Reverb Node -> Main Output
    oscillator.connect(gainNode);

    gainNode.connect(dryGain);
    dryGain.connect(ctx.destination);

    if (reverbNodeRef.current) {
      gainNode.connect(wetGain);
      wetGain.connect(reverbNodeRef.current);
    }

    // 6. Trigger playback
    oscillator.start(now);
    oscillator.stop(now + attackTime + decayTime + 0.1);
    setIsPlaying(true);

    const timer = setTimeout(
      () => {
        oscillator.disconnect();
        gainNode.disconnect();
        dryGain.disconnect();
        wetGain.disconnect();
        setIsPlaying(false);
      },
      (attackTime + decayTime + 0.5) * 1000,
    );

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
