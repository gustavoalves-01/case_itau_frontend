'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import { columns } from "./TransactionsTableColumns";
import { TransactionsResponse } from "@/services/transactionsService";
import { ViewTransactionDialog } from "./ViewTransactionDialog";

interface TransactionsTableProps {
  transactions: TransactionsResponse[]
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const [openTransactionId, setOpenTransactionId] = useState<number | null>(null);
  const [openCustomerId, setOpenCustomerId] = useState<number | null>(null);

  const table = useReactTable({
    data: transactions,
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
                  <Button onClick={() => { 
                      setOpenTransactionId(row.original.id); 
                      setOpenCustomerId(row.original.customerId); 
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {openTransactionId !== null && openCustomerId !== null && (
        <ViewTransactionDialog
          transactionId={openTransactionId}
          customerId={openCustomerId}
          open={openTransactionId !== null}
          onOpenChange={(open) => setOpenTransactionId(open ? openTransactionId : null)}
        />
      )}
    </>
  );
}