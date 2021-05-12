import { createReducer, on } from '@ngrx/store';
import { toggleAppTheme, toggleSpinner } from './shared.actions';
import { initialState, SharedState } from './shared.state';

export const sharedReducer = createReducer<SharedState>(
  initialState,
  on(toggleAppTheme, (state): SharedState => {
    return {
      ...state,
      toggleAppTheme: !state.toggleAppTheme,
    };
  }),
  on(toggleSpinner, (state, action): SharedState => {
    return {
      ...state,
      toggleSpinner: action.status,
    };
  })
);
