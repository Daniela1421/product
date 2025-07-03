import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createProduct, updateProduct } from "@/services/productService";

export const ProductForm = ({ product = null, onSaved, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
    } else {
      reset();
    }
  }, [product, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (product?.id) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }
      reset();
      onSaved?.();
      onClose?.();
    } catch (err) {
      console.error("Error al guardar producto:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          {...register("name", {
            required: "El nombre del producto es obligatorio",
            minLength: {
              value: 3,
              message: "Debe tener al menos 3 caracteres",
            },
          })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="price">Precio</Label>
        <Input
          id="price"
          type="number"
          step="1000"
          {...register("price", {
            required: "El precio es obligatorio",
            valueAsNumber: true,
            validate: (v) => v > 0 || "Debe ser mayor que 0",
          })}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        {product ? "Actualizar" : "Guardar"}
      </Button>
    </form>
  );
};
