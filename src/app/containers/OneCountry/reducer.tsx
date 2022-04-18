import { createReducer } from '@reduxjs/toolkit';
import { CountryState } from './types';

export const key = 'country';

export const initialState: CountryState = {
  country: [],
  error: undefined,
  isLoading: false,
};

export const countryReducer = createReducer(initialState, {
  FETCH_COUNTRY_REQUEST: (state, action) => {
    state.isLoading = true;
  },
  FETCH_COUNTRY_SUCCESS: (state, action) => {
    state.isLoading = false;
    state.country = action.payload.country;
  },
  FETCH_COUNTRY_ERROR: (state, action) => {
    state.isLoading = false;
    state.error = action.payload.error;
  },
});
