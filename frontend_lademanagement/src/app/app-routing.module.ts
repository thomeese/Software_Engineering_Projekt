import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ladeplanung',
    pathMatch: 'full'
  }, {
    path: 'ladeplanung',
    loadChildren: () => import('./pages/ladeplanung/ladeplanung.module').then(m => m.LadeplanungPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
