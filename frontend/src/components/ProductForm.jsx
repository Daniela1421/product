import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/services/productService";

export const ProductForm = ({ product = null, onSaved, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        image: product.image || "",
        description: product.description || "",
      });
    } else {
      reset({
        name: "",
        price: "",
        image: "",
        description: "",
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
      };

      if (product?.id) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
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
        <Label htmlFor="name" className="mb-2 block">Nombre</Label>
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
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price" className="mb-2 block">Precio</Label>
        <Input
          id="price"
          type="number"
          step="1"
          {...register("price", {
            required: "El precio es obligatorio",
            valueAsNumber: true,
            validate: (v) => {
              if (isNaN(v)) return "El precio debe ser un número";
              if (v <= 0) return "Debe ser mayor que 0";
              return true;
            },
          })}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image" className="mb-2 block">Imagen (URL)</Label>
        <Input
          id="image"
          {...register("image", {
            required: "La URL de la imagen es obligatoria",
            pattern: {
              value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
              message: "Debe ser una URL válida"
            },
          })}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description" className="mb-2 block">Descripción</Label>
        <Textarea
          id="description"
          rows={3}
          {...register("description", {
            required: "La descripción es obligatoria",
            minLength: {
              value: 10,
              message: "Debe tener al menos 10 caracteres",
            },
          })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {product ? "Actualizar" : "Guardar"}
      </Button>
    </form>
  );
};
