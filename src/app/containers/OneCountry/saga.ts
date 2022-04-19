import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './actions';

export function* fetchCountry(action) {
  // const requestURL = `https://api.carerev.com/api/v1/countries/4040f18e-84e2-4322-b41f-b2160c594406`; // TODO: Make the ID dynamic - LAU

  // making the ID dynamic - LAU
  const requestURL = `https://api.carerev.com/api/v1/countries/${action.payload.countryId}`;

  try {
    const country = yield call(request, requestURL,);
    
    // console.log('saga country:::', country); - LAU
    if (country.error_message) { 
      yield put(actions.fetchCountryError(country.error_message));
    } else {
      yield put(actions.fetchCountrySuccess(country));
    }
  } catch (err) {
    console.log(err.toString());
    yield put(actions.fetchCountryError('There was a network error while fetching the country information.'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* saga() {
  yield takeLatest(actions.fetchCountry.type, fetchCountry);
}
