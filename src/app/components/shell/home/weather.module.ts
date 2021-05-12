/* Modules */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SharedModule } from '../../shared/shared.module';

/* Components */
import { WeatherShellComponent } from './weather-shell/weather-shell.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { WeatherResultsComponent } from './weather-info/weather-info.component';

/* Services */
import { WeatherService } from './weather.service';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { weatherReducer } from './state/weather.reducer';
import { WeatherEffects } from './state/weather.effects';

const weatherRoutes: Routes = [{ path: '', component: WeatherShellComponent }];

@NgModule({
  imports: [
    SharedModule,
    AutocompleteLibModule,
    RouterModule.forChild(weatherRoutes),
    StoreModule.forFeature('weather', weatherReducer),
    EffectsModule.forFeature([WeatherEffects]),
  ],
  declarations: [WeatherShellComponent, WeatherSearchComponent, WeatherResultsComponent],
  providers: [WeatherService],
})
export class WeatherModule {}
