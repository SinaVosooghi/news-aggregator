import { all } from 'redux-saga/effects';
import watchArticleSearch from './articleSaga';
import watchFeed from './feedSaga';

export default function* rootSaga() {
  yield all([watchArticleSearch(), watchFeed()]);
}
