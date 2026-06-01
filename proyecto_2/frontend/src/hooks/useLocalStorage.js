import {
  useEffect,
  useState,
} from "react";

/**
 * @param {string} clave
 * @param {*} valorInicial
 * @returns {[any, Function]}
 */
export function useLocalStorage(
  clave,
  valorInicial
) {
  const [valor, setValor] =
    useState(() => {
      try {
        const guardado =
          localStorage.getItem(
            clave
          );

        return guardado !==
          null
          ? JSON.parse(
              guardado
            )
          : valorInicial;
      } catch {
        return valorInicial;
      }
    });

  useEffect(() => {
    try {
      localStorage.setItem(
        clave,
        JSON.stringify(valor)
      );
    } catch (e) {
      console.warn(
        "No se pudo guardar",
        e
      );
    }
  }, [clave, valor]);

  return [
    valor,
    setValor,
  ];
}