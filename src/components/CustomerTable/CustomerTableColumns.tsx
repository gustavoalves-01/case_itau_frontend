"use client"
 
import { CustomersResponse } from "@/services/customerService"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<CustomersResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "balance",
    header: "Saldo",
  },
]