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

export interface Product {
  name: string;
  price: number;
  bulkOptions?: ProductOptions[];
  requiredCustomizations?: KeyValueStringPairs[];
  shortDetails: string[];
  details: string[];
  images: string[];
  desc: string;
  quantity: number;
  id: number;
  type: string;
  learnMoreLink: string;
}

export interface faIcon {
  link: string;
  icon: IconProp;
}

interface ProductOptions {
  quantity: number;
  price: number;
}

export interface KeyValueStringPairs {
  key: string;
  value: string;
}