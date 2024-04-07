import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Home } from "../../Pages/Home/Home";
import { ThankYouPage } from "../../Pages/ThankYouPage/ThankYouPage";
import Checkout from "../CheckoutProcess/Checkout/Checkout";
import { NotFoundPage } from "../../Pages/NotFoundPage/NotFoundPage";
import { ContactUs } from "../../Pages/ContactUs/ContactUs";
import { ProductPage } from "../../Pages/ProductPages/ProductPage";
import { ProductDescriptionPage } from "../../Pages/ProductPages/ProductDescriptionPage";
import { CartPage } from "../../Pages/Cart/CartPage";
import { UploadImageForm } from "../../Pages/UploadImage/UploadImage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route
        path="miscellaneous"
        element={<ProductPage pageHeader="Miscellaneous" pageContent="Miscellaneous" />}
      />
      <Route
        path="stadiums"
        element={<ProductPage pageHeader="Stadiums" pageContent="Stadiums" />}
      />
      <Route
        path="model-houses"
        element={<ProductPage pageHeader="Model Houses" pageContent="Model-House" />}
      />
      <Route path="/products/:productId" element={<ProductDescriptionPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="thanks" element={<ThankYouPage />} />
      <Route path="upload-image" element={<UploadImageForm />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
