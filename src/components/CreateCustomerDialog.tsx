import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "./ui/dialog";
import { createCustomer, CreateCustomerSchema } from "@/services/customerService";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { createCustomerSchema } from "@/schemas/customer-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { MoneyInput } from "./MoneyInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


export function CreateCustomerDialog() {
  const { register, handleSubmit, control, reset, formState: { errors, isDirty, isSubmitting } } = useForm<CreateCustomerSchema>({
    defaultValues: {
      name: '',
      email: '',
      initialBalance: 0,
    },
    resolver: zodResolver(createCustomerSchema),
  });

  const queryClient = useQueryClient();
  
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: CreateCustomerSchema) => {    
    await createCustomer(data)
    queryClient.invalidateQueries({ queryKey: ["customers"] });
    setOpen(false);
  };  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg"><PlusIcon />Adicionar Cliente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>
            Insira os dados do cliente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="block font-semibold mb-1" htmlFor="name">Nome</label>
            <Input
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="email">Email</label>
            <Input
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="initialBalance">Saldo Inicial</label>
            <Controller
              name="initialBalance"
              control={control}
              render={({ field }) => (
                <MoneyInput {...field} />
              )}
            />
            {!!errors && <span>{errors.initialBalance?.message as string}</span>}  
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!isDirty || isSubmitting}
            >
              Criar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
