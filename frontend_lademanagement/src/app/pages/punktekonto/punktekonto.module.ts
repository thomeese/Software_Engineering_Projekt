import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PunktekontoPageRoutingModule } from './punktekonto-routing.module';

import { PunktekontoPage } from './punktekonto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PunktekontoPageRoutingModule
  ],
  declarations: [PunktekontoPage]
})
export class PunktekontoPageModule {}
