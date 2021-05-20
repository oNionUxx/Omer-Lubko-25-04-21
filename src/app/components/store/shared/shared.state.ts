export interface SharedState {
  toggleAppTheme?: boolean;
  toggleSpinner?: boolean;
}

/* Initial App state */
export const initialState: SharedState = {
  toggleAppTheme: false,
  toggleSpinner: false,
};
