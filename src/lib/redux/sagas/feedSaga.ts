import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SearchParams, SearchResponse } from '@src/lib/services/interfaces';
import { ArticleSearchService } from '@src/lib/services';
import {
  searchArticlesFailure,
  setSearchParams,
  searchArticlesSuccess,
} from '../reducers/articleReducer';
import {
  fetchPreferencesRequest,
  setPreferences,
} from '../reducers/feedReducer';

const articleSearchService = new ArticleSearchService();

function* setPreferencesSaga(action: {
  type: string;
  payload: Omit<SearchParams, 'page'>;
}) {
  yield put(setSearchParams({ ...action.payload, page: 1 }));
}

function* fetchPreferencesSaga() {
  const searchParams: Omit<SearchParams, 'page'> = yield select(
    (state) => state.feed.searchParams
  );

  try {
    const articles: SearchResponse = yield call(
      articleSearchService.searchArticles,
      { ...searchParams, page: 1 }
    );
    yield put(searchArticlesSuccess(articles));
  } catch (error: unknown) {
    yield put(searchArticlesFailure(error as string));
  }
}

export default function* watchFeed() {
  yield takeLatest(setPreferences.type, setPreferencesSaga);
  yield takeLatest(fetchPreferencesRequest.type, fetchPreferencesSaga);
}
