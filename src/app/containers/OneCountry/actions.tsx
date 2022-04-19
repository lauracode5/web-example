import { createAction } from '@reduxjs/toolkit';

// pulling in id from the country (see OneCountry/index.tsx; let { id } = useParams<OneCountryParams>();)
// then sending it as part of the payload in 'FETCH_COUNTRY_REQUEST' - LAU
const fetchCountry = createAction(
  'FETCH_COUNTRY_REQUEST',
  countryId => { // declaring the parameter - LAU
    return {
      payload: {
        countryId,
      }
    }
  }
);

const fetchCountrySuccess = createAction(
  'FETCH_COUNTRY_SUCCESS',
  country => {
    return {
      payload: {
        country,
      },
    };
  },
);

const fetchCountryError = createAction('FETCH_COUNTRY_ERROR', error => {
  return {
    payload: {
      error,
    },
  };
});

export const actions = {
  fetchCountry,
  fetchCountrySuccess,
  fetchCountryError,
};
