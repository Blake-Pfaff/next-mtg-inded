// Re-export base query functions for general use
export {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  useApiMutation,
  useApiQuery,
  useDelete,
  useGet,
  usePost,
  usePut,
} from "./base";

// Re-export MTG-specific functions
export { useCard, useCards } from "./mtg";

// Re-export types
export type { ApiConfig } from "./base";
export type { MTGApiCard, MTGCardQueryParams } from "./mtg";
