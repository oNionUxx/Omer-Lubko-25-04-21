import { Component, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { State } from '../../store/state/app.state';
import { getAppTheme } from '../../store/shared/shared.selectors';
import { toggleAppTheme } from '../../store/shared/shared.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  title = 'Weather Task';

  selectedAppTheme: boolean;

  selectedAppTheme$: Observable<boolean>;

  subscription: Subscription;

  constructor(private store: Store<State>, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'bright');
  }

  ngOnInit(): void {
    this.selectedAppTheme$ = this.store.select(getAppTheme);

    this.subscription = this.selectedAppTheme$.subscribe((data) => {
      this.selectedAppTheme = data;
      this.renderer.addClass(document.body, this.selectedAppTheme ? 'bright' : 'dark');
      this.renderer.removeClass(document.body, !this.selectedAppTheme ? 'bright' : 'dark');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clickEvent(): void {
    this.store.dispatch(toggleAppTheme());
  }
}
