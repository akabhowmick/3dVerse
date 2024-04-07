import { KeyValueStringPairs, Product } from "../Types/interfaces";

//! change to dummyImage
import dummyImage1 from "../assets/Main/logo.png";
import dummyImage2 from "../assets/Main/logo.png";
import dummyImage3 from "../assets/Main/logo.png";

const commonCustomizations: KeyValueStringPairs[] = [
  { key: "Color of Holder", value: "" },
  { key: "Color of Letterings", value: "" },
  { key: "Custom Lettering (OR DM us your logo)", value: "" },
];

const dummyProduct1: Product = {
  name: "3D Printed Replica of Your House",
  price: 75.00,
  bulkOptions: [{ quantity: 2, price: 45.0 }],
  shortDetails: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
  requiredCustomizations: commonCustomizations,
  details: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ],
  images: [dummyImage1, dummyImage2, dummyImage3],
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  quantity: 1,
  id: 1,
  type: "Sports",
  learnMoreLink: "/products/1",
};

const dummyProduct2: Product = {
  name: "Product 1",
  price: 25.0,
  bulkOptions: [{ quantity: 2, price: 45.0 }],
  shortDetails: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
  requiredCustomizations: commonCustomizations,
  details: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ],
  images: [dummyImage1, dummyImage2, dummyImage3],
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  quantity: 1,
  id: 1,
  type: "Sports",
  learnMoreLink: "/products/1",
};

const dummyProduct3: Product = {
  name: "Product 1",
  price: 25.0,
  bulkOptions: [{ quantity: 2, price: 45.0 }],
  shortDetails: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
  requiredCustomizations: commonCustomizations,
  details: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ],
  images: [dummyImage1, dummyImage2, dummyImage3],
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  quantity: 1,
  id: 1,
  type: "Sports",
  learnMoreLink: "/products/1",
};

const dummyProduct4: Product = {
  name: "Product 1",
  price: 25.0,
  bulkOptions: [{ quantity: 2, price: 45.0 }],
  shortDetails: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
  requiredCustomizations: commonCustomizations,
  details: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ],
  images: [dummyImage1, dummyImage2, dummyImage3],
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  quantity: 1,
  id: 1,
  type: "Sports",
  learnMoreLink: "/products/1",
};

const dummyProduct5: Product = {
  name: "Product 1",
  price: 25.0,
  bulkOptions: [{ quantity: 2, price: 45.0 }],
  shortDetails: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
  requiredCustomizations: commonCustomizations,
  details: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ],
  images: [dummyImage1, dummyImage2, dummyImage3],
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  quantity: 1,
  id: 1,
  type: "Sports",
  learnMoreLink: "/products/1",
};

export const products: Product[] = [
  dummyProduct1,
  dummyProduct2,
  dummyProduct3,
  dummyProduct4,
  dummyProduct5,
];
