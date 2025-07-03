let products = [
  {
    id: 1,
    name: "Chaqueta de cuero",
    price: 89900,
    category: "Chaquetas",
    image: "https://picsum.photos/200?random=1",
    description: "Chaqueta de cuero negra con cierre frontal y bolsillos laterales."
  },
  {
    id: 2,
    name: "Bolso para mujer",
    price: 120000,
    category: "Accesorios",
    image: "https://picsum.photos/200?random=2",
    description: "Bolso elegante de cuero sintético ideal para ocasiones formales."
  },
  {
    id: 3,
    name: "Gorra urbana",
    price: 35000,
    category: "Gorras",
    image: "https://picsum.photos/200?random=3",
    description: "Gorra negra ajustable con diseño moderno y juvenil."
  },
  {
    id: 4,
    name: "Tenis deportivos",
    price: 145000,
    category: "Calzado",
    image: "https://picsum.photos/200?random=4",
    description: "Tenis cómodos y ligeros para correr o caminar a diario."
  },
  {
    id: 5,
    name: "Camiseta básica",
    price: 29000,
    category: "Ropa",
    image: "https://picsum.photos/200?random=5",
    description: "Camiseta blanca de algodón 100% con cuello redondo."
  },
  {
    id: 6,
    name: "Reloj digital",
    price: 99000,
    category: "Accesorios",
    image: "https://picsum.photos/200?random=6",
    description: "Reloj digital resistente al agua con correa de goma."
  },
];

export function getProducts() { return products; }

export function getProductById(id) { return products.find(p => p.id === id); }

export function createProduct(data) {
  const newProduct = { ...data, id: Date.now() };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(id, data) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data };
  return products[index];
}

export function removeProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  return products.splice(index, 1)[0];
}
