import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';
export const SHARED_STATE_NAME = 'shared';

const getAppFeatureState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getAppTheme = createSelector(getAppFeatureState, (state) => state.toggleAppTheme);

export const getSpinner = createSelector(getAppFeatureState, (state) => {
  return state.toggleSpinner;
});
