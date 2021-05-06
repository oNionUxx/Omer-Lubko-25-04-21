import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WeatherState } from './weather.reducer';

import { AppState } from '../../store/app.state';

export interface State extends AppState {
  weather: WeatherState;
}

const getWeatherFeatureState = createFeatureSelector<WeatherState>('weather');

export const getAppThemeState = createSelector(getWeatherFeatureState, (state) => state.toggleAppTheme);

export const getAutoCompletedList = createSelector(getWeatherFeatureState, (state) => state.autocompletedList);

export const getCurrentLocationKey = createSelector(getWeatherFeatureState, (state) => state.currentLocationKey);

export const getCurrentLocation = createSelector(getWeatherFeatureState, getCurrentLocationKey, (state, currentLocationKey) => {
  if (currentLocationKey) {
    return currentLocationKey ? state.autocompletedList.find((l) => l.Key === currentLocationKey) : null;
  }
});

export const getCurrentConditions = createSelector(getWeatherFeatureState, (state) => state.currentConditions);

export const getFiveDaysForecasts = createSelector(getWeatherFeatureState, (state) => state.fiveDaysForecasts);

export const getCurrentList = createSelector(getWeatherFeatureState, (state) => state.favoritesList);

export const getError = createSelector(getWeatherFeatureState, (state) => state.error);
