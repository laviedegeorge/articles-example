import { useState, useEffect } from "react";
import { useDebugSetter } from "../hooks/useDebugSetter";

// Custom hook that manages a timer
function useTimer(initialSeconds: number = 0) {
  const [seconds, setSecondsOriginal] = useState(initialSeconds);
  const [isRunning, setIsRunningOriginal] = useState(false);

  // Wrap setters with debug functionality
  const setSeconds = useDebugSetter("Timer.seconds", setSecondsOriginal);
  const setIsRunning = useDebugSetter("Timer.isRunning", setIsRunningOriginal);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, setSeconds]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
  };
}

export function CustomHookExample() {
  const timer = useTimer(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>Custom Hook Example</h2>
      <p>Open the console to see debug logs for internal hook state changes.</p>

      <div style={{ marginTop: "15px" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {formatTime(timer.seconds)}
        </p>
        <p>
          Status: <strong>{timer.isRunning ? "Running" : "Stopped"}</strong>
        </p>

        <div style={{ marginTop: "15px" }}>
          <button
            onClick={timer.start}
            disabled={timer.isRunning}
            style={{ marginRight: "10px" }}
          >
            Start
          </button>
          <button
            onClick={timer.stop}
            disabled={!timer.isRunning}
            style={{ marginRight: "10px" }}
          >
            Stop
          </button>
          <button onClick={timer.reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}
