import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, debounceTime, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';

import { WeatherService } from '../weather.service';

/* NgRx */
import * as WeatherActions from '../actions';
import { Store } from '@ngrx/store';
import { State } from '../../../store/state/app.state';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { toggleSpinner } from '../../../store/shared/shared.actions';

@Injectable()
export class WeatherEffects {
  constructor(private action$: Actions, private weatherService: WeatherService, private store: Store<State>) {}
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
      exhaustMap((action) =>
        this.weatherService.getCurrentConditions(action.locationKey).pipe(
          map((currentConditions) => {
            this.store.dispatch(toggleSpinner({ status: false }));
            return WeatherActions.loadCurrentConditionsOnSuccess({ currentConditions });
          }),
          catchError((err) => of(WeatherActions.loadCurrentConditionsOnFailure({ err })))
        )
      )
    );
  });

  /* Load 5 Days Forecasts Effect */
  loadFiveDaysForecasts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(WeatherActions.loadFiveDaysForecasts),
      exhaustMap((action) =>
        this.weatherService.getFiveDaysForecasts(action.locationKey).pipe(
          map((fiveDaysForecasts) => WeatherActions.loadFiveDaysForecastsOnSuccess({ fiveDaysForecasts })),
          catchError((err) => of(WeatherActions.loadFiveDaysForecastsOnFailure({ err })))
        )
      )
    );
  });
}
