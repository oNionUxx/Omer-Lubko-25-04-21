import {
  loadAutocompleteOnSuccess,
  loadCurrentConditionsOnSuccess,
  loadFiveDaysForecastsOnSuccess,
  loadAutocompleteOnFailure,
  loadCurrentConditionsOnFailure,
  loadFiveDaysForecastsOnFailure,
} from './weather-api.actions';

import {
  addLocation,
  toggleAppTheme,
  setCurrentLocationKey,
  loadAutocompletedList,
  loadCurrentConditions,
  loadFiveDaysForecasts,
  filteredAutocompletedList,
} from './weather-page.actions';

export {
  addLocation,
  toggleAppTheme,
  setCurrentLocationKey,
  loadAutocompletedList,
  loadCurrentConditions,
  loadFiveDaysForecasts,
  filteredAutocompletedList,
  loadAutocompleteOnSuccess,
  loadCurrentConditionsOnSuccess,
  loadFiveDaysForecastsOnSuccess,
  loadAutocompleteOnFailure,
  loadCurrentConditionsOnFailure,
  loadFiveDaysForecastsOnFailure,
};
