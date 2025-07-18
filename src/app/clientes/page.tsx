'use client'

import { CreateCustomerDialog } from "@/components/CreateCustomerDialog";
import { CustomerTable } from "@/components/CustomerTable";
import { listCustomers } from "@/services/customerService"
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function CustomersPage() {
  const { data: customers, isLoading, error } = useQuery({
    queryKey: ['customers'],
    queryFn: listCustomers,
  });

  return (
    <div className="container mx-auto px-4 py-16 gap-16 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-900">Lista de Clientes</h1>    
        <CreateCustomerDialog />
      </div>
      {
        customers?.data ?
          <CustomerTable customers={customers.data} />
        :
        <div className="flex justify-center w-full">
          {isLoading && <Loader2 size={48} className="animate-spin text-primary"/>}
          {error && <div className="text-red-800 text-2xl font-light">Ocorreu erro ao carregar clientes, tente novamente.</div>}
        </div>
      }   
    </div>
  );
};
