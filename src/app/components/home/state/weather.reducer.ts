import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions';
import { Autocomplete, CurrentConditions, FiveDaysForecasts, Favorite } from '../weather';

export interface WeatherState {
  autocompletedList: Autocomplete[];
  currentConditions: CurrentConditions[];
  fiveDaysForecasts: FiveDaysForecasts[];
  favoritesList: Favorite[];
  currentLocationKey: string | null;
  error: string;
}

/* Initial Weather state */
const initialState: WeatherState = {
  autocompletedList: [
    {
      AdministrativeArea: {
        ID: 'TA',
        LocalizedName: 'Tel Aviv',
      },
      Country: {
        ID: 'IL',
        LocalizedName: 'Israel',
      },
      Key: '215854',
      LocalizedName: 'Tel Aviv',
      Rank: 31,
      Type: 'City',
      Version: 1,
    },
  ],
  currentConditions: [],
  fiveDaysForecasts: [],
  favoritesList: [],
  currentLocationKey: '215854',
  error: '',
};

export const weatherReducer = createReducer<WeatherState>(
  initialState,
  on(
    WeatherActions.setCurrentLocation,
    (state, action): WeatherState => {
      return {
        ...state,
        currentLocationKey: action.currentLocationKey,
      };
    }
  ),
  on(
    WeatherActions.filteredAutocompletedList,
    (state, action): WeatherState => {
      return {
        ...state,
        autocompletedList: state.autocompletedList.filter((l) => l.Key === action.currentLocationKey),
        error: '',
      };
    }
  ),
  on(
    WeatherActions.loadAutocompleteOnSuccess,
    (state, action): WeatherState => {
      return {
        ...state,
        autocompletedList: action.autocompletedList,
        error: '',
      };
    }
  ),
  on(
    WeatherActions.loadAutocompleteOnFailure,
    (state, action): WeatherState => {
      return {
        ...state,
        autocompletedList: [],
        error: action.err,
      };
    }
  ),
  on(
    WeatherActions.loadCurrentConditionsOnSuccess,
    (state, action): WeatherState => {
      return {
        ...state,
        currentConditions: action.currentConditions,
        error: '',
      };
    }
  ),
  on(
    WeatherActions.loadCurrentConditionsOnFailure,
    (state, action): WeatherState => {
      return {
        ...state,
        currentConditions: [],
        error: action.err,
      };
    }
  ),
  on(
    WeatherActions.loadFiveDaysForecastsOnSuccess,
    (state, action): WeatherState => {
      return {
        ...state,
        fiveDaysForecasts: action.fiveDaysForecasts,
        error: '',
      };
    }
  ),
  on(
    WeatherActions.loadAutocompleteOnFailure,
    (state, action): WeatherState => {
      return {
        ...state,
        fiveDaysForecasts: null,
        error: action.err,
      };
    }
  ),
  on(
    WeatherActions.addLocation,
    (state, action): WeatherState => {
      let updateList = Object.assign([], state.favoritesList);

      updateList.length < 5 ? updateList.unshift(action.location) : updateList.pop();

      return {
        ...state,
        favoritesList: updateList,
      };
    }
  )
);
