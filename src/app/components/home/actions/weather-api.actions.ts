import { createAction, props } from '@ngrx/store';

import * as Weather from '../weather';

/* Load Autocompleted List On Success Action */
export const loadAutocompleteOnSuccess = createAction(
  '[Weather API] Load Autocompleted Success',
  props<{ autocompletedList: Weather.Autocomplete[] }>()
);

/* Load Autocompleted List On Failure Action */
export const loadAutocompleteOnFailure = createAction('[Weather API] Load Autocompleted Fail', props<{ err: string }>());

/* Load Current Conditions On Success Action */
export const loadCurrentConditionsOnSuccess = createAction(
  '[Weather API] Load Current Conditions  Success',
  props<{ currentConditions: Weather.CurrentConditions[] }>()
);

/* Load Current Conditions On Failure Action */
export const loadCurrentConditionsOnFailure = createAction('[Weather API] Load Current Conditions Fail', props<{ err: string }>());

/* Load 5 Days Forecasts On Success Action */
export const loadFiveDaysForecastsOnSuccess = createAction(
  '[Weather API] Load Five Days Forecasts  Success',
  props<{ fiveDaysForecasts: Weather.FiveDaysForecasts[] }>()
);

/* Load 5 Days Forecasts On Failure Action */
export const loadFiveDaysForecastsOnFailure = createAction('[Weather API]  Load Five Days Forecasts  Fail', props<{ err: string }>());
