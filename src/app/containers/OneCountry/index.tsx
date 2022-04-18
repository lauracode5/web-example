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

  const countries = useSelector(selectCountry);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCountry());
  }, [dispatch]);


  return (
    <PageWrapper>
      <h1>Country</h1>
      {isLoading && <LoadingIndicator small />}
      {countries?.length > 0 ? (
        <List>
          {countries.map(country => (
            // Country here is a styled component. See below.
            <Country key={country.id}>
              <Link to={`/country/${country.id}`}>{country.name}</Link>
            </Country>
          ))}
        </List>
      ) : error ? (
        <div>
          <ErrorText>{error}</ErrorText>
          <h1>New Error Page</h1>
        </div>
      ) : null}
    </PageWrapper>
  );
}

const Country = styled.li`
  color: blue;
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const List = styled.div``;
