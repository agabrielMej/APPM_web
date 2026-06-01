import { useMemo } from "react";

/**
 * @param {Array} items
 * @returns {{
 * completadas:number,
 * minutos:number,
 * categorias:number,
 * pendientes:number
 * }}
 */
export function useProgresoEntrenamiento(
  items
) {
  return useMemo(() => {
    const completadas =
      items.filter(
        (item) =>
          item.estado ===
          "completado"
      ).length;

    const minutos =
      items.reduce(
        (acc, item) =>
          acc +
          (item.atributos
            ?.duracion || 0),
        0
      );

    const categorias =
      new Set(
        items.map(
          (item) =>
            item.categoriaId
        )
      ).size;

    const pendientes =
      items.filter(
        (item) =>
          item.estado ===
          "pendiente"
      ).length;

    return {
      completadas,
      minutos,
      categorias,
      pendientes,
    };
  }, [items]);
}