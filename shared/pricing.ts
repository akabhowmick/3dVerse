// Framework-free, dependency-free pricing module. Imported by both the Vite
// frontend and the Netlify Functions runtime, so it must stay importable from
// plain Node: no React, no import.meta.env, no asset imports. This is the one
// place order totals get computed -- the browser is never trusted for price.

export type ProductVariantKind = "single" | "option" | "bulk";

export interface CatalogProductVariant {
  skuId: string;
  label: string | number;
  unitPriceCents: number;
}

export interface CatalogProduct {
  productId: string;
  name: string;
  variantKind: ProductVariantKind;
  variants: CatalogProductVariant[];
}

export interface CatalogItem {
  id: string;
  name: string;
  unitPriceCents: number;
  currency: string;
}

export interface OrderItemInput {
  id: string;
  quantity: number;
}

export interface OrderLineItem {
  id: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  lineTotalCents: number;
}

export interface OrderTotal {
  currency: string;
  items: OrderLineItem[];
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
}

export interface CaptureSummary extends OrderTotal {
  orderId: string;
  status: string;
}

const CURRENCY = "USD";
const NY_SALES_TAX_RATE = 0.0875;
const FLAT_SHIPPING_CENTS = 500;

// Per-item and per-order caps guard against absurd totals (e.g. an attacker
// submitting the same sku thousands of times to bypass the per-item cap by
// splitting quantity across many line entries -- calculateOrderTotal merges
// duplicate ids before checking the cap, so that split doesn't help).
export const MAX_QUANTITY_PER_ITEM = 25;
export const MAX_DISTINCT_ITEMS = 50;

// Each catalog "product" (matching the frontend's numeric Product.id, as a
// string) explodes into one or more purchasable SKUs. Products with
// size/style options or bulk-quantity packs have one SKU per variant, since
// each variant carries its own price; a plain product gets a single SKU.
export const productCatalog: CatalogProduct[] = [
  {
    productId: "1",
    name: "Replica House - Full House",
    variantKind: "option",
    variants: [
      { skuId: "1-4in", label: "Extra Small Model (4in)", unitPriceCents: 17500 },
      { skuId: "1-6in", label: "Smaller Model (6in)", unitPriceCents: 20000 },
      { skuId: "1-8in", label: "Smaller Model (8in)", unitPriceCents: 25000 },
      { skuId: "1-10in", label: "Medium Model (10in)", unitPriceCents: 27500 },
      { skuId: "1-12in", label: "Large Mode (12in)", unitPriceCents: 35000 },
    ],
  },
  {
    productId: "2",
    name: "Replica House - Front Facade",
    variantKind: "option",
    variants: [
      { skuId: "2-house-only", label: "House Only", unitPriceCents: 7500 },
      { skuId: "2-key-holder", label: "Key Holder", unitPriceCents: 8500 },
    ],
  },
  {
    productId: "3",
    name: "Business Card Holder",
    variantKind: "single",
    variants: [{ skuId: "3", label: "Business Card Holder", unitPriceCents: 1500 }],
  },
  {
    productId: "4",
    name: "Unique Custom Signature Keychain - With your Logo",
    variantKind: "bulk",
    variants: [
      { skuId: "4-pack-10", label: 10, unitPriceCents: 1000 },
      { skuId: "4-pack-25", label: 25, unitPriceCents: 2000 },
      { skuId: "4-pack-50", label: 50, unitPriceCents: 4000 },
      { skuId: "4-pack-100", label: 100, unitPriceCents: 7500 },
      { skuId: "4-pack-150", label: 150, unitPriceCents: 12500 },
      { skuId: "4-pack-200", label: 200, unitPriceCents: 15000 },
      { skuId: "4-pack-500", label: 500, unitPriceCents: 25000 },
    ],
  },
];

export const catalog: CatalogItem[] = productCatalog.flatMap((product) =>
  product.variants.map((variant) => ({
    id: variant.skuId,
    name: product.variantKind === "single" ? product.name : `${product.name} - ${variant.label}`,
    unitPriceCents: variant.unitPriceCents,
    currency: CURRENCY,
  }))
);

const catalogById = new Map(catalog.map((item) => [item.id, item]));
const productIdBySkuId = new Map(
  productCatalog.flatMap((product) => product.variants.map((v) => [v.skuId, product.productId]))
);

export function getCatalogItem(id: string): CatalogItem | undefined {
  return catalogById.get(id);
}

export function productIdForSkuId(skuId: string): string | undefined {
  return productIdBySkuId.get(skuId);
}

export function defaultSkuIdForProduct(productId: string): string | undefined {
  return productCatalog.find((p) => p.productId === productId)?.variants[0]?.skuId;
}

// Integer-only cents-to-dollar-string conversion so formatting never touches
// floating point, even for display.
export function centsToDollarString(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(Math.trunc(cents));
  const dollars = Math.floor(abs / 100);
  const remainder = abs % 100;
  return `${sign}${dollars}.${remainder.toString().padStart(2, "0")}`;
}

export function calculateOrderTotal(items: OrderItemInput[]): OrderTotal {
  if (!Array.isArray(items)) {
    throw new Error("Order items must be an array.");
  }
  if (items.length > MAX_DISTINCT_ITEMS) {
    throw new Error("Too many line items in order.");
  }

  const quantityBySkuId = new Map<string, number>();
  for (const item of items) {
    if (!item || typeof item.id !== "string" || item.id.length === 0) {
      throw new Error("Invalid item id.");
    }
    if (!Number.isInteger(item.quantity)) {
      throw new Error(`Quantity for item "${item.id}" must be an integer.`);
    }
    if (item.quantity < 1) {
      throw new Error(`Quantity for item "${item.id}" must be at least 1.`);
    }

    const mergedQuantity = (quantityBySkuId.get(item.id) ?? 0) + item.quantity;
    if (mergedQuantity > MAX_QUANTITY_PER_ITEM) {
      throw new Error(`Quantity for item "${item.id}" exceeds the maximum allowed.`);
    }
    quantityBySkuId.set(item.id, mergedQuantity);
  }

  const lineItems: OrderLineItem[] = Array.from(quantityBySkuId.entries()).map(([id, quantity]) => {
    const catalogItem = catalogById.get(id);
    if (!catalogItem) {
      throw new Error(`Unknown product id "${id}".`);
    }
    return {
      id: catalogItem.id,
      name: catalogItem.name,
      unitPriceCents: catalogItem.unitPriceCents,
      quantity,
      lineTotalCents: catalogItem.unitPriceCents * quantity,
    };
  });

  const subtotalCents = lineItems.reduce((sum, item) => sum + item.lineTotalCents, 0);
  const taxCents = Math.round(subtotalCents * NY_SALES_TAX_RATE);
  const shippingCents = lineItems.length > 0 ? FLAT_SHIPPING_CENTS : 0;
  const totalCents = subtotalCents + taxCents + shippingCents;

  return {
    currency: CURRENCY,
    items: lineItems,
    subtotalCents,
    taxCents,
    shippingCents,
    totalCents,
  };
}
