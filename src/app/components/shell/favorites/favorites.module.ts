/* Modules */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

/* Components */
import { ListShellComponent } from './list-shell/list-shell.component';
import { ListDataComponent } from './list-data/list-data.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { weatherReducer } from '../home/state/weather.reducer';

const favoritesRoutes: Routes = [{ path: '', component: ListShellComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(favoritesRoutes), StoreModule.forFeature('weather', weatherReducer)],
  declarations: [ListShellComponent, ListDataComponent],
})
export class FavoritesModule {}
