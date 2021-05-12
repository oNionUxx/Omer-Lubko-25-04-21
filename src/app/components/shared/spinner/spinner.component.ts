import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from '../../store/state/app.state';
import { getSpinner } from '../../store/shared/shared.selectors';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  toggleSpinner$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.toggleSpinner$ = this.store.select(getSpinner);
  }
}
