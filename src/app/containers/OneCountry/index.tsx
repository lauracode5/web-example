import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { saga } from './saga';
import { key, countryReducer } from './reducer';
import { actions } from './actions';
import { selectCountry, selectLoading, selectError } from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { Link } from 'app/components/Link';
import { PageWrapper } from 'app/components/PageWrapper';


type OneCountryParams = {
  id: string;
};

export function OneCountry() {
  // "id" is being pulled from the Route in app/index.tsx - /country/:id
  let { id } = useParams<OneCountryParams>();

  useInjectReducer({ key: key, reducer: countryReducer });
  useInjectSaga({ key: key, saga });

  const country = useSelector(selectCountry);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCountry(id));
  }, [dispatch]);

  // console.log('COUNTRY::::', country);
  // console.log("COUNTRY NAME::::", country.name);
  // console.log("COUNTRY CURRENCY CODE::::", country.currency_code);

  return (
    <PageWrapper>
      <h1>Country Information</h1>
      {isLoading ? <LoadingIndicator small />
      : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <CountryInfo>
          <p>Name: <CountryLabel>{country.name}</CountryLabel></p>
          <p>Country Currency Code: <CountryLabel>{country.currency_code}</CountryLabel></p>
        </CountryInfo>
      )}
    </PageWrapper>
  );
}

const CountryInfo = styled.div``;

const CountryLabel = styled.span`
  color: blue;
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;


