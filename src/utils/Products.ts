import { KeyValueStringPairs, Product } from "../Types/interfaces";

import houseFull1 from "../assets/ProductImages/House/House-Full/1.png";
import houseFull2 from "../assets/ProductImages/House/House-Full/2.png";
import houseFull3 from "../assets/ProductImages/House/House-Full/3.png";
import houseFull4 from "../assets/ProductImages/House/House-Full/4.jpg";
import houseFull5 from "../assets/ProductImages/House/House-Full/5.jpg";
import houseFull6 from "../assets/ProductImages/House/House-Full/6.png";
import houseFull7 from "../assets/ProductImages/House/House-Full/7.png";
import houseFull8 from "../assets/ProductImages/House/House-Full/8.png";
import houseFull9 from "../assets/ProductImages/House/House-Full/9.png";
import houseFull10 from "../assets/ProductImages/House/House-Full/10.png";
import houseFull11 from "../assets/ProductImages/House/House-Full/11.png";
import houseFull12 from "../assets/ProductImages/House/House-Full/12.png";
import houseFull13 from "../assets/ProductImages/House/House-Full/13.png";
import houseFull14 from "../assets/ProductImages/House/House-Full/14.png";



import houseFront1 from "../assets/ProductImages/House/House-Front/1.png";
import houseFront2 from "../assets/ProductImages/House/House-Front/2.png";
import houseFront3 from "../assets/ProductImages/House/House-Front/3.png";
import houseFront4 from "../assets/ProductImages/House/House-Front/4.png";
import houseFront5 from "../assets/ProductImages/House/House-Front/5.png";
import houseFront6 from "../assets/ProductImages/House/House-Front/6.png";
import houseFront7 from "../assets/ProductImages/House/House-Full/4.jpg";
import houseFront8 from "../assets/ProductImages/House/House-Full/5.jpg";

import cardHolder1 from "../assets/ProductImages/Miscellaneous/CardHolder/acc1.png";
import cardHolder2 from "../assets/ProductImages/Miscellaneous/CardHolder/acc2.png";
import cardHolder3 from "../assets/ProductImages/Miscellaneous/CardHolder/acc3.png";
import cardHolder4 from "../assets/ProductImages/Miscellaneous/CardHolder/acc4.png";

import k1 from "../assets/ProductImages/Miscellaneous/Keychains/k1.png";
import k2 from "../assets/ProductImages/Miscellaneous/Keychains/k2.png";
import k3 from "../assets/ProductImages/Miscellaneous/Keychains/k3.png";
import k4 from "../assets/ProductImages/Miscellaneous/Keychains/k4.png";
import k5 from "../assets/ProductImages/Miscellaneous/Keychains/k5.png";
import k6 from "../assets/ProductImages/Miscellaneous/Keychains/k6.png";


import video from "../assets/Main/Hero/home-video.mp4"
import poster from "../assets/Main/Hero/home-bg.jpg"
export const videoPath = video;
export const posterPath = poster;


export const heroImages: string[] = [
  houseFull7,
  houseFull6,
  houseFull8,
  houseFront8,
  cardHolder2,
];

const commonCustomizations: KeyValueStringPairs[] = [
  { key: "Color of Holder", value: "" },
  { key: "Color of Letterings", value: "" },
  { key: "Custom Lettering (OR DM us your logo)", value: "" },
];

const Product1: Product = {
  name: "Replica House - Full House",
  price: 175.0,
  shortDetails: [],
  options: [
    { option: "Extra Small Model (4in)", price: 175.0 },
    { option: "Smaller Model (6in)", price: 200.0 },
    { option: "Smaller Model (8in)", price: 250 },
    { option: "Medium Model (10in)", price: 275.0 },
    { option: "Large Mode (12in)", price: 350.0 },
  ],
  details: [
    "Calling all HOME OWNERS, REALTORS, AND LOAN OFFICERS.This is the perfect opportunity to gift a 3D-printed version of a house just sold or bought. This unique gift will help you stand out from your competition and which makes you more likely to attract and retain customers.",
    "Model size varies. 6in maximum dimension - 16in maximum dimension in all directions. (If you would like something larger, please message us for a quote)",
    "If the model includes a higher level of detail, we will message you a quote with a final price. Prices vary from $175 - $450.",
    "his is a completely custom service, so you are paying for modeling of the structure, printing, regular updates, and excellent communication",
    "The printed houses are in color. However, colors are limited. We will send you the renderings of the house with the exact tone of colors that will be used. You can approve the colors at this step in the process.",
  ],
  images: [
    houseFull12,
    houseFull1,
    houseFull3,
    houseFull4,
    houseFull5,
    houseFull6,
    houseFull7,
    houseFull8,
    houseFull9,
    houseFull10,
    houseFull11,
    houseFull2,
    houseFull13,
    houseFull14,
  ],
  desc: "3D Printed Replica of Your House - Full House! Customized and Personalized Models, New Home, Personal Gift, Real Estate Agent",
  quantity: 1,
  id: 1,
  type: "Model-House",
  learnMoreLink: "/products/1",
};

const Product2: Product = {
  name: "Replica House - Front Facade",
  price: 75.0,
  shortDetails: [],
  options: [
    { option: "House Only", price: 75.0 },
    { option: "Key Holder", price: 85 },
  ],
  details: [
    "This product is solely the front facade of your house. If you would like your full house printed please see our product named 3D Printed Your House - Full House!",
    "Calling all HOME OWNERS, REALTORS, AND LOAN OFFICERS. This is the perfect opportunity to gift a 3D-printed version of a house just sold or bought. This unique gift will help you stand out from your competition and which makes you more likely to attract and retain customers.",
    "Model size varies. 10in maximum in all directions. (If you would like something larger, please message us for a quote)",
    "This is a completely custom service, so you are paying for modeling of the structure, printing, regular updates, and excellent communication.",
    "The printed houses are in color. However, colors are limited. We will send you the renderings of the house with the exact tone of colors that will be used. You can approve the colors at this step in the process.",
  ],
  images: [
    houseFront1,
    houseFront2,
    houseFront3,
    houseFront4,
    houseFront5,
    houseFront6,
    houseFront7,
    houseFront8,
  ],
  desc: "FRONT FACADE - 3D-PRINTED REPLICA OF YOUR HOUSE",
  quantity: 1,
  id: 2,
  type: "Model-House",
  learnMoreLink: "/products/2",
};

const Product3: Product = {
  name: "Business Card Holder",
  price: 15.0,
  shortDetails: ["Business Card Holder, Personalized Business Cards Holder Custom Logo"],
  requiredCustomizations: commonCustomizations,
  details: [
    "Customizing is simple!",
    "1. Please specify in the personalization section which Primary Color (base) you would like!",
    "2. Message us or email us (print3Dverse@gmail.com) with the personalization/logo you want and we will send you the mock-up of the design to confirm your approval.",
    "Holds about 25 business cards.",
    "2 piece stand, PLA Material, 4 inches x 5 inches x 2 inches",
    "Lead time for custom orders is around 7-10 days for manufacturing!",
    "Plastic has natural imperfections",
  ],
  images: [cardHolder1, cardHolder2, cardHolder3, cardHolder4],
  desc: "Personalize your Business card holder.",
  quantity: 1,
  id: 3,
  type: "Miscellaneous",
  learnMoreLink: "/products/3",
};

const keyChain: Product = {
  name: "Unique Custom Signature Keychain - With your Logo",
  price: 10.0,
  bulkOptions: [
    { option: 10, price: 10.0 },
    { option: 25, price: 20.0 },
    { option: 50, price: 40.0 },
    { option: 100, price: 75.0 },
    { option: 150, price: 125.0 },
    { option: 200, price: 150.0 },
    { option: 500, price: 250.0 },
  ],
  shortDetails: [
    "Custom Keychains are small, circular accessories made from a durable piece that is commonly used to hold keys.",
    "Unique Backpack Keychain is a popular item due to its simplicity and versatility, and Aesthetic Safety Keychain can be used for personal use or given to your friends.",
  ],
  requiredCustomizations: commonCustomizations,
  details: [
    "Custom Keychains with a message, date, name or coordinate for a gift that is both sweet and practical.",
    "Personalize Keychain, it is sure to be a special charm they will treasure for many moments to come. Double-sided engravings are also available for double the sweet sentiments.",
    "Send these out as giveaways to your subscribers/customers to show off and advertise your brand. It's like a walking advertisement! Or just gain style points walking around with your logo on your keychain or backpack! Our design team will work with you to come up with the perfect unique design that you want to show off!",
    "This Custom Keychains is designed exactly how you want it!",
    "Material: PLA (Polylactic acid)",
    "Size: Typically 1.5in. x 1.5in. (varies on customization)",
    "After placing your order:",
    "- Send us your logo and we will send you a mock-up of how the keychains will come out.",
    "- You comment or approve the rendering",
    "- We go into production and ship out ASAP!",
  ],
  images: [k1, k2, k3, k4, k5, k6],
  desc: "Your Personalized Keychain",
  quantity: 1,
  id: 4,
  type: "Miscellaneous",
  learnMoreLink: "/products/4",
};

export const products: Product[] = [Product1, Product2, Product3, keyChain];
