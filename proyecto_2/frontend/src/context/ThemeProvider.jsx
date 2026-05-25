import {
  createContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext =
  createContext();

export function ThemeProvider({
  children,
}) {
  const [tema, setTema] =
    useState(() => {
      return (
        localStorage.getItem(
          "tema"
        ) || "oscuro"
      );
    });

  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      tema
    );

    localStorage.setItem(
      "tema",
      tema
    );
  }, [tema]);

  const toggleTema = () => {
    setTema((prev) =>
      prev === "oscuro"
        ? "claro"
        : "oscuro"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        tema,
        toggleTema,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}