import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';

import { Autocomplete, CurrentConditions, FiveDaysForecasts, Favorite } from '../weather';

/* NgRx */
import { Store } from '@ngrx/store';
import * as WeatherActions from '../actions';
import { toggleSpinner } from '../../../store/shared/shared.actions';
import {
  State,
  getAutoCompletedList,
  getCurrentConditions,
  getFiveDaysForecasts,
  getError,
  getCurrentLocation,
  getCurrentFavoritesList,
} from '../state';
import { WeatherService } from '../weather.service';
import { filter, map } from 'rxjs/operators';
import { WeatherState } from '../state/weather.state';

@Component({
  selector: 'app-weather-shell',
  templateUrl: './weather-shell.component.html',
  styleUrls: ['./weather-shell.component.scss'],
})
export class WeatherShellComponent implements OnInit {
  autocompletedList$: Observable<Autocomplete[]>;
  selectedLocation$: Observable<Autocomplete>;
  currentConditions$: Observable<CurrentConditions[]>;
  fiveDaysForecasts$: Observable<FiveDaysForecasts>;
  favoritesList$: Observable<Favorite[]>;
  errorMessage$: Observable<string>;

  vm$: Observable<any>;

  getFavoriteLocation = null;

  constructor(private store: Store<State>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.getFavoriteLocation = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('isFavoritesItem'));
  }

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.

    this.autocompletedList$ = this.store.select(getAutoCompletedList);

    this.selectedLocation$ = this.store.select(getCurrentLocation);

    this.fiveDaysForecasts$ = this.store.select(getFiveDaysForecasts);

    this.currentConditions$ = this.store.select(getCurrentConditions);

    this.favoritesList$ = this.store.select(getCurrentFavoritesList);

    this.errorMessage$ = this.store.select(getError);

    if (!this.getFavoriteLocation) {
      this.locationSelected();
    }

    this.vm$ = combineLatest([
      this.autocompletedList$,
      this.selectedLocation$,
      this.currentConditions$,
      this.fiveDaysForecasts$,
      this.favoritesList$,
      this.errorMessage$,
    ]).pipe(
      filter(([autocompletedList]) => Boolean(autocompletedList)),
      map(([autocompletedList, selectedLocation, currentConditions, fiveDaysForecasts, favoritesList, errorMessage]) => ({
        autocompletedList,
        selectedLocation,
        currentConditions,
        fiveDaysForecasts,
        favoritesList,
        errorMessage,
      }))
    );
  }

  checkChangedAutocompleteList(term: string): void {
    this.store.dispatch(WeatherActions.loadAutocompletedList({ term }));
  }

  locationSelected(Key?: string): void {
    this.store.dispatch(toggleSpinner({ status: true }));
    this.store.dispatch(WeatherActions.setCurrentLocationKey({ locationKey: Key || '215854' }));
    this.store.dispatch(WeatherActions.loadCurrentConditions({ locationKey: Key || '215854' }));
    this.store.dispatch(WeatherActions.loadFiveDaysForecasts({ locationKey: Key || '215854' }));
  }

  addLocation(location: Favorite): void {
    this.store.dispatch(WeatherActions.addLocation({ location }));
    this.router.navigate(['/favorites']);
  }
}
