import { SharedState } from '../shared/shared.state';
import { SHARED_STATE_NAME } from '../shared/shared.selectors';
import { sharedReducer } from '../shared/shared.reducer';

export interface State {
  [SHARED_STATE_NAME]?: SharedState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
};
