export const SITE_CONFIG = {
  name: "Mederi Karya Indonesia",
  description:
    "Supplier Industrial Automation Parts - PLC, HMI, VFD, Safety Relay, Power Meter",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mederikaryaindonesia.com",
  company: {
    name: "Mederi Karya Indonesia",
    phone: "+62-852-1006-7755",
    email: "iqbalya25@gmail.com",
    address: "Bekasi, Indonesia",
  },
  pricing: {
    showPrices: false,
    defaultPricetext: "Hubungi untuk harga terbaik",
    contactForQoute: "Contact for competitive pricing",
  },
};

export const PRODUCT_CATEGORIES = [
  {
    slug: "plc",
    name: "PLC (Programmable Logic Controller",
    description:
      "Industrial Automation Controller From Mitsubishi, Omron, Siemens",
  },
  {
    slug: "hmi",
    name: "HMI (Human Machine Interface)",
    description:
      "Touch panels and operator interfaces - Proface, Weintek, Siemens, Delta",
  },
  {
    slug: "vfd",
    name: "VFD (Variable Frequency Drive)",
    description: "Motor speed controllers and inverters",
  },
  {
    slug: "safety-relay",
    name: "Safety Relay",
    description: "Industrial Safety Relay - Pilz, Phoenix Contact, Sick",
  },
  {
    slug: "power-meter",
    name: "Power Meter",
    description:
      "Energy monitoring and power analyzers - Scneider, ABB, Phoenix Contact",
  },
];

export const BRANDS = [
  "Mitsubishi",
  "Omron",
  "Siemens",
  "Allen Bradley",
  "Schneider",
  "ABB",
  "Delta",
  "Proface",
  "Weintek",
  "Pilz",
  "Phoenix Contact",
  "Sick",
  "Pepperl+Fuchs",
  "Banner",
  "Keyence",
];

