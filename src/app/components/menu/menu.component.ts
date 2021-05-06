import { Renderer2 } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

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
export class MenuComponent implements OnInit {
  title = 'Weather Task';

  toggleTheme = environment.toggleAppTheme;
  subscription: Subscription;

  constructor(private store: Store<State>, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'bright');

    this.changeColor();
  }

  ngOnInit(): void {}

  toggle(): void {
    this.toggleTheme = !this.toggleTheme;
    environment.toggleAppTheme = this.toggleTheme;
    this.changeColor();
  }

  changeColor(): void {
    if (!this.toggleTheme) {
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.addClass(document.body, 'bright');
    } else {
      this.renderer.addClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'bright');
    }
  }
}
