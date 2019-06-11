import { all } from 'redux-saga/effects';
import { watchYieldArticles } from './articles';

export default function* rootSaga() {
    yield all([watchYieldArticles()]);
}
