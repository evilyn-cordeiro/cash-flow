import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#121212",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      contrastText: "#121212",
    },
    background: {
      default: "#f3f3f3",
      paper: "#f9f9f9",
    },
    text: {
      primary: "#121212",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    allVariants: {
      color: "#121212",
    },
  },
});

export default theme;
