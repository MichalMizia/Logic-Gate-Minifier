import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  storage: Storage = localStorage
): [T, (value: T) => void] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const item = storage.getItem(key);

    if (!item) {
      storage.setItem(key, JSON.stringify(defaultValue));
    }

    setValue(item ? JSON.parse(item) : defaultValue);

    function handler(e: StorageEvent) {
      if (e.key !== key) return;

      const lsi = storage.getItem(key);
      setValue(JSON.parse(lsi ?? ""));
    }

    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setValueWrap = (value: T) => {
    try {
      setValue(value);

      storage.setItem(key, JSON.stringify(value));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new StorageEvent("storage", { key }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return [value, setValueWrap];
}
