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
  },
  {
    path: 'ladestatus',
    loadChildren: () => import('./pages/ladestatus/ladestatus.module').then( m => m.LadestatusPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'punktekonto',
    loadChildren: () => import('./pages/punktekonto/punktekonto.module').then( m => m.PunktekontoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
