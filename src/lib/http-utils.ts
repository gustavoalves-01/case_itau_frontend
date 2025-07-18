export const parseQueryParameters = (
  filters: Record<string, string | undefined>,
) => {
  const queryParams = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value.trim() !== '') {
      queryParams.set(key, value)
    }
  })

  return queryParams.size > 0 ? `?${queryParams.toString()}` : ''
}

export const removeQueryParam = (
  searchParams: URLSearchParams,
  key: string,
) => {
  const params = new URLSearchParams(searchParams.toString())
  params.delete(key)
  return params
}


export async function fetchWithApiKey(input: RequestInfo, init?: RequestInit) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  
  if (!API_KEY) {
    throw new Error('API Key is not defined')
  }

  const headers = {
    ...init?.headers,
    'x-api-key': API_KEY,
  }
  return fetch(input, { ...init, headers })
}
