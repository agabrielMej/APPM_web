import { useEffect } from "react";

/**
 * @param {string} tecla
 * @param {Function} onPress
 * @param {{alt?: boolean}} opciones
 * @returns {void}
 */
export function useAtajoTeclado(
  tecla,
  onPress,
  { alt = false } = {}
) {
  useEffect(() => {
    const handler = (e) => {
      const enInput =
        ["INPUT", "TEXTAREA"].includes(
          e.target.tagName
        );

      if (enInput) return;

      if (
        alt &&
        !e.altKey
      )
        return;

      if (
        e.key.toLowerCase() !==
        tecla.toLowerCase()
      )
        return;

      e.preventDefault();

      onPress(e);
    };

    window.addEventListener(
      "keydown",
      handler
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handler
      );
    };
  }, [tecla, onPress, alt]);
}