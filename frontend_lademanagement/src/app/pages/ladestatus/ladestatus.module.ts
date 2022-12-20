import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LadestatusPageRoutingModule } from './ladestatus-routing.module';

import { LadestatusPage } from './ladestatus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LadestatusPageRoutingModule
  ],
  declarations: [LadestatusPage]
})
export class LadestatusPageModule {}
