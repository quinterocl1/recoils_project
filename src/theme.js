import { createTheme } from "@mui/material/styles";
import "@fontsource/epilogue/300.css";
import "@fontsource/epilogue/400.css";
import "@fontsource/epilogue/500.css";
import "@fontsource/epilogue/600.css";
import "@fontsource/epilogue/700.css";
import "@fontsource/inter";

// Configuración del tema basada en el JSON
const lightTheme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              style: {
                fontFamily: "Inter",
                textTransform: "none",
              },
            },
          ],
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#68BE05",
      dark: "#58AE00",
      light: "#80C83F",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#EDE40B",
      dark: "#EFBB00",
      light: "#F3EE68",
      contrastText: "#FFFFFF",
    },
    action: {
      disabled: "rgba(0, 0, 0, 0.38)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      hover: "rgba(0, 0, 0, 0.04)",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    error: {
      main: "#D32F2F",
      dark: "#C62828",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#EF6C00",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#0288D1",
      dark: "#01579B",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#2E7D32",
      dark: "#1B5E20",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
  },
  typography: {
    h1: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h2: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h3: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h4: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h5: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h6: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    body1: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
    },
    body2: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
    },
    subtitle1: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    subtitle2: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: [0, 8, 10, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96],
});

// Configuración del tema basado en el JSON para el modo oscuro
const darkTheme = createTheme({
  palette: {
    mode: "dark", // Configurado para el modo oscuro
    primary: {
      main: "#B7DE93",
      dark: "#80C83F",
      light: "#EEF7E5",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#F6F294",
      dark: "#F0E942",
      light: "#FDFCE5",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    action: {
      disabled: "rgba(255, 255, 255, 0.38)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      hover: "rgba(255, 255, 255, 0.08)",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
      disabled: "rgba(255, 255, 255, 0.38)",
    },
    error: {
      main: "#F44336",
      dark: "#D32F2F",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFA726",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#29B6F6",
      dark: "#0288D1",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    success: {
      main: "#66BB6A",
      dark: "#388E3C",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
  },
  typography: {
    h1: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h2: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h3: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h4: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h5: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    h6: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    body1: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
    },
    body2: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
    },
    subtitle1: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
    subtitle2: {
      fontFamily: "Epilogue, Helvetica, Arial, sans-serif",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: [0, 8, 10, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96],
});
export { lightTheme, darkTheme };
