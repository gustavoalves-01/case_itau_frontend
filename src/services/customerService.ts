'use client'

import { fetchWithApiKey } from '@/lib/http-utils'
import { createCustomerSchema, customerResponseDto, updateCustomerSchema } from '@/schemas/customer-schemas'
import { ApiResponse } from '@/types/apiResponse'
import { toast } from 'sonner'
import z from 'zod'

type CustomersResponse = z.infer<typeof customerResponseDto>
type CreateCustomerSchema = z.infer<typeof createCustomerSchema>
type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>

async function listCustomers(): Promise<ApiResponse<CustomersResponse[]>> {
  try {
    const response = await fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/clientes`,
    )

    return response.json()
  } catch (error) {
    toast.error('Erro ao listar clientes!')
    console.error('Erro ao listar clientes:', error)
    return { success: false, message: 'Erro ao listar clientes' }
  }
}

async function getCustomer(id: number): Promise<ApiResponse<CustomersResponse>> {
  try {
    const response = await fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/clientes/${id}`,
    )
    
    return response.json()
  } catch (error) {
    toast.error('Erro ao buscar cliente!')
    console.error('Erro ao buscar cliente:', error)
    return { success: false, message: 'Erro ao buscar cliente' }
  }
}

async function createCustomer(
  data: CreateCustomerSchema,
): Promise<void> {
  try {
    const parsedData = createCustomerSchema.parse(data)

    const response = await fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/clientes`,
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
      toast.success('Cliente criado com sucesso!')
    } else {
      toast.error(result.message || 'Erro ao criar cliente!')
    }
  } catch (error) {
    toast.error('Erro ao criar cliente!')
    console.error('Erro ao criar cliente:', error)
  }
}

async function updateCustomer(
  id: number,
  data: UpdateCustomerSchema,
): Promise<void> {
  try {
    const response = await fetchWithApiKey(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/clientes/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )

    const result = await response.json() 

    if (result.success) {
      toast.success('Cliente atualizado com sucesso!')
    }
  } catch (error) {
    toast.error('Erro ao atualizar cliente!')
    console.error('Erro ao atualizar cliente:', error)
  }
}

async function deleteCustomer(id: number): Promise<void> {
  try {
    const response = await fetchWithApiKey(`${process.env.NEXT_PUBLIC_API_BASE_URL}/clientes/${id}`, {
      method: 'DELETE',
    })
    const result = await response.json() 

    if (result.success) {
      toast.success('Cliente excluído com sucesso!')
    }
  } catch (error) {
    toast.error('Erro ao excluir cliente!')
    console.error('Erro ao excluir cliente:', error)
  }
}

export type { CustomersResponse, CreateCustomerSchema, UpdateCustomerSchema }
export { listCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer }
