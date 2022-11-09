import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuchungPageRoutingModule } from './buchung-routing.module';

import { BuchungPage } from './buchung.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuchungPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BuchungPage]
})
export class Buchung2PageModule {}
