import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { getCustomer } from "@/services/customerService";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/services/transactionsService";
import { Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

interface CustomerDialogProps {
  transactionId: number;
  customerId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewTransactionDialog({ transactionId, customerId, open, onOpenChange }: CustomerDialogProps) {
  const { data: transaction, isLoading: isLoadingTransaction, error: errorTransaction } = useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransaction(transactionId),
    enabled: open,
  });

  const { data: customer, isLoading: isLoadingCustomer, error: errorCustomer } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomer(customerId),
    enabled: open,
  });


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transação</DialogTitle>
          <DialogDescription>
            Visualize os detalhes da transação.
          </DialogDescription>
        </DialogHeader>
        { 
          transaction?.data?.type === 'DEPOSIT' ? (
            <Badge>Depósito</Badge>
          ) : transaction?.data?.type === 'WITHDRAWAL' ? (
            <Badge variant="destructive">Saque</Badge>
          ) : null
        }
        <div className="flex justify-center w-full">
          {isLoadingCustomer && <Loader2 size={48} className="animate-spin text-primary" />}
          {errorCustomer && <div className="text-red-800 text-2xl font-light">Ocorreu erro ao carregar dados do cliente.</div>}
        </div>
        
        {customer && (
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Dados do Cliente</h3>
            <p><strong>ID:</strong> {customer.data?.id}</p>
            <p><strong>Nome:</strong> {customer.data?.name}</p>
            <p><strong>Email:</strong> {customer.data?.email}</p>
          </div>
        )}
         <div className="flex justify-center w-full">
          {isLoadingTransaction && <Loader2 size={48} className="animate-spin text-primary"/>}
          {errorTransaction && <div className="text-red-800 text-2xl font-light">Ocorreu erro ao carregar dados da transação.</div>}
        </div>
        {transaction && (
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Dados da Transação</h3>
            <p><strong>ID:</strong> {transaction.data?.id}</p>
            <p><strong>Valor:</strong> {transaction.data?.amount}</p>
            <p><strong>Data:</strong> {transaction.data?.createdAt}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
