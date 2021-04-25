import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs';

import { Autocomplete, CurrentConditions, FiveDaysForecasts, Favorite } from '../weather';

/* NgRx */
import { Store } from '@ngrx/store';
import * as WeatherActions from '../actions';
import { State, getAutoCompletedList, getCurrentLocation, getCurrentConditions, getFiveDaysForecasts, getCurrentList } from '../state';

@Component({
  selector: 'app-weather-shell',
  templateUrl: './weather-shell.component.html',
  styleUrls: ['./weather-shell.component.css'],
})
export class WeatherShellComponent implements OnInit {
  autocompletedList$: Observable<Autocomplete[]>;
  currentConditions$: Observable<CurrentConditions[]>;
  fiveDaysForecasts$: Observable<FiveDaysForecasts[]>;
  favoritesList$: Observable<Favorite[]>;
  errorMessage$: Observable<string>;

  selectedLocation$: Observable<Autocomplete>;

  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.autocompletedList$ = this.store.select(getAutoCompletedList);
    this.store.dispatch(WeatherActions.loadAutocompletedList({ term: 'tel aviv' }));

    this.locationSelected();

    this.selectedLocation$ = this.store.select(getCurrentLocation);

    this.fiveDaysForecasts$ = this.store.select(getFiveDaysForecasts);

    this.currentConditions$ = this.store.select(getCurrentConditions);

    this.favoritesList$ = this.store.select(getCurrentList);
  }

  checkChangedAutocompleteList(term: string): void {
    if (term) {
      this.store.dispatch(WeatherActions.loadAutocompletedList({ term }));
    }
  }

  locationSelected(location?: Autocomplete): void {
    const KEY = location ? location.Key : '215854';

    this.store.dispatch(WeatherActions.setCurrentLocation({ currentLocationKey: KEY }));
    this.store.dispatch(WeatherActions.loadCurrentConditions({ locationKey: KEY }));
    this.store.dispatch(WeatherActions.loadFiveDaysForecasts({ locationKey: KEY }));
  }

  filterAutocompletedList(selectedLocationKey: string): void {
    this.store.dispatch(WeatherActions.filteredAutocompletedList({ currentLocationKey: selectedLocationKey }));
  }

  addLocation(location: Favorite): void {
    this.store.dispatch(WeatherActions.addLocation({ location }));
    this.router.navigate(['/favorites']);
  }
}
