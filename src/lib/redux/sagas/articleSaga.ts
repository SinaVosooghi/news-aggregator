import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  SearchParams,
  SearchResponse,
  TotalResult,
} from '@src/lib/services/interfaces';
import { ArticleSearchService } from '@src/lib/services';
import {
  searchArticlesFailure,
  searchArticlesRequest,
  searchArticlesSuccess,
  initSearchFilters,
  setSearchFilters,
  SearchFilter,
  fetchMoreArticlesRequest,
  fetchMoreArticlesSuccess,
} from '../reducers/articleReducer';

const articleSearchService = new ArticleSearchService();

function* initSearchFiltersSaga() {
  const sources: SearchFilter = yield call(
    articleSearchService.getSearchFilters
  );

  yield put(setSearchFilters(sources));
}

function* searchArticlesSaga(action: { type: string; payload: SearchParams }) {
  try {
    const articles: SearchResponse = yield call(
      articleSearchService.searchArticles,
      action.payload
    );
    yield put(searchArticlesSuccess(articles));
  } catch (error: unknown) {
    yield put(searchArticlesFailure(error as string));
  }
}

function* fetchMoreArticlesSaga() {
  const totalResults: TotalResult = yield select(
    (state) => state.articles.data.totalResults
  );
  const searchParams: SearchParams = yield select(
    (state) => state.articles.searchParams
  );

  try {
    const articles: SearchResponse = yield call(
      articleSearchService.searchArticles,
      searchParams,
      totalResults
    );
    yield put(fetchMoreArticlesSuccess(articles));
  } catch (error: unknown) {
    yield put(searchArticlesFailure(error as string));
  }
}

export default function* watchArticleSearch() {
  yield takeLatest(searchArticlesRequest.type, searchArticlesSaga);
  yield takeLatest(initSearchFilters.type, initSearchFiltersSaga);
  yield takeLatest(fetchMoreArticlesRequest.type, fetchMoreArticlesSaga);
}
