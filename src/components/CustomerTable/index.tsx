'use client'

import { CustomersResponse } from "@/services/customerService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { EditCustomerDialog } from "./EditCustomerDialog";
import { Trash, Edit, ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { columns } from "./CustomerTableColumns";
import { DeleteCustomerDialog } from "./DeleteCustomerDialog";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface CustomerTableProps {
  customers: CustomersResponse[]
}

export const CustomerTable = ({ customers }: CustomerTableProps) => {
  const [openEditDialogId, setOpenEditDialogId] = useState<number | null>(null);
  const [openDeleteDialogCustomer, setOpenDeleteDialogCustomer] = useState<CustomersResponse | null>(null);
  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="flex items-center justify-end gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={() => setOpenEditDialogId(row.original.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Editar cliente
                    </TooltipContent>
                  </Tooltip>
                
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/transacoes?customer=${row.original.id}`}>
                        <Button variant="ghost">
                          <ArrowRightLeft className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      Ver transações
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" onClick={() => setOpenDeleteDialogCustomer(row.original)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Excluir cliente
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum cliente cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {openEditDialogId !== null && (
        <EditCustomerDialog
          customerId={openEditDialogId}
          open={openEditDialogId !== null}
          onOpenChange={(open) => setOpenEditDialogId(open ? openEditDialogId : null)}
        />
      )}
      {openDeleteDialogCustomer !== null && (
        <DeleteCustomerDialog
          customer={openDeleteDialogCustomer}
          open={openDeleteDialogCustomer !== null}
          onOpenChange={(open) => setOpenDeleteDialogCustomer(open ? openDeleteDialogCustomer : null)}
        />
      )}
    </>
  );
}