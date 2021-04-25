import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShellComponent } from './components/shell/shell.component';
import { ListShellComponent } from './components/favorites/list-shell/list-shell.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/home/home.module').then((h) => h.HomeModule),
      },

      {
        path: 'favorites',
        loadChildren: () => import('./components/favorites/favorites.module').then((f) => f.FavoritesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
