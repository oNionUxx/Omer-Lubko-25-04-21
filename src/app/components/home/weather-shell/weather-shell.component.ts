import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Autocomplete, CurrentConditions, FiveDaysForecasts, Favorite } from '../weather';

/* NgRx */
import { Store } from '@ngrx/store';
import * as WeatherActions from '../actions';
import {
  State,
  getAutoCompletedList,
  getCurrentConditions,
  getFiveDaysForecasts,
  getError,
  getCurrentLocationKey,
  getCurrentFavoritesList,
} from '../state';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-shell',
  templateUrl: './weather-shell.component.html',
  styleUrls: ['./weather-shell.component.css'],
})
export class WeatherShellComponent implements OnInit {
  autocompletedList$: Observable<Autocomplete[]>;
  currentLocationKey$: Observable<string>;
  currentConditions$: Observable<CurrentConditions[]>;
  fiveDaysForecasts$: Observable<FiveDaysForecasts[]>;
  favoritesList$: Observable<Favorite[]>;
  errorMessage$: Observable<string>;

  getFavoriteLocation = null;

  constructor(private store: Store<State>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.getFavoriteLocation = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('isFavoritesItem'));
  }

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.

    this.autocompletedList$ = this.store.select(getAutoCompletedList);

    this.currentLocationKey$ = this.store.select(getCurrentLocationKey);

    this.fiveDaysForecasts$ = this.store.select(getFiveDaysForecasts);

    this.currentConditions$ = this.store.select(getCurrentConditions);

    this.favoritesList$ = this.store.select(getCurrentFavoritesList);

    this.errorMessage$ = this.store.select(getError);

    if (!this.getFavoriteLocation) {
      this.locationSelected();
    }
  }

  checkChangedAutocompleteList(term: string): void {
    if (term) {
      this.store.dispatch(WeatherActions.loadAutocompletedList({ term }));
    }
  }

  locationSelected(Key?: string): void {
    this.store.dispatch(WeatherActions.setCurrentLocationKey({ locationKey: Key || '215854' }));
    this.store.dispatch(WeatherActions.loadCurrentConditions({ locationKey: Key || '215854' }));
    this.store.dispatch(WeatherActions.loadFiveDaysForecasts({ locationKey: Key || '215854' }));
  }

  filterAutocompletedList(selectedLocationKey: string): void {
    this.store.dispatch(WeatherActions.filteredAutocompletedList({ locationKey: selectedLocationKey }));
  }

  addLocation(location: Favorite): void {
    this.store.dispatch(WeatherActions.addLocation({ location }));
    this.router.navigate(['/favorites']);
  }
}
