/* Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { SharedModule } from './components/shared/shared.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/shell/menu/menu.component';
import { ShellComponent } from './components/shell/shell.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './components/store/state/app.state';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/* Environment */
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, MenuComponent, ShellComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FlashMessagesModule.forRoot(),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Weather-App DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
