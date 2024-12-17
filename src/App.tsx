import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@rarui-react/components";
import { Router } from "./router";

import "./reset.css";
import "./app.css";

interface IThemeProviderContext {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const ThemeProviderContext = createContext<IThemeProviderContext>(
  null as any
);

export const useTheme = () => useContext(ThemeProviderContext);

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "dark"
  );

  const contextValue = useMemo(
    () => ({
      darkMode,
      setDarkMode,
    }),
    [darkMode, setDarkMode]
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "dark" : "ligth");
  }, [darkMode]);

  return (
    <ThemeProviderContext.Provider value={contextValue}>
      <ThemeProvider theme={darkMode ? "dark" : "base"}>
        <Router />
      </ThemeProvider>
    </ThemeProviderContext.Provider>
  );
}

export default App;
