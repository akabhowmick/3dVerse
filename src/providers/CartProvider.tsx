/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { customerChoice, KeyValueStringPairs, Product } from "../Types/interfaces";
import { products } from "../utils/Products";

const isValidRequiredCustomizations = (value: unknown): value is KeyValueStringPairs[] =>
  Array.isArray(value) &&
  value.every(
    (entry) =>
      entry &&
      typeof entry === "object" &&
      typeof (entry as KeyValueStringPairs).key === "string" &&
      typeof (entry as KeyValueStringPairs).value === "string"
  );

const isValidCustomerChoices = (value: unknown): value is customerChoice[] =>
  Array.isArray(value) &&
  value.every(
    (entry) =>
      entry &&
      typeof entry === "object" &&
      typeof (entry as customerChoice).name === "string" &&
      typeof (entry as customerChoice).value === "string"
  );

// Rebuilds a cart item from trusted catalog data, taking only id/quantity/
// customization choices from localStorage. This is what prevents a tampered
// price (or name/images) in localStorage from ever reaching the cart.
const rebuildTrustedCartItem = (stored: unknown, catalog: Product[]): Product | null => {
  if (!stored || typeof stored !== "object") return null;
  const { id, quantity } = stored as { id?: unknown; quantity?: unknown };
  if (typeof id !== "number" || typeof quantity !== "number" || quantity < 1) return null;

  const catalogProduct = catalog.find((product) => product.id === id);
  if (!catalogProduct) return null;

  const storedItem = stored as Partial<Product>;
  const customerChoices = isValidCustomerChoices(storedItem.customerChoices)
    ? storedItem.customerChoices
    : undefined;
  const requiredCustomizations = isValidRequiredCustomizations(storedItem.requiredCustomizations)
    ? storedItem.requiredCustomizations
    : catalogProduct.requiredCustomizations;

  let price = catalogProduct.price;
  customerChoices?.forEach((choice) => {
    const selectedBulkOption = catalogProduct.bulkOptions?.find(
      (opt) => opt.option.toString() === choice.value
    );
    const selectedOption = catalogProduct.options?.find(
      (opt) => opt.option.toString() === choice.value
    );
    if (selectedBulkOption) {
      price = selectedBulkOption.price;
    } else if (selectedOption) {
      price = selectedOption.price;
    }
  });

  return {
    ...catalogProduct,
    id,
    quantity,
    price,
    customerChoices,
    requiredCustomizations,
  };
};

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
  announcement: string;
}

const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const shippingPrice = 5;
  const taxRate = 0.0875;

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
    if (!maybeCart) return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(maybeCart);
    } catch {
      localStorage.removeItem("3dPrintVerseCart");
      return;
    }

    if (!Array.isArray(parsed)) {
      localStorage.removeItem("3dPrintVerseCart");
      return;
    }

    const rebuiltItems = parsed
      .map((item) => rebuildTrustedCartItem(item, products))
      .filter((item): item is Product => item !== null);

    setCartItems(rebuiltItems);

    if (rebuiltItems.length !== parsed.length) {
      // Some stored entries were invalid or tampered with -- re-persist only
      // the cleaned, trusted subset instead of leaving the corrupted data.
      updateCartInLocalStorage(rebuiltItems);
    }
  }, []);

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("3dPrintVerseCart");
  };

  const setCart = (newCart: Product[]) => {
    updateCartInLocalStorage(newCart);
    setCartItems(newCart);
  };

  const updateCartInLocalStorage = (cartArrayItems: Product[]) => {
    localStorage.setItem("3dPrintVerseCart", JSON.stringify(cartArrayItems));

    if (cartArrayItems.length === 0) {
      localStorage.removeItem("3dPrintVerseCart");
    }
  };

  const addToCart = (id: number) => {
    const product = products.find((product) => product.id === id);
    const newProduct = JSON.parse(JSON.stringify(product));
    if (!cartItems.find((product) => product.id === id) && newProduct) {
      const newCart = [...cartItems, newProduct];
      setCart(newCart);
      setAnnouncement(`Added ${newProduct.name} to cart`);
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
    const removedName = cartItems.find((item) => item.id === id)?.name;
    const newCart = updatedCartItems.filter((item) => item.id !== id);
    setCart(newCart);
    setAnnouncement(`Removed ${removedName || "item"} from cart`);
  };

  const changeItemQuantity = (id: number, changeType: string) => {
    const changeAmount = changeType === "addOne" ? 1 : -1;
    let announcementMessage = "";
    const updatedCartItems: Product[] = cartItems.map((item) => {
      if (item.id === id) {
        const updatedQuantity = item.quantity + changeAmount;
        const finalQuantity = updatedQuantity > 0 ? updatedQuantity : item.quantity;
        announcementMessage = `${changeType === "addOne" ? "Increased" : "Decreased"} quantity of ${item.name} to ${finalQuantity}`;
        return {
          ...item,
          quantity: finalQuantity,
        };
      }
      return item;
    });
    setCart(updatedCartItems);
    if (announcementMessage) {
      setAnnouncement(announcementMessage);
    }
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
        announcement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
