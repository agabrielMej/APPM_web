import {
  useFetch,
} from "../hooks/useFetch";

function BackendStatus() {
  const {
    data,
    cargando,
    error,
  } = useFetch(
    "http://localhost:3001/health"
  );

  if (cargando) {
    return (
      <div className="backend-status">
        Verificando backend...
      </div>
    );
  }

  if (error) {
    return (
      <div className="backend-status error">
        Backend desconectado
      </div>
    );
  }

  return (
    <div className="backend-status ok">
      Backend conectado
    </div>
  );
}

export default BackendStatus;