import React from "react";
import ReactDOM from "react-dom/client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App";

const theme = createTheme({
  colorSchemes: {
    dark: true,
    light: true,
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  typography: {
    fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
    fontSize: 16,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
