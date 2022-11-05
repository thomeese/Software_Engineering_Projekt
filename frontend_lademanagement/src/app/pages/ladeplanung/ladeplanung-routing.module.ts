import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LadeplanungPage } from './ladeplanung.page';

const routes: Routes = [
  {
    path: '',
    component: LadeplanungPage
  },
  {
    path: 'buchung',
    loadChildren: () => import('./buchung/buchung.module').then( m => m.BuchungPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LadeplanungPageRoutingModule {}
