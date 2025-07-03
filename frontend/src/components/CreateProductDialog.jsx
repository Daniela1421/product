import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";

export const CreateProductDialog = ({ onProductCreated }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">+ Agregar producto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Nuevo producto</DialogTitle>
        <ProductForm onSaved={onProductCreated} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
