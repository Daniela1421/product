import { getProducts, getProductById, createProduct, updateProduct, removeProduct } from '../services/productService.js';

export function getAll(req, res) {
  res.json(getProducts());
}

export function getById(req, res) {
  const product = getProductById(Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
}

export function create(req, res) {
  const newProduct = createProduct(req.body);
  res.status(201).json(newProduct);
}

export function update(req, res) {
  const updated = updateProduct(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "Product not found" });
  res.json(updated);
}

export function remove(req, res) {
  const deleted = removeProduct(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.json(deleted);
}
