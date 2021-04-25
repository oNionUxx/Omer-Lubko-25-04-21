import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Favorite } from '../../home/weather';

/* NgRx */
import { Store } from '@ngrx/store';
import { getCurrentList } from '../../home/state';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-list-shell',
  templateUrl: './list-shell.component.html',
  styleUrls: ['./list-shell.component.css'],
})
export class ListShellComponent implements OnInit {
  favoritesList$: Observable<Favorite[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.favoritesList$ = this.store.select(getCurrentList);
  }
}
