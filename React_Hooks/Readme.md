# Pomodoro Timer - React Hooks

Este proyecto consiste en la implementación de un temporizador Pomodoro utilizando React, con el objetivo de practicar y comprender el uso de los hooks principales: useState, useEffect y useRef.

---

## Explicación en video

Puedes ver la explicación del proyecto en el siguiente enlace:

https://www.youtube.com/watch?v=Czoi83QbLYk

---

## Tecnologías utilizadas

- React
- JavaScript (ES6+)
- CSS

---

## Hooks utilizados

### useState
Se utiliza para manejar el estado del componente:
- Tiempo restante (`timeLeft`)
- Estado del temporizador (`isRunning`)
- Modo actual (`work` o `break`)
- Historial de sesiones (`sessions`)
- Configuración de minutos (trabajo y descanso)

---

### useEffect
Se utiliza para manejar efectos secundarios:
- Ejecutar el temporizador con `setInterval`
- Detectar cuando el tiempo llega a cero
- Cambiar automáticamente entre modo trabajo y descanso
- Sincronizar los valores cuando el usuario cambia la configuración

---

### useRef
Se utiliza para almacenar el identificador del `setInterval`.

Esto permite:
- Mantener el valor entre renders
- Limpiar correctamente el intervalo con `clearInterval`
- Evitar renders innecesarios

---

## Funcionalidades por nivel

### Nivel 1
- Temporizador en cuenta regresiva
- Botones de iniciar/pausar y reiniciar
- Formato de tiempo en MM:SS

---

### Nivel 2
- Alternancia automática entre trabajo y descanso
- Uso de un segundo `useEffect`
- Historial de sesiones completadas

---

### Nivel 3
- Configuración de minutos de trabajo y descanso
- Inputs dinámicos (bloqueados durante ejecución)
- Guardado de sesiones parciales
- Manejo de estados derivados

---

## Instalación y ejecución

Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git