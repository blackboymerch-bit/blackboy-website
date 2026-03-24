
const DEFAULT_PRODUCTS = [
  {
    id: "royal-navy-senator",
    name: "Royal Navy Senator",
    category: "Royal",
    price: 185000,
    image: "assets/images/hero.jpg",
    short: "Signature silhouette with controlled luxury detailing.",
    description: "The signature Blackboy Royal piece built around the modern senator silhouette, disciplined tailoring, and premium navy-black-gold identity.",
    features: ["Structured chest paneling", "Tailored silhouette", "Luxury finishing", "Ceremony-ready"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "ivory-gold-senator",
    name: "Ivory Gold Senator",
    category: "Royal",
    price: 175000,
    image: "assets/images/shirt.png",
    short: "Ceremony-ready piece with softer elegance and premium trim.",
    description: "A lighter ceremonial interpretation of the Blackboy Royal system with a more refined, softer luxury tone.",
    features: ["Formal elegance", "Gold accents", "Premium trim", "Occasion wear"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "royal-tailored-trouser",
    name: "Royal Tailored Trouser",
    category: "Royal",
    price: 68000,
    image: "assets/images/pants.png",
    short: "Structured black trouser with side-button identity.",
    description: "A tailored trouser built to support Blackboy’s signature formal identity through shape, hardware, and controlled minimalism.",
    features: ["Tailored fit", "Gold side detail", "Black luxury base", "Formal styling"],
    sizes: ["30", "32", "34", "36", "38"]
  },
  {
    id: "bb-logo-hoodie",
    name: "BB Logo Hoodie",
    category: "Urban",
    price: 58000,
    image: "assets/images/campaign.png",
    short: "Premium heavy cotton hoodie with disciplined branding.",
    description: "An Urban line essential designed to keep branding cleaner while still feeling premium and commercial.",
    features: ["Heavy cotton", "Premium streetwear", "Minimal logo use", "Everyday luxury"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "urban-jogger-set",
    name: "Urban Jogger Set",
    category: "Urban",
    price: 82000,
    image: "assets/images/campaign.png",
    short: "Luxury casual set built for repeat wear and retail appeal.",
    description: "A complete Blackboy Urban set aimed at making the commercial side of the label look expensive instead of ordinary.",
    features: ["Matching set", "Soft premium fabric", "Street-luxury direction", "Retail-ready"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "varsity-jacket",
    name: "Varsity Jacket",
    category: "Urban",
    price: 95000,
    image: "assets/images/campaign.png",
    short: "Street-luxury outerwear with premium trims and cleaner logo use.",
    description: "An outerwear piece that pushes Blackboy Urban toward stronger youth-market relevance without losing discipline.",
    features: ["Outerwear", "Premium trims", "Urban line", "Logo restraint"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "atelier-senator",
    name: "Atelier Senator",
    category: "Atelier",
    price: 0,
    image: "assets/images/runway.png",
    short: "Experimental cut pushing the Blackboy silhouette into high fashion territory.",
    description: "A runway-level reinterpretation of the Blackboy senator silhouette created for editorial and fashion authority.",
    features: ["Runway piece", "Editorial styling", "Experimental cut", "Prestige line"],
    sizes: ["Made to order"]
  },
  {
    id: "couture-agbada",
    name: "Couture Agbada",
    category: "Atelier",
    price: 0,
    image: "assets/images/runway.png",
    short: "Prestige garment intended for editorial and fashion-week presentation.",
    description: "A couture-level agbada built for fashion week presence, campaign storytelling, and prestige positioning.",
    features: ["Couture", "Fashion week", "Prestige value", "Made to order"],
    sizes: ["Made to order"]
  }
];

function getProducts() {
  const stored = localStorage.getItem("blackboyProducts");
  if (!stored) {
    localStorage.setItem("blackboyProducts", JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem("blackboyProducts", JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
}

function saveProducts(products) {
  localStorage.setItem("blackboyProducts", JSON.stringify(products));
}

function formatNaira(value) {
  if (!value) return "POA";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
}

function getCart() {
  const stored = localStorage.getItem("blackboyCart");
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem("blackboyCart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, quantity = 1, size = "") {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, size, quantity });
  }
  saveCart(cart);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
    el.style.display = count ? "inline-flex" : "none";
  });
}

document.addEventListener("DOMContentLoaded", updateCartCount);
