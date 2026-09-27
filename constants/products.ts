export interface Product {
  name: string;
  /** Path under /public */
  logo: string;
  url: string;
  label: string;
  description: string;
}

// Products I've launched, newest first.
export const products: Product[] = [
  {
    name: "takeone",
    logo: "/products/takeone.svg",
    url: "https://takeone.atharva.codes",
    label: "Open source",
    description:
      "An open source SDK, CLI and agent skill for recording polished, Screen Studio style videos of web apps.",
  },
];
