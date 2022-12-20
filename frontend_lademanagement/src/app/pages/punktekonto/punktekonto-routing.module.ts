import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PunktekontoPage } from './punktekonto.page';

const routes: Routes = [
  {
    path: '',
    component: PunktekontoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PunktekontoPageRoutingModule {}
