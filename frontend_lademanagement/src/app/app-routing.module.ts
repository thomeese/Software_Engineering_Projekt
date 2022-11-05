import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ladeplanung',
    pathMatch: 'full'
  },
  {
    path: 'ladeplanung',
    loadChildren: () => import('./pages/ladeplanung/ladeplanung.module').then(m => m.LadeplanungPageModule)
  },
  {
    path: 'buchung',
    loadChildren: () => import('./pages/ladeplanung/buchung/buchung.module').then(m => m.BuchungPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
