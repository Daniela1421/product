import { useEffect, useState } from "react";
import { ProductForm } from "@/components/ProductForm";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/services/productService";
import { CreateProductDialog } from "@/components/CreateProductDialog";


export default function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("products", products)

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Administración de Productos</h1>

      <CreateProductDialog onProductCreated={fetchProducts} />

      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 ? (
          <p className="text-center col-span-full text-muted-foreground">No hay productos registrados.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductDeleted={fetchProducts}
              onProduct={fetchProducts}
            />
          ))
        )}
      </div>
    </main>
  );
}
