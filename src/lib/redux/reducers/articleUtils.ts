import { PayloadAction } from '@reduxjs/toolkit';
import { ArticleState } from './articleReducer';
import { SearchResponse } from '@src/lib/services/interfaces';

export const handleData = (
  state: ArticleState,
  action: PayloadAction<SearchResponse>,
  isFirstCall: boolean
) => {
  const data = {
    articles: [
      ...(isFirstCall ? [] : state.data.articles),
      ...action.payload.articles,
    ],
    totalResults: isFirstCall
      ? action.payload.totalResults
      : state.data.totalResults,
    errors: [],
  };
  const hasMore =
    state.searchParams.page * 10 <
    Math.max(...Object.values(data.totalResults));
  const searchParams = {
    ...state.searchParams,
    page: state.searchParams.page + 1,
  };

  return { data, hasMore, searchParams };
};
