import z from "zod";
import { transactionTypeEnum } from "../schemas/transaction-schemas";

type TransactionType = z.infer<typeof transactionTypeEnum>;

export const transactionTypeMap: Record<TransactionType, string> = {
  DEPOSIT: "Depósito",
  WITHDRAWAL: "Saque"
};

export function getTransactionType(type: TransactionType): string {
  return transactionTypeMap[type] || type;
}
