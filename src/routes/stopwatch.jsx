import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CircularTimer } from "../components/CircularTimer";

const Stopwatch = () => {
  const [timeRunning, setTimeRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(0);

  useEffect(() => {
    if (!timeRunning) return;

    const intervalId = setInterval(() => {
      setTimerTime((current) => current + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeRunning]);

  return (
    <div className="clock-page">
      <h1>Stopwatch</h1>

      <CircularTimer
        seconds={timerTime}
        label={timeRunning ? "running" : timerTime > 0 ? "paused" : "ready"}
      />

      <div className="clock-controls">
        <div className="clock-actions">
          <button
            type="button"
            className="clock-btn clock-btn--primary"
            onClick={() => setTimeRunning(true)}
            disabled={timeRunning}
          >
            Start
          </button>
          <button
            type="button"
            className="clock-btn"
            onClick={() => setTimeRunning(false)}
          >
            Pause
          </button>
          <button
            type="button"
            className="clock-btn"
            onClick={() => {
              setTimeRunning(false);
              setTimerTime(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/stopwatch")({ component: Stopwatch });
