import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuchungPage } from './buchung.page';

const routes: Routes = [
  {
    path: '',
    component: BuchungPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuchungPageRoutingModule {}
