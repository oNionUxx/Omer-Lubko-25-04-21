import { Renderer2 } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as WeatherActions from '../home/actions';
import { State, getAppThemeState } from '../home/state/index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  title = 'Weather Task';

  toggleTheme = true;
  subscription: Subscription;

  constructor(private store: Store<State>, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'bright');
  }

  ngOnInit(): void {
    this.subscription = this.store.select(getAppThemeState).subscribe((value) => {
      this.toggleTheme = value;

      if (!this.toggleTheme) {
        this.renderer.removeClass(document.body, 'dark');
        this.renderer.addClass(document.body, 'bright');
      } else {
        this.renderer.addClass(document.body, 'dark');
        this.renderer.removeClass(document.body, 'bright');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggle(): void {
    this.store.dispatch(WeatherActions.toggleAppTheme());
  }
}
