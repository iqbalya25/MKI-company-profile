export const SITE_CONFIG = {
  name: "Mederi Karya Indonesia",
  description:
    "Supplier Automation Parts + Technical Support - PLC, HMI, Inverter, Safety Relay dengan Engineering Services Indonesia",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mederikaryaindonesia.com",
  company: {
    name: "Mederi Karya Indonesia",
    phone: "+62-852-1006-7755",
    email: "iqbalya25@gmail.com",
    address: "Bekasi, Indonesia",
    tagline: "Engineering Excellence in Automation",
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
    name: "PLC (Programmable Logic Controller)",
    description:
      "Automation controller dengan technical support dan programming service - Mitsubishi, Omron, Siemens",
    keywords: [
      "jual plc",
      "supplier plc mitsubishi",
      "plc programming indonesia",
    ],
  },
  {
    slug: "inverter", // ✅ CHANGED FROM "vfd"
    name: "Inverter (Variable Frequency Drive)",
    description:
      "Pengontrol kecepatan motor dengan parameter setting dan commissioning - Schneider, ABB, Danfoss",
    keywords: [
      "jual inverter",
      "parameter setting inverter",
      "inverter schneider indonesia",
    ],
  },
  {
    slug: "hmi",
    name: "HMI (Human Machine Interface)",
    description:
      "Touch panel operator dengan configuration dan troubleshooting support - Proface, Weintek, Delta",
    keywords: [
      "hmi proface",
      "touchscreen industrial",
      "hmi configuration jakarta",
    ],
  },
  {
    slug: "power-meter",
    name: "Power Meter & Monitoring",
    description:
      "Energy monitoring devices dengan installation support - Schneider, ABB, Phoenix Contact",
    keywords: [
      "power meter schneider",
      "energy monitoring",
      "power analyzer indonesia",
    ],
  },
  {
    slug: "safety-relay",
    name: "Safety Relay & Emergency Stop",
    description:
      "Komponen keamanan industri dengan wiring consultation service - Pilz, Phoenix Contact, Sick",
    keywords: [
      "safety relay pilz",
      "emergency stop relay",
      "safety system indonesia",
    ],
  },
  {
    slug: "servo",
    name: "Servo Drives & Motor",
    description:
      "Pengontrol kecepatan motor presisi tinggi dengan parameter setting dan commissioning - Panasonic, Mitsubishi, Yaskawa",
    keywords: ["Servo Mitsubishi", "Servo Drive", "Servo Motor"],
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

export const TARGET_KEYWORDS = {
  primary: [
    "supplier automation parts indonesia",
    "jual inverter jakarta",
    "technical support plc",
    "parameter setting inverter",
    "supplier plc mitsubishi indonesia",
  ],
  secondary: [
    "hmi proface harga kompetitif",
    "troubleshooting automation jakarta",
    "engineering consultation plc",
    "safety relay pilz indonesia",
    "commissioning inverter service",
  ],
  longTail: [
    "cara setting parameter inverter schneider",
    "troubleshooting plc communication error",
    "supplier safety relay pilz indonesia",
    "parameter setting plc mitsubishi fx5u",
    "hmi proface gp4000 configuration",
  ],
};

export const SERVICES = [
  {
    slug: "technical-support",
    name: "Technical Support",
    description: "Engineering consultation dan troubleshooting support",
    icon: "Headphones",
  },
  {
    slug: "parameter-setting",
    name: "Parameter Setting",
    description: "Konfigurasi inverter, PLC programming, HMI setup",
    icon: "Settings",
  },
  {
    slug: "commissioning",
    name: "Commissioning Service",
    description: "Testing, startup, dan validation system automation",
    icon: "PlayCircle",
  },
  {
    slug: "training",
    name: "Training & Education",
    description: "Operator training dan technical knowledge transfer",
    icon: "GraduationCap",
  },
];

// 🎯 LOCATIONS (Local SEO)
export const LOCATIONS = [
  {
    city: "Jakarta",
    slug: "jakarta",
    description: "Supplier automation parts Jakarta dengan technical support",
  },
  {
    city: "Surabaya",
    slug: "surabaya",
    description:
      "Distributor industrial automation Surabaya - engineering services",
  },
  {
    city: "Bandung",
    slug: "bandung",
    description:
      "Automation parts supplier Bandung dengan consultation service",
  },
  {
    city: "Tangerang",
    slug: "tangerang",
    description: "Technical support automation Tangerang - parameter setting",
  },
];

// 📊 TRUST SIGNALS
export const TRUST_SIGNALS = [
  {
    title: "8+ Years Experience",
    description: "Pengalaman bertahun-tahun di industrial automation",
    icon: "Award",
  },
  {
    title: "Engineering Expertise",
    description: "Tim engineering dengan sertifikasi technical support",
    icon: "Cog",
  },
  {
    title: "Quality Products",
    description: "Produk berkualitas dengan competitive pricing",
    icon: "Shield",
  },
  {
    title: "Fast Response",
    description: "Response time cepat untuk consultation dan troubleshooting",
    icon: "Clock",
  },
  {
    title: "Local Support",
    description: "Technical support lokal dalam bahasa Indonesia",
    icon: "MapPin",
  },
  {
    title: "Custom Solutions",
    description: "Solusi automation sesuai kebutuhan spesifik industri",
    icon: "Wrench",
  },
];

export default {
  SITE_CONFIG,
  PRODUCT_CATEGORIES,
  BRANDS,
  TARGET_KEYWORDS,
  SERVICES,
  LOCATIONS,
  TRUST_SIGNALS,
};
