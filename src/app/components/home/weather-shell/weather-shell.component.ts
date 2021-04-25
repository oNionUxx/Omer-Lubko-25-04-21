import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Autocomplete, CurrentConditions, FiveDaysForecasts, Favorite } from '../weather';

/* NgRx */
import { Store } from '@ngrx/store';
import * as WeatherActions from '../actions';
import { State, getAutoCompletedList, getCurrentLocation, getCurrentConditions, getFiveDaysForecasts, getCurrentList } from '../state';
import { WeatherService } from '../weather.service';

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

  constructor(private store: Store<State>, private router: Router, private weatherService: WeatherService) {}

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.autocompletedList$ = this.store.select(getAutoCompletedList);

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
    this.store.dispatch(WeatherActions.setCurrentLocation({ currentLocationKey: location.Key }));
    this.store.dispatch(WeatherActions.loadCurrentConditions({ locationKey: location.Key }));
    this.store.dispatch(WeatherActions.loadFiveDaysForecasts({ locationKey: location.Key }));
  }

  filterAutocompletedList(selectedLocationKey: string): void {
    this.store.dispatch(WeatherActions.filteredAutocompletedList({ currentLocationKey: selectedLocationKey }));
  }

  addLocation(location: Favorite): void {
    this.store.dispatch(WeatherActions.addLocation({ location }));
    this.router.navigate(['/favorites']);
  }
}
