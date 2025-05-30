import { createTheme, alpha } from "@mui/material/styles";

export const theme = createTheme({
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
      default: "#121212",
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
  components: {
    // Input Style
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 4,
          position: "relative",
          backgroundColor: "#FFF",
          border: "1px solid",
          borderColor: "#49474E",
          fontSize: 16,
          height: "40px",
          padding: "10px 12px",
          transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
          ]),
          "&:hover": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused": {
            boxShadow: `${alpha(
              theme.palette.primary.main,
              0.25
            )} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
          },
        }),
        input: {
          fontFamily: "'Inter', sans-serif",
          "&::placeholder": {
            color: "#6F6D78",
            opacity: 1,
          },
        },
      },
    },

    // Table Style
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: "#121212",
          borderBottom: "1px solid #e0e0e0",
        },
        head: {
          color: "#ffffff",
          fontWeight: 600,
          backgroundColor: "#121212", // <- Adicionado aqui!
        },
        body: {
          color: "#121212",
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#f5f5f5",
          },
          "&:hover": {
            backgroundColor: alpha("#121212", 0.05),
          },
        },
      },
    },
  },
});

export default theme;
