import { Autocomplete, CurrentConditions, FiveDaysForecasts, Favorite } from '../weather';

export interface WeatherState {
  autocompletedList?: Autocomplete[];
  currentConditions?: CurrentConditions[];
  fiveDaysForecasts?: FiveDaysForecasts;
  favoritesList?: Favorite[];
  currentLocationKey?: string | null;
  error?: string;
}

/* Initial Weather state */
export const initialState: WeatherState = {
  autocompletedList: [
    {
      Key: '215854',
      LocalizedName: 'Tel Aviv',
    },
  ],
  currentConditions: [],
  fiveDaysForecasts: null,
  favoritesList: [],
  currentLocationKey: null,
  error: '',
};

export interface ViewModel extends WeatherState {
  selectedLocation: Autocomplete;
}
