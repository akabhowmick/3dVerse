import { createTheme } from "@mui/material/styles";

// This theme carries the app's *semantic* colors (used via MUI component
// props like color="primary") and layout breakpoints, kept in sync with the
// Phase 4 "workshop precision" palette defined in App.css's :root block.
// Decorative CSS custom properties that don't map to a standard MUI palette
// slot stay in App.css.
const theme = createTheme({
  palette: {
    primary: { main: "#2743e3" }, // --accent
    secondary: { main: "#14161a" }, // --ink
    warning: { main: "#ffcc00" }, // --warning
    error: { main: "#d10202" }, // --danger
    info: { main: "#2ea5dc" }, // --info
    success: { main: "#1cca56" }, // --success
    background: {
      default: "#f6f6f3", // --base
      paper: "#ffffff", // --surface
    },
    text: {
      primary: "#14161a", // --ink
      secondary: "#6b7075", // --muted
    },
    divider: "#e3e3de", // --line
  },
  typography: {
    fontFamily: '"Inter", system-ui, Avenir, Helvetica, Arial, sans-serif', // --font-body
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500 },
    h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500 },
    button: { fontFamily: '"Inter", sans-serif', textTransform: "none", fontWeight: 600 },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 6,
        },
        outlined: {
          borderColor: "#14161a",
          color: "#14161a",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-active": { color: "#2743e3" },
          "&.Mui-completed": { color: "#2743e3" },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
        },
      },
    },
  },
});

export default theme;
