import { CountriesState } from 'app/containers/Countries/types';
import { CountryState } from 'app/containers/OneCountry/types';
import { ThemeState } from 'styles/theme/types';

export interface RootState {
  theme?: ThemeState;
  countries?: CountriesState;
  country?: CountryState;
}


// this was difficult to figure out

