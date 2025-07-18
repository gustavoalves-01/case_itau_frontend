import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "./ui/dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon } from "lucide-react";
import { MoneyInput } from "./MoneyInput";
import { Button } from "./ui/button";
import { createTransaction, CreateTransactionSchema } from "@/services/transactionsService";
import { createTransactionSchema } from "@/schemas/transaction-schemas";
import { TabsList, TabsTrigger } from "./ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { listCustomers } from "@/services/customerService";


export function CreateTransactionDialog() {
  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: listCustomers,
  });

  const { handleSubmit, control, reset, formState: { errors, isDirty, isSubmitting } } = useForm<CreateTransactionSchema>({
    defaultValues: {
      type: 'DEPOSIT',
      customerId: 0,
      amount: 0,
    },
    resolver: zodResolver(createTransactionSchema),
  });

  const queryClient = useQueryClient();
  
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: CreateTransactionSchema) => {
    await createTransaction(data);
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["customers"] });
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg"><PlusIcon />Adicionar Transação</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
          <DialogDescription>
            Insira os dados da transação.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
         
          <div>
            <label className="block font-semibold mb-1" htmlFor="customerId">ID do Cliente</label>
            <Controller
              name="customerId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>

                <SelectContent>
                  {
                    isLoading ?
                    <Loader2 size={48} className="animate-spin text-primary" /> 
                    :
                      customers?.data?.map(customer => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>
                        {customer.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              )}
            />
            {errors.customerId && <span className="text-red-500 text-xs">{errors.customerId.message as string}</span>}
          </div>
          
          <div>
            <label className="block font-semibold mb-1" htmlFor="amount">Valor</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Tabs onValueChange={field.onChange} value={field.value}>
                  <TabsList>
                    <TabsTrigger value="DEPOSIT">Depositar</TabsTrigger>
                    <TabsTrigger value="WITHDRAWAL">Sacar</TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            />
            {!!errors && <span>{errors.amount?.message as string}</span>}  
          </div>


          <div>
            <label className="block font-semibold mb-1" htmlFor="amount">Valor</label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <MoneyInput {...field} />
              )}
            />
            {!!errors && <span>{errors.amount?.message as string}</span>}  
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
