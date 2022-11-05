import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LadeplanungPageRoutingModule } from './ladeplanung-routing.module';

import { LadeplanungPage } from './ladeplanung.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LadeplanungPageRoutingModule
  ],
  declarations: [LadeplanungPage]
})
export class LadeplanungPageModule {}
