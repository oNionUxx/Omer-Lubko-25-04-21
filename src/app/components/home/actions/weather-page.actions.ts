import { createAction, props } from '@ngrx/store';
import { Favorite } from '../weather';

/* Load AutoCompleted List Action */
export const loadAutocompletedList = createAction('[Weather Page]  Load  Autocompleted List', props<{ term: string }>());

/* Load Current Conditions List Action */
export const loadCurrentConditions = createAction('[Weather Page]  Load  Current Conditions', props<{ locationKey: string }>());

/* Load 5 Days Forecasts Conditions List Action */
export const loadFiveDaysForecasts = createAction('[Weather Page]  Load Five  Days Forecasts', props<{ locationKey: string }>());

/* Filter AutoCompleted List Action */
export const filteredAutocompletedList = createAction('[Weather Page]  Filter Autocompleted List', props<{ currentLocationKey: string }>());

/* Set Current Coin Action */
export const setCurrentLocation = createAction('[Weather Page] Set Current Location', props<{ currentLocationKey: string }>());

/* Add Location Action */
export const addLocation = createAction('[Favorites Page]  Add Location', props<{ location: Favorite }>());
