import { createAction, props } from '@ngrx/store';

/* Toggle AppTheme Action */
export const toggleAppTheme = createAction('[App Page] Toggle App Theme');

/* Toggle Spinner Action */
export const toggleSpinner = createAction('[Spinner] Toggle Spinner', props<{ status: boolean }>());
