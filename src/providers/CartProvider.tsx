/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { customerChoice, Product } from "../Types/interfaces";
import { products } from "../utils/Products";

interface CartContextType {
  cartItems: Product[];
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  changeItemQuantity: (id: number, changeType: string) => void;
  changeItemCustomization: (id: number, customizationName: string, value: string) => void;
  setCart: (newCart: Product[]) => void;
  finalTotal: number;
  changeItemOption: (id: number, value: string) => void;
  updateItemCustomization: (id: number, updatedChoices: customerChoice[]) => void;
  clearCart: () => void;
}

const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const shippingPrice = 5;
  const taxRate = 0.0875;

  const CLEAR_CART_TIMEOUT = 20 * 60 * 1000; // 20 minutes in milliseconds

  useEffect(() => {
    let cartTotal = 0;
    cartItems.forEach((item) => {
      cartTotal += item.price * item.quantity;
    });
    setTotal(cartTotal);
    const finalTotalWithTaxAndShipping =
      Math.round((cartTotal * (1 + taxRate) + shippingPrice) * 100) / 100;
    setFinalTotal(finalTotalWithTaxAndShipping);
  }, [cartItems]);

  useEffect(() => {
    const maybeCart = localStorage.getItem("3dPrintVerseCart");
    if (maybeCart) {
      setCartItems(JSON.parse(maybeCart));
    }

    // Check for the last update timestamp
    const lastUpdated = localStorage.getItem("3dPrintVerseCartLastUpdated");
    if (lastUpdated) {
      const lastUpdatedTime = Number(lastUpdated);
      const currentTime = Date.now();
      const timeDiff = currentTime - lastUpdatedTime;

      // If more than 20 minutes have passed since the last update, clear the cart
      if (timeDiff > CLEAR_CART_TIMEOUT) {
        clearCart();
      }
    }

    // Optionally set an interval to check every minute
    const interval = setInterval(() => {
      const lastUpdated = localStorage.getItem("3dPrintVerseCartLastUpdated");
      if (lastUpdated) {
        const lastUpdatedTime = Number(lastUpdated);
        const currentTime = Date.now();
        const timeDiff = currentTime - lastUpdatedTime;

        if (timeDiff > CLEAR_CART_TIMEOUT) {
          clearCart();
        }
      }
    }, 60 * 1000); // Every minute

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("3dPrintVerseCart");
    localStorage.removeItem("3dPrintVerseCartLastUpdated");
  };

  const setCart = (newCart: Product[]) => {
    updateCartInLocalStorage(newCart);
    setCartItems(newCart);
  };

  const updateCartInLocalStorage = (cartArrayItems: Product[]) => {
    localStorage.setItem("3dPrintVerseCart", JSON.stringify(cartArrayItems));
    localStorage.setItem("3dPrintVerseCartLastUpdated", Date.now().toString());

    if (cartArrayItems.length === 0) {
      localStorage.removeItem("3dPrintVerseCart");
      localStorage.removeItem("3dPrintVerseCartLastUpdated");
    }
  };

  const addToCart = (id: number) => {
    const product = products.find((product) => product.id === id);
    const newProduct = JSON.parse(JSON.stringify(product));
    if (!cartItems.find((product) => product.id === id) && newProduct) {
      const newCart = [...cartItems, newProduct];
      setCart(newCart);
    }
  };

  const removeFromCart = (id: number) => {
    const originalProduct = products.find((product) => product.id === id);
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && "customerChoices" in item) {
        delete item.customerChoices;
        item.price = originalProduct?.price || item.price;
      }
      return item;
    });
    const newCart = updatedCartItems.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const changeItemQuantity = (id: number, changeType: string) => {
    const changeAmount = changeType === "addOne" ? 1 : -1;
    const updatedCartItems: Product[] = cartItems.map((item) => {
      if (item.id === id) {
        const updatedQuantity = item.quantity + changeAmount;
        return {
          ...item,
          quantity: updatedQuantity > 0 ? updatedQuantity : item.quantity,
        };
      }
      return item;
    });
    setCart(updatedCartItems);
  };

  const changeItemCustomization = (id: number, customizationName: string, value: string) => {
    const updatedCartItems: Product[] = cartItems.map((item) => {
      if (item.id === id) {
        const updatedCustomizations = item.requiredCustomizations?.map((customization) => {
          if (customization.key === customizationName) {
            return { ...customization, value: value };
          }
          return customization;
        });

        return {
          ...item,
          requiredCustomizations: updatedCustomizations,
        };
      }
      return item;
    });
    setCart(updatedCartItems);
  };

  const changeItemOption = (id: number, value: string) => {
    const updatedCartItems: Product[] = cartItems.map((item) => {
      if (item.id === id) {
        item.price = parseInt(value, 10);
      }
      return item;
    });
    setCart(updatedCartItems);
  };

  const updateItemCustomization = (id: number, updatedChoices: customerChoice[]) => {
    const updatedCartItems: Product[] = cartItems.map((item) => {
      if (item.id === id) {
        item.customerChoices = updatedChoices;

        let newPrice = item.price;

        updatedChoices.forEach((choice) => {
          const selectedBulkOption = item.bulkOptions?.find(
            (opt) => opt.option.toString() === choice.value
          );
          const selectedOption = item.options?.find(
            (opt) => opt.option.toString() === choice.value
          );

          if (selectedBulkOption) {
            newPrice = selectedBulkOption.price;
          } else if (selectedOption) {
            newPrice = selectedOption.price;
          }
        });

        item.price = newPrice;
      }
      return item;
    });

    setCart(updatedCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        setTotal,
        addToCart,
        removeFromCart,
        changeItemQuantity,
        changeItemCustomization,
        setCart,
        changeItemOption,
        finalTotal,
        updateItemCustomization,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
