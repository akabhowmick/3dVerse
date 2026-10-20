import { KeyValueStringPairs } from "../Types/interfaces";

export const links: KeyValueStringPairs[] = [
  { key: "Replica Houses", value: "/model-houses" },
  { key: "Miscellaneous", value: "/miscellaneous" },
  { key: "Contact Us", value: "/contact-us" },
];

// Product `type` -> the category page that lists it (mirrors the
// ProductPage routes in Router.tsx). Used for card tags and breadcrumbs.
const categories: Record<string, { label: string; href: string }> = {
  "Model-House": { label: "Replica Houses", href: "/model-houses" },
  Miscellaneous: { label: "Miscellaneous", href: "/miscellaneous" },
  Stadiums: { label: "Stadiums", href: "/stadiums" },
};

export const categoryFor = (type: string) => categories[type];
