import { useState, useEffect, useRef } from "react";
import { formatTime } from "../utils/formatTime";
import "../styles/styles.css";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [sessions, setSessions] = useState([]);

  const [workMins, setWorkMins] = useState("25");
  const [breakMins, setBreakMins] = useState("5");

  const intervalRef = useRef(null);

  // conversión segura a segundos
  const WORK_TIME = Math.round((parseFloat(workMins) || 0) * 60);
  const BREAK_TIME = Math.round((parseFloat(breakMins) || 0) * 60);

  // TIMER
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

  // CAMBIO AUTOMÁTICO
  useEffect(() => {
    if (timeLeft === 0 && WORK_TIME > 0 && BREAK_TIME > 0) {
      if (mode === "work") {
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
  }, [timeLeft, mode, WORK_TIME, BREAK_TIME]);

  // SINCRONIZAR INPUTS
  useEffect(() => {
    if (!isRunning && WORK_TIME > 0 && BREAK_TIME > 0) {
      setTimeLeft(mode === "work" ? WORK_TIME : BREAK_TIME);
    }
  }, [workMins, breakMins, mode, isRunning, WORK_TIME, BREAK_TIME]);

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(WORK_TIME || 1500);
    setSessions([]);
    clearInterval(intervalRef.current);
  };

  // GUARDAR 
  const savePartialSession = () => {
    const totalTime = mode === "work" ? WORK_TIME : BREAK_TIME;
    const elapsed = totalTime - timeLeft;

    if (elapsed > 0) {
      setSessions(prev => [
        ...prev,
        {
          id: Date.now(),
          type: `${mode} (parcial)`,
          duration: elapsed,
          completedAt: new Date()
        }
      ]);
    }
  };

  return (
    <div className="container">
      <div className="card">

        <div style={{ marginBottom: "15px" }}>
          <div>
            Trabajo (min):
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="60"
              value={workMins}
              disabled={isRunning}
              onChange={(e) => setWorkMins(e.target.value)}
            />
          </div>

          <div>
            Descanso (min):
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="60"
              value={breakMins}
              disabled={isRunning}
              onChange={(e) => setBreakMins(e.target.value)}
            />
          </div>
        </div>

        <div className="title">
          {mode === "work" ? "TRABAJO" : "DESCANSO"}
        </div>

        <div className="timer">
          {formatTime(timeLeft)}
        </div>

        {/* BOTONES */}
        <div className="buttons">
          <button className="start" onClick={toggleTimer}>
            {isRunning ? "Pausar" : "Iniciar"}
          </button>

          <button className="reset" onClick={resetTimer}>
            Reiniciar
          </button>

          <button onClick={savePartialSession}>
            Guardar sesión
          </button>
        </div>

        {/* HISTORIAL */}
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