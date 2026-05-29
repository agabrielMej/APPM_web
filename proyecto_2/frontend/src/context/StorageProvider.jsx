import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

import {
  itemsReducer,
  estadoInicial,
} from "../reducers/itemsReducer";

export const StorageContext =
  createContext();

export function StorageProvider({
  children,
}) {
  const [modo, setModoState] =
    useState(() => {
      return (
        localStorage.getItem(
          "modo"
        ) || "local"
      );
    });

  const [estado, dispatch] =
    useReducer(
      itemsReducer,
      estadoInicial
    );

  const [cargando, setCargando] =
    useState(false);

  const [error, setError] =
    useState(null);

  const API_URL =
    "http://localhost:3001";

  const setModo = (nuevoModo) => {
    setModoState(nuevoModo);

    localStorage.setItem(
      "modo",
      nuevoModo
    );
  };

  const obtenerItems =
    useCallback(async () => {
      setCargando(true);

      setError(null);

      try {
        if (modo === "api") {
          const res = await fetch(
            `${API_URL}/api/items`
          );

          const data =
            await res.json();

          dispatch({
            type: "HIDRATAR",

            payload: data,
          });

          return data;
        } else {
          const data =
            localStorage.getItem(
              "items"
            );

          const parsed = data
            ? JSON.parse(data)
            : [];

          dispatch({
            type: "HIDRATAR",

            payload: parsed,
          });

          return parsed;
        }
      } catch (err) {
        setError(err.message);

        return [];
      } finally {
        setCargando(false);
      }
    }, [modo]);

  const guardarItem = async (
    item
  ) => {
    try {
      if (modo === "api") {
        await fetch(
          `${API_URL}/api/items`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              item
            ),
          }
        );

        await obtenerItems();
      } else {
        dispatch({
          type: "AGREGAR",

          payload: item,
        });

        const nuevosItems = [
          ...estado.lista,
          item,
        ];

        localStorage.setItem(
          "items",
          JSON.stringify(
            nuevosItems
          )
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarItem = async (
    id
  ) => {
    try {
      if (modo === "api") {
        await fetch(
          `${API_URL}/api/items/${id}`,
          {
            method: "DELETE",
          }
        );

        await obtenerItems();
      } else {
        dispatch({
          type: "ELIMINAR",

          payload: id,
        });

        const nuevosItems =
          estado.lista.map(
            (item) =>
              item.id === id
                ? {
                    ...item,

                    activo: false,
                  }
                : item
          );

        localStorage.setItem(
          "items",
          JSON.stringify(
            nuevosItems
          )
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const editarItem = async (
    id,
    nuevosDatos
  ) => {
    try {
      if (modo === "api") {
        await fetch(
          `${API_URL}/api/items/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              nuevosDatos
            ),
          }
        );

        await obtenerItems();
      } else {
        dispatch({
          type:
            "CAMBIAR_ESTADO",

          payload: {
            id,

            estado:
              nuevosDatos.estado,
          },
        });

        const nuevosItems =
          estado.lista.map(
            (item) =>
              item.id === id
                ? {
                    ...item,

                    ...nuevosDatos,
                  }
                : item
          );

        localStorage.setItem(
          "items",
          JSON.stringify(
            nuevosItems
          )
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    obtenerItems();
  }, [modo]);

  return (
    <StorageContext.Provider
      value={{
        modo,
        setModo,

        estado,

        items:
          estado.lista.filter(
            (item) =>
              item.activo
          ),

        cargando,
        error,

        dispatch,

        obtenerItems,
        guardarItem,
        eliminarItem,
        editarItem,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}