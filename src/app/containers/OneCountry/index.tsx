import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { saga } from './saga';
import { key, countryReducer } from './reducer';
import { actions } from './actions';
import { selectCountry, selectLoading, selectError } from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { Link } from 'app/components/Link';
import { PageWrapper } from 'app/components/PageWrapper';

export function OneCountry() {
  useInjectReducer({ key: key, reducer: countryReducer });
  useInjectSaga({ key: key, saga });

  const country = useSelector(selectCountry);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCountry());
  }, [dispatch]);

  // console.log('COUNTRY::::', country);
  // console.log("COUNTRY NAME::::", country.name);
  // console.log("COUNTRY CURRENCY CODE::::", country.currency_code);

  return (
    <PageWrapper>
      <h1>Country Information</h1>
      <p>Country Name: {country.name}</p>
      <p>Country Currency Code: {country.currency_code}</p>
    </PageWrapper>
  );
}

// const Country = styled.li`
//   color: blue;
// `;

// const ErrorText = styled.span`
//   color: ${p => p.theme.text};
// `;

// const List = styled.div``;
