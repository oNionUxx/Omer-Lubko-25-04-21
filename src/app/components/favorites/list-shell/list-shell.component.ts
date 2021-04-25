import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Favorite } from '../../home/weather';

/* NgRx */
import { Store } from '@ngrx/store';
import { getCurrentList } from '../../home/state';
import { Router } from '@angular/router';

/* NgRx */
import { AppState } from '../../store/app.state';
import * as WeatherActions from '../../home/actions';

@Component({
  selector: 'app-list-shell',
  templateUrl: './list-shell.component.html',
  styleUrls: ['./list-shell.component.css'],
})
export class ListShellComponent implements OnInit {
  favoritesList$: Observable<Favorite[]>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.favoritesList$ = this.store.select(getCurrentList);
  }

  itemWasSelected(item: Favorite) {
    this.store.dispatch(WeatherActions.loadAutocompletedList({ term: item.LocalizedName }));
    this.store.dispatch(WeatherActions.setCurrentLocation({ currentLocationKey: item.Key }));
    this.store.dispatch(WeatherActions.loadCurrentConditions({ locationKey: item.Key }));
    this.store.dispatch(WeatherActions.loadFiveDaysForecasts({ locationKey: item.Key }));

    this.router.navigate(['home']);
  }
}
