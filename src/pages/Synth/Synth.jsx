import "./Synth.css";
import { useSynth } from "../../Hooks/useSynth/useSynth";
import Header from "../../components/Header/Header";

export default function Synth() {
  const { playTone, isPlaying } = useSynth();
  const notes = [
    { name: "C4", freq: 261.63 },
    { name: "C#4", freq: 277.18 },
    { name: "D4", freq: 293.66 },
    { name: "D#4", freq: 311.13 },
    { name: "E4", freq: 329.63 },
    { name: "F4", freq: 349.23 },
    { name: "F#4", freq: 369.99 },
    { name: "G4", freq: 392.0 },
    { name: "G#4", freq: 415.3 },
    { name: "A4", freq: 440.0 },
    { name: "A#4", freq: 466.16 },
    { name: "B4", freq: 493.88 },
    { name: "C5", freq: 523.25 },
    { name: "C#5", freq: 554.37 },
    { name: "D5", freq: 587.33 },
    { name: "D#5", freq: 622.25 },
    { name: "E5", freq: 659.25 },
    { name: "F5", freq: 698.46 },
    { name: "F#5", freq: 739.99 },
    { name: "G5", freq: 783.99 },
  ];

  return (
    <>
      <Header backToUrl="/" titleTop="Synth" titleBottom="Test Engine" />

      <div className="Synth">
        <p>Status: **{isPlaying ? "Playing Note" : "Ready"}**</p>

        <div className="flex-5 flex-wrap">
          {notes.map((note) => (
            <button
              key={note.name}
              className="key"
              onClick={() => playTone(note.freq, 800)}
            >
              {note.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
