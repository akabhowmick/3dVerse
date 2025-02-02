import { KeyValueStringPairs, Product } from "../Types/interfaces";

import houseFull1 from "../assets/ProductImages/House/House-Full/1.jpg";
import houseFull2 from "../assets/ProductImages/House/House-Full/2.png";
import houseFull3 from "../assets/ProductImages/House/House-Full/3.jpg";
import houseFull4 from "../assets/ProductImages/House/House-Full/4.jpg";
import houseFull5 from "../assets/ProductImages/House/House-Full/5.jpg";
import houseFull6 from "../assets/ProductImages/House/House-Full/6.png";
import houseFull7 from "../assets/ProductImages/House/House-Full/7.png";
import houseFull8 from "../assets/ProductImages/House/House-Full/8.png";

import houseFront1 from "../assets/ProductImages/House/House-Front/1.jpg";
import houseFront2 from "../assets/ProductImages/House/House-Front/2.jpg";
import houseFront3 from "../assets/ProductImages/House/House-Front/3.jpg";
import houseFront4 from "../assets/ProductImages/House/House-Front/4.jpg";
import houseFront5 from "../assets/ProductImages/House/House-Front/5.jpg";
import houseFront6 from "../assets/ProductImages/House/House-Front/6.jpg";
import houseFront7 from "../assets/ProductImages/House/House-Front/7.png";
import houseFront8 from "../assets/ProductImages/House/House-Front/8.png";

import cardHolder1 from "../assets/ProductImages/Miscellaneous/CardHolder/acc1.png";
import cardHolder2 from "../assets/ProductImages/Miscellaneous/CardHolder/acc2.png";
import cardHolder3 from "../assets/ProductImages/Miscellaneous/CardHolder/acc3.png";
import cardHolder4 from "../assets/ProductImages/Miscellaneous/CardHolder/acc4.png";
import cardHolder5 from "../assets/ProductImages/Miscellaneous/CardHolder/acc5.png";

import stadium1 from "../assets/ProductImages/Stadiums/1.png";
import stadium2 from "../assets/ProductImages/Stadiums/2.png";
import stadium3 from "../assets/ProductImages/Stadiums/3.png";

import customization1 from "../assets/ProductImages/Miscellaneous/Customize/1.png";

export const heroImages: string[] = [
  houseFull7,
  houseFull6,
  houseFull8,
  houseFront8,
  cardHolder2,
  stadium1,
];

const commonCustomizations: KeyValueStringPairs[] = [
  { key: "Color of Holder", value: "" },
  { key: "Color of Letterings", value: "" },
  { key: "Custom Lettering (OR DM us your logo)", value: "" },
];

const Product1: Product = {
  name: "Model House - Full House",
  price: 175.0,
  shortDetails: [],
  options: [
    { option: "Extra Small Model (4in)", price: 175.0 },
    { option: "Smaller Model (6in)", price: 200.0 },
    { option: "Smaller Model (8in)", price: 250 },
    { option: "Medium Model (10in)", price: 275.0 },
    { option: "Large Mode (12in)", price: 350.0 },
    { option: "Extra Large (15in+)", price: 425 },
  ],
  details: [
    "Calling all HOME OWNERS, REALTORS, AND LOAN OFFICERS.This is the perfect opportunity to gift a 3D-printed version of a house just sold or bought. This unique gift will help you stand out from your competition and which makes you more likely to attract and retain customers.",
    "Model size varies. 6in maximum dimension - 16in maximum dimension in all directions. (If you would like something larger, please message us for a quote)",
    "If the model includes a higher level of detail, we will message you a quote with a final price. Prices vary from $175 - $450.",
    "his is a completely custom service, so you are paying for modeling of the structure, printing, regular updates, and excellent communication",
    "The printed houses are in color. However, colors are limited. We will send you the renderings of the house with the exact tone of colors that will be used. You can approve the colors at this step in the process.",
  ],
  images: [
    houseFull1,
    houseFull2,
    houseFull3,
    houseFull4,
    houseFull5,
    houseFull6,
    houseFull7,
    houseFull8,
  ],
  desc: "3D Printed Replica of Your House - Full House! Customized and Personalized Models, New Home, Personal Gift, Real Estate Agent",
  quantity: 1,
  id: 1,
  type: "Model-House",
  learnMoreLink: "/products/1",
};

const Product2: Product = {
  name: "Model House - Front Facade",
  price: 75.0,
  shortDetails: [],
  options: [
    { option: "House Only", price: 75.0 },
    { option: "Personalization Only", price: 80.0 },
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
  images: [cardHolder1, cardHolder2, cardHolder3, cardHolder4, cardHolder5],
  desc: "Personalize your Business card holder.",
  quantity: 1,
  id: 3,
  type: "Miscellaneous",
  learnMoreLink: "/products/3",
};

const Product4: Product = {
  name: "Custom Listing",
  price: 1,
  shortDetails: [],
  details: [
    "This is a listing for custom orders only. Choosing this option will be set between buyer and seller for details.",
    "Once we agree on your request you will receive the design via email within 24 hours.",
    "Please DO NOT purchase unless your request was already approved by me, thank you.",
    "This is a digital file, NO printed materials will be mailed or shipped to your address.Refunds cannot be provided after the delivery of digital images due to the nature of the product.",
    "This printable is for PERSONAL USE ONLY. Under no circumstances can these files be resold, altered, or given away. By purchasing this listing you agree to our Terms of Use.",
  ],
  images: [customization1],
  desc: "Custom Listing, Per Quote Sent by Us",
  quantity: 1,
  id: 4,
  type: "Miscellaneous",
  learnMoreLink: "/products/4",
};

const Product5: Product = {
  name: "Golden 1 Stadium",
  price: 135.0,
  shortDetails: [],
  options: [
    { option: "Stadium Only", price: 135.0 },
    { option: "Personalizations*", price: 150.0 },
  ],
  details: [
    "This well-detailed 3D printed model is the perfect gift, souvenir or collectible for every Sacramento Kings super fan. Looks fantastic on any desk, counter, dresser or stand. This stadium has a removable roof option to allow for a full view of the basketball court, along with a projection of the purple beam.",
    "The purple beam is lit up using purple LED fairy lights that are powered by 3 ea - AAA batteries (batteries are not included).",
    "**Custom/personalized labels are available for $15. Message me if interested and I will create a custom order.**",
    "Measurements: 6in x 6in x 3in (Beam projects 5in, making the total height 8in tall)",
    "Please keep in mind that every 3D-printed part is unique. The photos give a good representation of what to expect.",
  ],
  images: [stadium1, stadium2, stadium3],
  desc: "Golden 1 Center - Sacramento Kings 3D Printed Replica Stadium - Light The Beam Customization!",
  quantity: 1,
  id: 5,
  type: "Stadiums",
  learnMoreLink: "/products/5",
};

export const products: Product[] = [Product1, Product2, Product3, Product5, Product4];
