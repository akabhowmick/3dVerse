import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface customerChoice {
  name: string;
  value: string;
}


export interface Product {
  name: string;
  price: number;
  bulkOptions?: ProductOptions[];
  options?: ProductOptions[];
  requiredCustomizations?: KeyValueStringPairs[];
  customerChoices?: customerChoice[]
  // Display-only spec sheet for the PDP's two-column definition list.
  // Values are drawn from this product's own `details` copy, never
  // invented, so nothing here should be treated as pricing-authoritative.
  specs?: KeyValueStringPairs[];
  shortDetails: string[];
  details: string[];
  images: string[];
  desc: string;
  quantity: number;
  id: number;
  type: string;
  learnMoreLink: string;
  // Identifies the exact priced variant (size/style/bulk-pack) a cart line
  // represents. Populated once a catalog product is added to the cart; the
  // server prices orders by skuId alone, never by anything else on this type.
  skuId?: string;
}

export interface faIcon {
  link: string;
  icon: IconProp;
}

interface ProductOptions {
  option: number | string;
  price: number;
  skuId: string;
}

export interface KeyValueStringPairs {
  key: string;
  value: string;
}
