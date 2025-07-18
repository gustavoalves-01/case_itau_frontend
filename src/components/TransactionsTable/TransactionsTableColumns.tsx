"use client"
 
import { getTransactionType } from "@/lib/transactionTypeMapper"
import { TransactionsResponse } from "@/services/transactionsService"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<TransactionsResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customerId",
    header: "ID do Cliente",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => getTransactionType(row.original.type),
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "createdAt",
    header: "Data",
  },
]