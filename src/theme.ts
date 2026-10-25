import { createTheme } from "@mui/material/styles";

// This theme carries the app's *semantic* colors (used via MUI component
// props like color="primary") and layout breakpoints, kept in sync with
// the brand palette defined in App.css's :root block (colors pulled from
// the Print3Dverse logo). Decorative CSS custom properties that don't map
// to a standard MUI palette slot stay in App.css.
const display = '"Barlow Condensed", "Barlow Condensed Fallback", "Arial Narrow", sans-serif'; // --font-display
const body = '"Barlow", "Barlow Fallback", system-ui, -apple-system, "Segoe UI", sans-serif'; // --font-body

const heading = (fontWeight: number) => ({
  fontFamily: display,
  fontWeight,
  textTransform: "uppercase" as const,
  letterSpacing: "0.01em",
  lineHeight: 1,
});

const theme = createTheme({
  palette: {
    primary: { main: "#c4291f", dark: "#a3241c", contrastText: "#ffffff" }, // --red
    secondary: { main: "#0e0f12" }, // --ink
    info: { main: "#0249ab" }, // --blue
    error: { main: "#b3261e" }, // --danger
    success: { main: "#1b7a3d" }, // --success
    background: {
      default: "#f4f5f7", // --base
      paper: "#ffffff", // --surface
    },
    text: {
      primary: "#0e0f12", // --ink
      secondary: "#5b616b", // --muted
    },
    divider: "#dfe2e7", // --line
  },
  typography: {
    fontFamily: body,
    h1: heading(800),
    h2: heading(800),
    h3: heading(800),
    h4: heading(800),
    h5: heading(700),
    h6: heading(700),
    button: {
      fontFamily: display,
      fontWeight: 700,
      fontSize: "1.05rem",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    },
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
    borderRadius: 2,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 2,
        },
        outlined: {
          borderWidth: 2,
          borderColor: "#0e0f12",
          color: "#0e0f12",
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
          "&.Mui-active": { color: "#c4291f" },
          "&.Mui-completed": { color: "#0e0f12" },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontFamily: display,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: body,
        },
      },
    },
  },
});

export default theme;
