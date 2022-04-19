import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './actions';

export function* fetchCountry() {
  const requestURL = `https://api.carerev.com/api/v1/countries/4040f18e-84e2-4322-b41f-b2160c594406`; // TODO: Make the ID dynamic

  try {
    const country = yield call(request, requestURL);
    console.log('saga country:::', country);
    if (Object.keys(country).length > 0) {
      yield put(actions.fetchCountrySuccess(country));
    } else {
      yield put(actions.fetchCountryError('No country found Else branch.'));
    }
  } catch (err) {
    yield put(actions.fetchCountryError(err.toString()));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* saga() {
  yield takeLatest(actions.fetchCountry.type, fetchCountry);
}
