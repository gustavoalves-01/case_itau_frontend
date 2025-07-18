import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { getCustomer, updateCustomer, UpdateCustomerSchema } from "@/services/customerService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCustomerSchema } from "@/schemas/customer-schemas";
import { Loader2 } from "lucide-react";

interface CustomerDialogProps {
  customerId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCustomerDialog({ customerId, open, onOpenChange }: CustomerDialogProps) {
  const { data: customer, isLoading, error } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomer(customerId),
    enabled: open,
  });

  const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm<UpdateCustomerSchema>({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: zodResolver(updateCustomerSchema),
  });

  useEffect(() => {
    if (customer && customer.data) {
      reset({
        name: customer.data.name || '',
        email: customer.data.email || '',
      });
    }
  }, [customer, reset]);

  const queryClient = useQueryClient();

  const onSubmit = async (data: UpdateCustomerSchema) => {
    await updateCustomer(customerId, data)
    queryClient.invalidateQueries({ queryKey: ["customers"] });
    queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogDescription>
            Altere os dados do cliente e salve as alterações.
          </DialogDescription>
        </DialogHeader>
         <div className="flex justify-center w-full">
          {isLoading && <Loader2 size={48} className="animate-spin text-primary"/>}
          {error && <div className="text-red-800 text-2xl font-light">Ocorreu erro ao carregar dados do cliente.</div>}
        </div>
        {customer && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="name">Nome</label>
              <Input
                id="name"
                disabled={isSubmitting}
                {...register("name")}
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="email">Email</label>
              <Input
                id="email"
                disabled={isSubmitting}
                {...register("email")}
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="balance">Saldo Atual</label>
              <Input
                id="balance"
                type="string"
                value={customer.data?.balance?.toString() || 'R$ 0,00'}
                readOnly
              />
            </div>
            <div className="flex flex-col text-sm text-gray-500">
              {
                customer.data?.createdAt && (
                  <span>Cliente criado em: {customer.data?.createdAt}</span>
                )
              }
              {
                customer.data?.updatedAt && (
                  <span>Última atualização: {customer.data?.updatedAt}</span>
                )
              }
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
              >
                Salvar
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
