'use client'

import { CreateTransactionDialog } from "@/components/CreateTransactionDialog";
import { TransactionsTable } from "@/components/TransactionsTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { listCustomers } from "@/services/customerService";
import { listCustomerTransaction, listTransactions } from "@/services/transactionsService";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function TransactionsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const customerIdParam = searchParams.get('customer');
  const customerId = customerIdParam ? Number(customerIdParam) : null;

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions', customerId],
    queryFn: () => customerId !== null ? listCustomerTransaction(customerId) : listTransactions(),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: listCustomers,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  
  return (
    <div className="container mx-auto px-4 py-16 gap-16 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-900">Lista de Transações</h1>    
        <CreateTransactionDialog />
      </div>
      <div className="flex items-center gap-2">
        <Select onValueChange={(value) => router.push(pathname + '?' + createQueryString('customer', value))} value={customerIdParam ?? ''}>
          <SelectTrigger className="w-1/3">
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
        <Button variant="outline" onClick={() => router.push(pathname)}>Limpar Filtro</Button>
      </div>
      {
        transactions?.data ?
          <TransactionsTable transactions={transactions.data} />
        :
        <div className="flex justify-center w-full">
          {isLoading && <Loader2 size={48} className="animate-spin text-primary"/>}
          {error && <div className="text-red-800 text-2xl font-light">Ocorreu erro ao carregar as transações, tente novamente.</div>}
        </div>
      }   
    </div>
  );
};
