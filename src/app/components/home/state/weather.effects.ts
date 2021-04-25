import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, debounceTime, map, mergeMap, switchMap } from 'rxjs/operators';

import { WeatherService } from '../weather.service';

/* NgRx */
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as WeatherActions from '../actions';

@Injectable()
export class WeatherEffects {
  constructor(private action$: Actions, private weatherService: WeatherService) {}
  /* Load Autocompleted List Effect */
  loadAutocompleteList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(WeatherActions.loadAutocompletedList),
      debounceTime(1000),
      switchMap((action) =>
        this.weatherService.getAutoCompleted(action.term).pipe(
          map((autocompletedList) => WeatherActions.loadAutocompleteOnSuccess({ autocompletedList })),
          catchError((err) => of(WeatherActions.loadAutocompleteOnFailure({ err })))
        )
      )
    );
  });

  /* Load Current Conditions Effect */
  loadCurrentConditions$ = createEffect(() => {
    return this.action$.pipe(
      ofType(WeatherActions.loadCurrentConditions),
      mergeMap((action) =>
        this.weatherService.getCurrentConditions(action.locationKey).pipe(
          map((currentConditions) => WeatherActions.loadCurrentConditionsOnSuccess({ currentConditions })),
          catchError((err) => of(WeatherActions.loadCurrentConditionsOnFailure({ err })))
        )
      )
    );
  });

  /* Load 5 Days Forecasts Effect */
  loadFiveDaysForecasts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(WeatherActions.loadFiveDaysForecasts),
      mergeMap((action) =>
        this.weatherService.getFiveDaysForecasts(action.locationKey).pipe(
          map((fiveDaysForecasts) => WeatherActions.loadFiveDaysForecastsOnSuccess({ fiveDaysForecasts })),
          catchError((err) => of(WeatherActions.loadFiveDaysForecastsOnFailure({ err })))
        )
      )
    );
  });
}
