import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/services/productService";
import { ProductForm } from "./ProductForm";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formatCOP = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);

export const ProductCard = ({ product, onProductDeleted }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      onProductDeleted?.();
    } catch (error) {
      console.error("Error eliminando producto:", error.message);
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl py-0">
      <img
        src={product.image || "https://via.placeholder.com/400x200?text=Producto"}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div className="mb-3">
            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <p className="text-primary font-semibold text-base">
            {formatCOP(product.price)}
          </p>

          <div className="flex gap-2">
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">Editar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar producto</DialogTitle>
                </DialogHeader>
                <ProductForm
                  product={product}
                  onSaved={onProductDeleted}
                  onClose={() => setIsEditOpen(false)}
                />
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">Eliminar</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Sí, eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
