import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

// Base API configuration
interface ApiConfig {
  baseUrl?: string;
  defaultHeaders?: HeadersInit;
}

// Generic GET function
export const apiGet = async <T>(
  url: string,
  config?: ApiConfig & { params?: Record<string, string | number> }
): Promise<T> => {
  const baseUrl = config?.baseUrl || "";
  const searchParams = new URLSearchParams();

  // Add query parameters if provided
  if (config?.params) {
    Object.entries(config.params).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });
  }

  const fullUrl = `${baseUrl}${url}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...config?.defaultHeaders,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Generic POST function
export const apiPost = async <TData, TResponse>(
  url: string,
  data: TData,
  config?: ApiConfig
): Promise<TResponse> => {
  const baseUrl = config?.baseUrl || "";
  const fullUrl = `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...config?.defaultHeaders,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Generic PUT function
export const apiPut = async <TData, TResponse>(
  url: string,
  data: TData,
  config?: ApiConfig
): Promise<TResponse> => {
  const baseUrl = config?.baseUrl || "";
  const fullUrl = `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...config?.defaultHeaders,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Generic DELETE function
export const apiDelete = async <TResponse>(
  url: string,
  config?: ApiConfig
): Promise<TResponse> => {
  const baseUrl = config?.baseUrl || "";
  const fullUrl = `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...config?.defaultHeaders,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Reusable React Query hooks

/**
 * Generic useQuery hook with enhanced error handling and caching
 */
export const useApiQuery = <TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes default
    gcTime: 10 * 60 * 1000, // 10 minutes cache time
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};

/**
 * Generic useMutation hook for POST/PUT/DELETE operations
 */
export const useApiMutation = <TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  return useMutation({
    mutationFn,
    ...options,
  });
};

// Specific hooks for common patterns

/**
 * Hook for GET requests with automatic query key generation
 */
export const useGet = <TData = unknown>(
  endpoint: string,
  params?: Record<string, string | number>,
  config?: ApiConfig & {
    enabled?: boolean;
    staleTime?: number;
  }
) => {
  return useApiQuery(
    [endpoint, params],
    () => apiGet<TData>(endpoint, { ...config, params }),
    {
      enabled: config?.enabled,
      staleTime: config?.staleTime,
    }
  );
};

/**
 * Hook for POST requests
 */
export const usePost = <TData = unknown, TVariables = unknown>(
  endpoint: string,
  config?: ApiConfig,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  return useApiMutation(
    (variables: TVariables) =>
      apiPost<TVariables, TData>(endpoint, variables, config),
    options
  );
};

/**
 * Hook for PUT requests
 */
export const usePut = <TData = unknown, TVariables = unknown>(
  endpoint: string,
  config?: ApiConfig,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  return useApiMutation(
    (variables: TVariables) =>
      apiPut<TVariables, TData>(endpoint, variables, config),
    options
  );
};

/**
 * Hook for DELETE requests
 */
export const useDelete = <TData = unknown>(
  endpoint: string,
  config?: ApiConfig,
  options?: UseMutationOptions<TData, Error, string | number>
) => {
  return useApiMutation(
    (id: string | number) => apiDelete<TData>(`${endpoint}/${id}`, config),
    options
  );
};

// Export types for use in other files
export type { ApiConfig };
