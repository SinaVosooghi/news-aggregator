// src/lib/redux/reducers/articleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResponse, SearchParams } from '@src/lib/services/interfaces';
import { handleData } from './articleUtils';

export type SearchFilter = {
  sources: string[];
  categories: string[];
};

export interface ArticleState {
  loading: boolean;
  data: SearchResponse;
  error: string | null;
  searchFilters: SearchFilter;
  hasMore: boolean;
  searchParams: SearchParams;
}

const initialState: ArticleState = {
  loading: false,
  data: {
    articles: [],
    totalResults: { gaurdian: 20, newsapi: 20, nytimes: 0 },
    errors: [],
  },
  searchFilters: { sources: [], categories: [] },
  error: null,
  hasMore: true,
  searchParams: {
    page: 1,
  },
};

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    searchArticlesRequest: (state, action: PayloadAction<SearchParams>) => {
      state.data = initialState.data;
      state.loading = true;
      state.hasMore = true;
      state.error = null;
      state.searchParams = action.payload;
    },
    searchArticlesSuccess: (state, action: PayloadAction<SearchResponse>) => {
      state.loading = false;
      const { data, hasMore, searchParams } = handleData(state, action, true);
      state.data = data;
      state.hasMore = hasMore;
      state.searchParams = searchParams;
    },
    searchArticlesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    initSearchFilters: (state) => {
      state.loading = true;
    },
    setSearchFilters: (state, action: PayloadAction<SearchFilter>) => {
      state.searchFilters = action.payload;
      state.loading = false;
    },
    fetchMoreArticlesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMoreArticlesSuccess: (
      state,
      action: PayloadAction<SearchResponse>
    ) => {
      state.loading = false;
      const { data, hasMore, searchParams } = handleData(state, action, false);
      state.data = data;
      state.hasMore = hasMore;
      state.searchParams = searchParams;
    },
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = { ...action.payload, page: 1 };
    },
  },
});

export const {
  searchArticlesRequest,
  searchArticlesSuccess,
  searchArticlesFailure,
  initSearchFilters,
  setSearchFilters,
  fetchMoreArticlesRequest,
  fetchMoreArticlesSuccess,
  setSearchParams,
} = articleSlice.actions;

export default articleSlice.reducer;
