import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WeatherState } from './weather.state';

import * as AppState from '../../../store/state/app.state';

export interface State extends AppState.State {
  weather?: WeatherState;
}

const getWeatherFeatureState = createFeatureSelector<WeatherState>('weather');

export const getError = createSelector(getWeatherFeatureState, (state) => state.error);

export const getAutoCompletedList = createSelector(getWeatherFeatureState, (state) => state.autocompletedList);

export const getCurrentConditions = createSelector(getWeatherFeatureState, (state) => state.currentConditions);

export const getFiveDaysForecasts = createSelector(getWeatherFeatureState, (state) => state.fiveDaysForecasts);

export const getCurrentFavoritesList = createSelector(getWeatherFeatureState, (state) => state.favoritesList);

export const getCurrentLocationKey = createSelector(getWeatherFeatureState, (state) => state.currentLocationKey);

export const getCurrentLocation = createSelector(getWeatherFeatureState, getCurrentLocationKey, (state, currentLocationKey) => {
  return currentLocationKey ? state.autocompletedList.find((l) => l.Key === currentLocationKey) : null;
});
