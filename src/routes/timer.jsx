import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CircularTimer } from "../components/CircularTimer";

const Timer = () => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  const [inputTime, setInputTime] = useState("");

  useEffect(() => {
    if (!timerRunning) return;

    const intervalId = setInterval(() => {
      setTimerTime((current) => {
        if (current <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerRunning]);

  const handleStart = () => {
    const parsed = Number(inputTime);
    if (inputTime && parsed > 0) {
      setTimerTime(parsed);
    }
    if (timerTime > 0 || (inputTime && parsed > 0)) {
      setTimerRunning(true);
    }
  };

  const presets = [
    { seconds: 30, value: "30", unit: "sec" },
    { seconds: 60, value: "1", unit: "min" },
    { seconds: 300, value: "5", unit: "min" },
  ];

  return (
    <div className="clock-page">
      <h1>Timer</h1>

      <CircularTimer
        seconds={timerTime}
        label={timerRunning ? "remaining" : timerTime > 0 ? "paused" : "set time"}
      />

      <div className="clock-controls">
        <div className="clock-presets">
          <span className="clock-presets__label">Quick add</span>
          <div className="clock-presets__grid">
            {presets.map((preset) => (
              <button
                key={preset.seconds}
                type="button"
                className="clock-preset-btn"
                onClick={() => setTimerTime((t) => t + preset.seconds)}
              >
                <span className="clock-preset-btn__value">+{preset.value}</span>
                <span className="clock-preset-btn__unit">{preset.unit}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="clock-input-row">
          <input
            type="number"
            min="1"
            className="clock-input"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            placeholder="Seconds"
          />
          <button
            type="button"
            className="clock-btn"
            onClick={() => {
              const parsed = Number(inputTime);
              if (parsed > 0) setTimerTime(parsed);
            }}
          >
            Set
          </button>
        </div>

        <div className="clock-actions">
          <button
            type="button"
            className="clock-btn clock-btn--primary"
            onClick={handleStart}
            disabled={timerRunning}
          >
            Start
          </button>
          <button
            type="button"
            className="clock-btn"
            onClick={() => setTimerRunning(false)}
          >
            Pause
          </button>
          <button
            type="button"
            className="clock-btn"
            onClick={() => {
              setTimerRunning(false);
              setTimerTime(0);
              setInputTime("");
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/timer")({ component: Timer });
