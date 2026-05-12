import { useState, useEffect, useRef } from "react";
import { formatTime } from "../utils/formatTime";
import "../styles/styles.css";

const WORK_TIME = 25; // 25 min
const BREAK_TIME = 3; // 5 min

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [sessions, setSessions] = useState([]);

  const intervalRef = useRef(null);

  // ⏱️ Timer
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

  // 🔄 Cambio de modo automático
  useEffect(() => {
    if (timeLeft === 0) {
      if (mode === "work") {
        // guardar sesión de trabajo
        setSessions(prev => [
          ...prev,
          {
            id: Date.now(),
            type: "work",
            duration: WORK_TIME,
            completedAt: new Date()
          }
        ]);
      }

      const newMode = mode === "work" ? "break" : "work";
      setMode(newMode);

      setTimeLeft(newMode === "work" ? WORK_TIME : BREAK_TIME);
      setIsRunning(true);
    }
  }, [timeLeft, mode]);

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(WORK_TIME);
    setSessions([]);
    clearInterval(intervalRef.current);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">
          {mode === "work" ? "TRABAJO" : "DESCANSO"}
        </div>

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

        <div style={{ marginTop: "20px" }}>
          <h3>Sesiones:</h3>
          <ul>
            {sessions.map((s, i) => (
              <li key={s.id}>
                Sesión {i + 1} - {formatTime(s.duration)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;