const orderPlacement = [
  "Select the product variation that you are purchasing.",
  "Upload your photo through the provided link or email address. Please make sure to follow any photo guidelines to ensure the best quality print.",
  "To personalize your house with text underneath, please add what you would like personalized in the personalization section. 100-character limit.",
];

const orderProcessing = [
  "Upload photos of the house. (see details below)",
  "We'll review your photos and reach out to you if it's not sufficient for modeling. We may ask for a higher-quality photo or suggest an alternative image/angles that will work better.",
  "Once we've received a suitable image, we'll produce a rendering of how the finished product will come out for you to approve.",
  "Once the rendering is approved we will begin production of the final product to ship to you. This process typically takes several days to weeks, so be sure to check the estimated delivery date provided when you place the order.",
];

const photoGuidelines = [
  "Choose a high-resolution photo of all important angles.",
  "Ensure the subject is centered and in focus.",
];

const howToUploadPhoto = [
  "You can upload it through our Google form --> https://forms.gle/YVNVY2w3wCk7m8gD6",
  "You can also send us the photos by email (print3Dverse@gmail.com) or through Etsy Message.",
  "You can upload it through our website --> https://www.print3Dverse.com/upload-image",
];

const returnPolicy = [
  "Our custom houses are personalized to your preferences, so unfortunately, we are unable to accept returns or offer refunds.",
  "However, if there is a production defect, please contact us and we'll be happy to provide a free replacement.",
];

// Shown on the product page under "How ordering works". `ordered` groups
// are sequential steps and render as a numbered list.
export const fullDetailedDetails: { title: string; ordered: boolean; items: string[] }[] = [
  { title: "Placing your order", ordered: true, items: orderPlacement },
  { title: "What happens next", ordered: true, items: orderProcessing },
  { title: "Photo guidelines", ordered: false, items: photoGuidelines },
  { title: "Sending us your photos", ordered: false, items: howToUploadPhoto },
  { title: "Returns", ordered: false, items: returnPolicy },
];

export const initialUserValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
};

export const reviewTexts = [
  {
    name: "Molly",
    date: "Dec 28, 2023",
    review:
      "Our order turned out amazing and our shipping was expedited by the store owner to get to us in time. Would definitely recommend - it is such a special keepsake for my mom!",
    id: 2,
  },
  {
    name: "Cheyenne",
    date: "Mar 15, 2024",
    review: "Great price and product.",
    id: 1,
  },
  {
    name: "Alexa",
    date: "Aug 25, 2022",
    review:
      "Seller communicated very well throughout the entire process and made sure I gave the ok to everything before making it. Turned out just the way I imagined! There was a little bit of product build up at the end of the design, but other than that, I absolutely love it. Can't wait to give it to my boyfriend for his birthday!",
    id: 5,
  },
  {
    name: "Eddie",
    date: "Sep 2, 2022",
    review:
      "This is awesome to show off my cards on the page! The detail is amazing! Glad to have found such a great source!",
    id: 6,
  },
  {
    name: "Jaclyn",
    date: "Nov 13, 2023",
    review:
      "Couldn't be happier! I was worried that my idea wouldn't fit, but they were able to work with me to get exactly what I wanted. Thank you for being patient and working hard to make this perfect",
    id: 3,
  },
  {
    name: "Tyler",
    date: "Dec 8, 2023",
    review:
      "The communication and overall customer service experience was outstanding. Christian was incredibly accommodating in helping me with an issue and went above and beyond to get it resolved. Great product very happy. Thank you",
    id: 4,
  },
];

export const companyName = "Print3Dverse";
export const companyTagline =
  "Bringing innovation to life with advanced 3D printing";
