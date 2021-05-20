import { createReducer, on } from '@ngrx/store';
import { WeatherState, initialState } from './weather.state';
import * as WeatherActions from '../actions';

export const weatherReducer = createReducer<WeatherState>(
  initialState,
  on(WeatherActions.setCurrentLocationKey, (state, action): WeatherState => {
    return {
      ...state,
      currentLocationKey: action.locationKey,
    };
  }),
  on(WeatherActions.addLocation, (state, action): WeatherState => {
    let updateList = Object.assign([], state.favoritesList);

    const found = state.favoritesList.find((item) => item.Key === action.location.Key);

    if (!found) {
      updateList.push(action.location);
    } else {
      const index = state.favoritesList.indexOf(found);
      if (index > -1) {
        updateList.splice(index, 1);
      }
    }
    return {
      ...state,
      favoritesList: updateList,
    };
  }),
  on(WeatherActions.loadAutocompleteOnSuccess, (state, action): WeatherState => {
    return {
      ...state,
      autocompletedList: action.autocompletedList,
      error: '',
    };
  }),
  on(WeatherActions.loadAutocompleteOnFailure, (state, action): WeatherState => {
    return {
      ...state,
      autocompletedList: [],
      error: action.err,
    };
  }),
  on(WeatherActions.loadCurrentConditionsOnSuccess, (state, action): WeatherState => {
    return {
      ...state,
      currentConditions: action.currentConditions,
      error: '',
    };
  }),
  on(WeatherActions.loadCurrentConditionsOnFailure, (state, action): WeatherState => {
    return {
      ...state,
      currentConditions: null,
      error: action.err,
    };
  }),
  on(WeatherActions.loadFiveDaysForecastsOnSuccess, (state, action): WeatherState => {
    return {
      ...state,
      fiveDaysForecasts: action.fiveDaysForecasts,
      error: '',
    };
  }),
  on(WeatherActions.loadFiveDaysForecastsOnFailure, (state, action): WeatherState => {
    return {
      ...state,
      fiveDaysForecasts: null,
      error: action.err,
    };
  })
);
