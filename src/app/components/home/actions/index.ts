import {
  loadAutocompleteOnSuccess,
  loadAutocompleteOnFailure,
  loadCurrentConditionsOnSuccess,
  loadCurrentConditionsOnFailure,
  loadFiveDaysForecastsOnSuccess,
  loadFiveDaysForecastsOnFailure,
} from './weather-api.actions';

import {
  loadAutocompletedList,
  loadCurrentConditions,
  loadFiveDaysForecasts,
  filteredAutocompletedList,
  setCurrentLocation,
  addLocation,
} from './weather-page.actions';

export {
  loadAutocompletedList,
  loadCurrentConditions,
  loadFiveDaysForecasts,
  filteredAutocompletedList,
  setCurrentLocation,
  loadAutocompleteOnSuccess,
  loadAutocompleteOnFailure,
  loadCurrentConditionsOnSuccess,
  loadCurrentConditionsOnFailure,
  loadFiveDaysForecastsOnSuccess,
  loadFiveDaysForecastsOnFailure,
  addLocation,
};
