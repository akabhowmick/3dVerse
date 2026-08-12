/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useMemo, createContext, useContext, ReactNode } from "react";
import { customerChoice, KeyValueStringPairs, Product } from "../Types/interfaces";
import { products } from "../utils/Products";
import {
  calculateOrderTotal,
  defaultSkuIdForProduct,
  getCatalogItem,
  productIdForSkuId,
} from "../../shared/pricing";

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
// skuId/customization choices from localStorage. This is what prevents a
// tampered price (or name/images) in localStorage from ever reaching the
// cart -- price is always looked up from the shared catalog by skuId, never
// read from the stored blob directly.
const rebuildTrustedCartItem = (stored: unknown, catalog: Product[]): Product | null => {
  if (!stored || typeof stored !== "object") return null;
  const { id, quantity, skuId } = stored as { id?: unknown; quantity?: unknown; skuId?: unknown };
  if (typeof id !== "number" || typeof quantity !== "number" || quantity < 1) return null;
  if (typeof skuId !== "string") return null;

  const catalogProduct = catalog.find((product) => product.id === id);
  if (!catalogProduct) return null;

  const skuEntry = getCatalogItem(skuId);
  if (!skuEntry || productIdForSkuId(skuId) !== String(id)) return null;

  const storedItem = stored as Partial<Product>;
  const customerChoices = isValidCustomerChoices(storedItem.customerChoices)
    ? storedItem.customerChoices
    : undefined;
  const requiredCustomizations = isValidRequiredCustomizations(storedItem.requiredCustomizations)
    ? storedItem.requiredCustomizations
    : catalogProduct.requiredCustomizations;

  return {
    ...catalogProduct,
    id,
    quantity,
    skuId,
    price: skuEntry.unitPriceCents / 100,
    customerChoices,
    requiredCustomizations,
  };
};

interface CartContextType {
  cartItems: Product[];
  total: number;
  tax: number;
  shipping: number;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  changeItemQuantity: (id: number, changeType: string) => void;
  changeItemCustomization: (id: number, customizationName: string, value: string) => void;
  setCart: (newCart: Product[]) => void;
  finalTotal: number;
  changeItemVariant: (id: number, skuId: string, choiceLabel: string) => void;
  clearCart: () => void;
  announcement: string;
}

const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [announcement, setAnnouncement] = useState("");

  // The one place the frontend computes order totals -- same shared function
  // the Netlify Functions use, so display totals can never drift from what
  // the server will actually charge. Not itself the source of truth for
  // charging: the server always recomputes independently from the cart's
  // skuIds/quantities rather than trusting any number sent by the client.
  const orderTotal = useMemo(() => {
    const items = cartItems
      .filter((item): item is Product & { skuId: string } => typeof item.skuId === "string")
      .map((item) => ({ id: item.skuId, quantity: item.quantity }));
    try {
      return calculateOrderTotal(items);
    } catch {
      return calculateOrderTotal([]);
    }
  }, [cartItems]);

  const total = orderTotal.subtotalCents / 100;
  const tax = orderTotal.taxCents / 100;
  const shipping = orderTotal.shippingCents / 100;
  const finalTotal = orderTotal.totalCents / 100;

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
    if (!product || cartItems.find((item) => item.id === id)) return;

    const skuId = defaultSkuIdForProduct(String(id));
    const skuEntry = skuId ? getCatalogItem(skuId) : undefined;
    const newProduct: Product = {
      ...JSON.parse(JSON.stringify(product)),
      skuId,
      price: skuEntry ? skuEntry.unitPriceCents / 100 : product.price,
    };
    const newCart = [...cartItems, newProduct];
    setCart(newCart);
    setAnnouncement(`Added ${newProduct.name} to cart`);
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

  // Changing a product's size/style/bulk-pack selection changes which SKU
  // (and therefore which price) the cart line represents. price here is only
  // ever set from the shared catalog's lookup for that skuId, never from
  // anything the caller passes in directly -- this is what the create-order
  // function will independently recompute and charge.
  const changeItemVariant = (id: number, skuId: string, choiceLabel: string) => {
    const skuEntry = getCatalogItem(skuId);
    if (!skuEntry) return;
    const updatedCartItems: Product[] = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          skuId,
          price: skuEntry.unitPriceCents / 100,
          customerChoices: [{ name: "Selected Option", value: choiceLabel }],
        };
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
        tax,
        shipping,
        addToCart,
        removeFromCart,
        changeItemQuantity,
        changeItemCustomization,
        setCart,
        changeItemVariant,
        finalTotal,
        clearCart,
        announcement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
