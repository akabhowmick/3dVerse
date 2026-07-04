import { createTheme } from "@mui/material/styles";

// This theme carries the app's *semantic* colors (used via MUI component
// props like color="primary") and layout breakpoints. Decorative/gradient
// CSS custom properties (--grad-1..4, --background, --light) intentionally
// stay in App.css rather than being forced into the MUI palette, since they
// don't map to a standard palette slot.
const theme = createTheme({
  palette: {
    primary: { main: "#0d46b8" }, // --primary
    secondary: { main: "#c30707" }, // --secondary (alpha channel dropped; MUI palette colors don't support alpha)
    warning: { main: "#ffcc00" }, // --warning
    error: { main: "#d10202" }, // --danger
    info: { main: "#2ea5dc" }, // --info
    success: { main: "#1cca56" }, // --success
    background: {
      default: "#f4f6f8", // --grad-1
    },
    text: {
      primary: "#323234", // --dark
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif', // matches --font in App.css
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
});

export default theme;
