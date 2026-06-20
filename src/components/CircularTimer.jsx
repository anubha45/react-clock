const SIZE = 260;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2 - 6;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function CircularTimer({ seconds, label }) {
  const minuteProgress = (seconds % 60) / 60;
  const offset = CIRCUMFERENCE * (1 - minuteProgress);
  const minute = Math.floor(seconds / 60);

  return (
    <div className="circular-timer">
      <svg
        className="circular-timer__ring"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        <circle
          className="circular-timer__track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
        />
        <circle
          className="circular-timer__progress"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <div className="circular-timer__display">
        <span className="circular-timer__time">{formatTime(seconds)}</span>
        <span className="circular-timer__label">{label}</span>
        {minute > 0 && (
          <span className="circular-timer__minute">+{minute} min</span>
        )}
      </div>
    </div>
  );
}
