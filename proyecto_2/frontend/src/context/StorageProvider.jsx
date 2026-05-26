import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

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

  const [items, setItems] =
    useState([]);

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

          setItems(data);

          return data;
        } else {
          const data =
            localStorage.getItem(
              "items"
            );

          const parsed = data
            ? JSON.parse(data)
            : [];

          setItems(parsed);

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
        const nuevosItems = [
          ...items,
          item,
        ];

        setItems(nuevosItems);

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
        const nuevosItems =
          items.filter(
            (item) =>
              item.id !== id
          );

        setItems(nuevosItems);

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
        const nuevosItems =
          items.map((item) => {
            if (
              item.id === id
            ) {
              return {
                ...item,
                ...nuevosDatos,
              };
            }

            return item;
          });

        setItems(nuevosItems);

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

        items,

        cargando,
        error,

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