import { MTGCard } from "@/components/Card";
import { ApiConfig, apiGet, useApiQuery } from "./base";

const MTG_API_BASE = "https://api.magicthegathering.io/v1";

// MTG API configuration
const mtgApiConfig: ApiConfig = {
  baseUrl: MTG_API_BASE,
  defaultHeaders: {
    Accept: "application/json",
  },
};

// Type definitions for MTG API responses
interface MTGApiCard {
  id: string;
  name: string;
  imageUrl?: string;
  manaCost?: string;
  type?: string;
  types?: string[];
  rarity?: string;
  set?: string;
  setName?: string;
  cmc?: number;
  colors?: string[];
  colorIdentity?: string[];
  text?: string;
  power?: string;
  toughness?: string;
}

interface MTGCardsResponse {
  cards: MTGApiCard[];
}

interface MTGCardQueryParams {
  page?: number;
  pageSize?: number;
  name?: string;
  set?: string;
  colors?: string;
  rarity?: string;
  type?: string;
}

// Transform MTG API card to our Card component format
const transformMTGCard = (apiCard: MTGApiCard): MTGCard => ({
  id: apiCard.id,
  name: apiCard.name,
  // Convert HTTP URLs to HTTPS for better security
  imageUrl: apiCard.imageUrl?.replace(/^http:\/\//, "https://"),
  manaCost: apiCard.manaCost,
  type: apiCard.type,
  rarity: apiCard.rarity,
  set: apiCard.set,
  setName: apiCard.setName,
});

// Fetch cards from MTG API using reusable apiGet function
const fetchCards = async (
  params: MTGCardQueryParams = {}
): Promise<MTGCard[]> => {
  // Set default page size to 20 for manageable loading
  const pageSize = params.pageSize || 20;
  const page = params.page || 1;

  const queryParams: Record<string, string | number> = {
    page,
    pageSize,
  };

  // Add other filters if provided
  if (params.name) queryParams.name = params.name;
  if (params.set) queryParams.set = params.set;
  if (params.colors) queryParams.colors = params.colors;
  if (params.rarity) queryParams.rarity = params.rarity;
  if (params.type) queryParams.type = params.type;

  const data = await apiGet<MTGCardsResponse>("/cards", {
    ...mtgApiConfig,
    params: queryParams,
  });

  // Filter out cards without images for better UX
  return data.cards.filter((card) => card.imageUrl).map(transformMTGCard);
};

// Fetch a single card by ID using reusable apiGet function
const fetchCardById = async (cardId: string): Promise<MTGCard> => {
  const data = await apiGet<{ card: MTGApiCard }>(
    `/cards/${cardId}`,
    mtgApiConfig
  );
  return transformMTGCard(data.card);
};

// React Query hooks using reusable base functions
export const useCards = (params: MTGCardQueryParams = {}) => {
  return useApiQuery(["cards", params], () => fetchCards(params), {
    staleTime: 5 * 60 * 1000, // 5 minutes - help with rate limiting
    gcTime: 10 * 60 * 1000, // 10 minutes cache time
  });
};

export const useCard = (cardId: string) => {
  return useApiQuery(["card", cardId], () => fetchCardById(cardId), {
    enabled: !!cardId,
    staleTime: 15 * 60 * 1000, // 15 minutes for individual cards
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
  });
};

// Export types for use in components
export type { MTGApiCard, MTGCardQueryParams };
