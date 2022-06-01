interface SessionStorage {
  setItem(key: string, value: string | object): void;
  getItem(key: string): string | object | null;
  removeItem(key: string): void;
}

export const useSessionStorage = (): SessionStorage => {
  const sessionStorage: Window["sessionStorage"] =
    typeof window === "undefined" ? null : window.sessionStorage;

  const setItem: SessionStorage["setItem"] = (key, value) => {
    return sessionStorage.setItem(key, JSON.stringify(value));
  };

  const getItem: SessionStorage["getItem"] = (key) => {
    const item = sessionStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  };

  const removeItem: SessionStorage["removeItem"] = (key) => {
    return sessionStorage.removeItem(key);
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};
