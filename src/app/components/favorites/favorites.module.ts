/* Modules */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

/* Components */

import { ListShellComponent } from './list-shell/list-shell.component';
import { ListDataComponent } from './list-data/list-data.component';

const favoritesRoutes: Routes = [{ path: '', component: ListShellComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(favoritesRoutes)],
  declarations: [ListShellComponent, ListDataComponent],
})
export class FavoritesModule {}
