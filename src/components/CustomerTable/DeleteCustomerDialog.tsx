import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { CustomersResponse, deleteCustomer } from "@/services/customerService";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface CustomerDialogProps {
  customer: CustomersResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCustomerDialog({ customer, open, onOpenChange }: CustomerDialogProps) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const onConfirmDelete = async () => {
    setIsLoading(true);
    await deleteCustomer(customer.id)
    queryClient.invalidateQueries({ queryKey: ["customers"] });
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    onOpenChange(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Cliente</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita. As transações associadas a este cliente também serão removidas.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 w-full">
          <Button
            className="flex-1"
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1"
            type="submit"
            variant="destructive"
            onClick={onConfirmDelete}
            disabled={isLoading}
          >
            { 
            isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Excluir"
            )}   
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
