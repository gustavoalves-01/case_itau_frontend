import z from "zod";

export const createCustomerSchema = z.object({
  name: z.string(),
  email: z.email(),
  initialBalance: z.number()
})

export const updateCustomerSchema = z.object({
  name: z.string(),
  email: z.email()
})

export const customerResponseDto = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.email(),
  balance: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
