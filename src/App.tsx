import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

// Context Providers
import { CartProvider } from "./providers/CartProvider";
import { UserProvider } from "./providers/UserProvider";

// sections or components
import { Footer } from "./Components/Footer/Footer";
import { router } from "./Components/Layouts/Router";
import FloatingCartButton from "./Pages/Cart/FloatingCart";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <FloatingCartButton />
          <Footer />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
