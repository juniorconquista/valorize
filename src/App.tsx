import { ThemeProvider } from "@rarui-react/components";
import { Router } from "./router";
import "./reset.css";
import "./app.css";

function App() {
  return (
    <ThemeProvider theme="base">
      <Router />
    </ThemeProvider>
  );
}

export default App;
