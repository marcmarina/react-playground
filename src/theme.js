import { createTheme } from "@mui/material";

export const theme = createTheme({
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
