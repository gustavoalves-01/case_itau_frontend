'use client'

import { fetchWithApiKey } from '@/lib/http-utils'
import { createTransactionSchema, transactionResponseDto } from '@/schemas/transaction-schemas'
import { ApiResponse } from '@/types/apiResponse'
import { toast } from 'sonner'
import z from 'zod'

type TransactionsResponse = z.infer<typeof transactionResponseDto>
type CreateTransactionSchema = z.infer<typeof createTransactionSchema>

async function listTransactions(): Promise<ApiResponse<TransactionsResponse[]>> {
  try {
    const response = await fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transacoes`,
    )

    return response.json()
  } catch (error) {
    toast.error('Erro ao listar transações!')
    console.error('Erro ao listar transações:', error)
    return { success: false, message: 'Erro ao listar transações' }
  }
}

async function listCustomerTransaction(customerId: number): Promise<ApiResponse<TransactionsResponse[]>> {
  try {
    const response = await fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transacoes/cliente/${customerId}`,
    )

    return response.json()
  } catch (error) {
    toast.error('Erro ao buscar transações do cliente!')
    console.error('Erro ao buscar transações do cliente:', error)
    return { success: false, message: 'Erro ao buscar transações do cliente' }
  }
}

async function getTransaction(id: number): Promise<ApiResponse<TransactionsResponse>> {
  try {
    const response = await fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transacoes/${id}`,
    )
    
    return response.json()
  } catch (error) {
    toast.error('Erro ao buscar transação!')
    console.error('Erro ao buscar transação:', error)
    return { success: false, message: 'Erro ao buscar transação' }
  }
}

async function createTransaction(
  data: CreateTransactionSchema,
): Promise<void> {
  try {
    const parsedData = createTransactionSchema.parse(data)

    const response = await fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transacoes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      },
    )

    const result = await response.json() 

    if (result.success) {
      toast.success('Transação criada com sucesso!')
    } else {
      const errorMessage = result.message || result.error || 'Erro desconhecido ao criar transação'
      toast.error(`Erro ao criar transação: ${errorMessage}`)
    }
  } catch (error) {
    toast.error('Erro ao criar Transação!')
    console.error('Erro ao criar Transação:', error)
  }
}

export type { TransactionsResponse, CreateTransactionSchema }
export { listTransactions, listCustomerTransaction, getTransaction, createTransaction }
