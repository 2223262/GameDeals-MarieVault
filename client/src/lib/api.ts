import { Deal, DealParams, Store } from "@/types/cheapshark";

const BASE_URL = "https://www.cheapshark.com/api/1.0";
const DEFAULT_TIMEOUT = 8000; // 8 seconds

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

class ApiError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  const { timeout = DEFAULT_TIMEOUT, retries = 1, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: options.signal || controller.signal,
    });
    
    clearTimeout(id);
    
    if (!response.ok) {
      throw new ApiError(`API Error: ${response.statusText}`, response.status);
    }
    
    return response;
  } catch (error: any) {
    clearTimeout(id);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    
    if (retries > 0 && error.name !== 'AbortError') {
      console.log(`Retrying... (${retries} attempts left)`);
      return fetchWithRetry(url, { ...options, retries: retries - 1 });
    }
    
    throw error;
  }
}

export const api = {
  getDeals: async (params: DealParams, signal?: AbortSignal): Promise<Deal[]> => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const response = await fetchWithRetry(`${BASE_URL}/deals?${queryParams.toString()}`, { signal });
    const data = await response.json();
    
    // Normalize data (sometimes API returns object with data property, sometimes array)
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },
  
  getStores: async (signal?: AbortSignal): Promise<Store[]> => {
    const response = await fetchWithRetry(`${BASE_URL}/stores`, { signal });
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  },
  
  getTotalPages: async (params: DealParams, signal?: AbortSignal): Promise<number> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const response = await fetchWithRetry(`${BASE_URL}/deals?${queryParams.toString()}`, { signal });
    const totalPages = response.headers.get('X-Total-Page-Count');
    return totalPages ? parseInt(totalPages, 10) : 0;
  }
};
