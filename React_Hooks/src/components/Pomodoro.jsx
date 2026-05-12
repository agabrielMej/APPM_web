import { useState, useEffect, useRef } from "react";
import { formatTime } from "../utils/formatTime";
import "../styles/styles.css";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 min
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
    clearInterval(intervalRef.current);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">POMODORO TIMER</div>

        <div className="timer">
          {formatTime(timeLeft)}
        </div>

        <div className="buttons">
          <button className="start" onClick={toggleTimer}>
            {isRunning ? "Pausar" : "Iniciar"}
          </button>

          <button className="reset" onClick={resetTimer}>
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;