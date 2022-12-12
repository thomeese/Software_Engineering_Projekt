import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LadestatusPage } from './ladestatus.page';

const routes: Routes = [
  {
    path: '',
    component: LadestatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LadestatusPageRoutingModule {}
