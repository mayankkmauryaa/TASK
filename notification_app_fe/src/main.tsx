import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { configureLogger } from "logging-middleware";
import App from "./App";

if (import.meta.env.VITE_LOGGER_TOKEN) {
  configureLogger(import.meta.env.VITE_LOGGER_TOKEN);
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
