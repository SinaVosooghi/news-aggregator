import { APIError } from '@src/lib/api/shared/types';
import { Article } from '@src/lib/services/types';

export interface IAPIService {
  searchArticles: (
    params: SearchParams,
    totalResults?: TotalResult
  ) => Promise<SearchResponse>;
  getSearchCategories: () => Promise<string[]>;
}

export interface SearchParams {
  page: number;
  keyword?: string;
  from?: string; // ISO 8601 format
  to?: string; // ISO 8601 format
  category?: string[];
  source?: string[];
  author?: string[];
}

export interface SearchResponse {
  articles: Article[];
  totalResults: TotalResult;
  errors: APIError[];
}

export interface SearchFilters {
  sources: string[];
  categories: string[];
}

export type TotalResult = {
  nytimes?: number;
  newsapi?: number;
  gaurdian?: number;
};
