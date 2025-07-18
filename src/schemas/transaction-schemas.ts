import z from "zod";

export const transactionTypeEnum = z.enum(['DEPOSIT', 'WITHDRAWAL']);

export const createTransactionSchema = z.object({
  customerId: z.number().int(),
  type: transactionTypeEnum,
  amount: z.number()
})

export const transactionResponseDto = z.object({
  id: z.number().int(),
  customerId: z.number().int(),
  type: transactionTypeEnum,
  amount: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
