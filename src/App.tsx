import "./fonts.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

// Context Providers
import { CartProvider } from "./providers/CartProvider";
import { UserProvider } from "./providers/UserProvider";

// sections or components
import { router } from "./Components/Layouts/Router";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          {/* The footer renders inside the router's root layout (see
              Navbar.tsx) so the sticky header holds for the whole page. */}
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
