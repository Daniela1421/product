let products = [
  {
    id: 1,
    name: "Chaqueta de cuero",
    price: 89900,
    category: "Chaquetas",
    image: "https://picsum.photos/200?random=1",
    description: "Chaqueta clásica de mezclilla azul con botones al frente"
  },
  {
    id: 2,
    name: "Bolso para mujer",
    price: 120000,
    category: "Accesorios",
    image: "https://picsum.photos/200?random=2",
    description: "Bolso negro de cuero elegante para uso diario"
  },
  {
    id: 3,
    name: "Gorra urbana",
    price: 35000,
    category: "Gorras",
    image: "https://picsum.photos/200?random=3",
    description: "Gorra estilo urbano ajustable, ideal para el día a día"
  }
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
