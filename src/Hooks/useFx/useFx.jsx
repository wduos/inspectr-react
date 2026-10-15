import { useRef, useCallback } from "react";

export function useFx() {
  const ctxRef = useRef(null);

  // Lazy-initialize AudioContext on first user interaction
  const getAudioContext = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // --- Sound Generators ---

  const clickySound = useCallback(
    (time, freq) => {
      const ctx = getAudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = "triangle";
      o.frequency.setValueAtTime(freq, time);
      o.frequency.exponentialRampToValueAtTime(100, time + 0.02);

      g.gain.setValueAtTime(1, time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.02);

      o.connect(g).connect(ctx.destination);
      o.start(time);
      o.stop(time + 0.03);
    },
    [getAudioContext],
  );

  const pluckSound = useCallback(
    (time) => {
      const ctx = getAudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = "triangle";
      o.frequency.setValueAtTime(783.99, time);
      o.frequency.setValueAtTime(622.25, time + 0.11);
      o.frequency.setValueAtTime(523.25, time + 0.23);

      g.gain.setValueAtTime(0.4, time);
      g.gain.exponentialRampToValueAtTime(0.00001, time + 0.1);
      g.gain.setValueAtTime(0.4, time + 0.11);
      g.gain.exponentialRampToValueAtTime(0.00001, time + 0.22);
      g.gain.setValueAtTime(0.4, time + 0.23);
      g.gain.exponentialRampToValueAtTime(0.00001, time + 0.5);

      o.connect(g).connect(ctx.destination);
      o.start(time);
      o.stop(time + 0.5);
    },
    [getAudioContext],
  );

  const warnSound = useCallback(
    (time) => {
      const ctx = getAudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = "triangle";
      o.frequency.setValueAtTime(557, time);
      o.frequency.exponentialRampToValueAtTime(257, time + 0.025);
      o.frequency.exponentialRampToValueAtTime(357, time + 0.3);

      g.gain.setValueAtTime(0.5, time);
      g.gain.exponentialRampToValueAtTime(0.3, time + 0.025);
      g.gain.exponentialRampToValueAtTime(0.00001, time + 0.3);

      o.connect(g).connect(ctx.destination);
      o.start(time);
      o.stop(time + 0.3);
    },
    [getAudioContext],
  );

  const errorSound = useCallback(
    (time) => {
      const ctx = getAudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = "sawtooth";
      o.frequency.setValueAtTime(82.41, time);
      o.frequency.setValueAtTime(77.78, time + 0.21);

      g.gain.setValueAtTime(0.1, time);
      g.gain.setValueAtTime(0.00001, time + 0.1);
      g.gain.setValueAtTime(0.1, time + 0.2);

      o.connect(g).connect(ctx.destination);
      o.start(time);
      o.stop(time + 0.4);
    },
    [getAudioContext],
  );

  const blipSound = useCallback(
    (time) => {
      const ctx = getAudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = "square";
      o.frequency.setValueAtTime(10500, time);
      o.frequency.exponentialRampToValueAtTime(2700, time + 0.0025);

      g.gain.setValueAtTime(0.1, time);
      g.gain.exponentialRampToValueAtTime(0.00001, time + 1);

      o.connect(g).connect(ctx.destination);
      o.start(time);
      o.stop(time + 1);
    },
    [getAudioContext],
  );

  // --- Public Methods API ---

  const play = useCallback(
    (soundName) => {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      switch (soundName) {
        case "success": // Maps to your blip sound (on success)
          blipSound(now);
          break;
        case "warning": // Maps to warn sound
          warnSound(now);
          break;
        case "error": // Maps to error sound
          errorSound(now);
          break;
        case "inspection-init":
          clickySound(now, 1000);
          clickySound(now + 0.12, 1700);
          clickySound(now + 0.2, 2300);
          break;
        case "inspection-reset":
          clickySound(now, 2300);
          clickySound(now + 0.2, 1000);
          break;
        case "inspection-end":
          pluckSound(now);
          break;
        default:
          console.warn(`Sound effect "${soundName}" not found.`);
      }
    },
    [
      getAudioContext,
      blipSound,
      warnSound,
      errorSound,
      clickySound,
      pluckSound,
    ],
  );

  return { play };
}
