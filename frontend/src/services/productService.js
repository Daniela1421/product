import api from "@/lib/api";

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const createProduct = async (product) => {
  const res = await api.post("/products", product);
  return res.data;
};

export const updateProduct = async (id, updates) => {
  const res = await api.put(`/products/${id}`, updates);
  return res.data;
};

export const deleteProduct = async (id) => {
  console.log("id", id)
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
