import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarModule, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LadeplanungPageRoutingModule } from './ladeplanung-routing.module';

import { LadeplanungPage } from './ladeplanung.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,CalendarModule.forRoot({

      provide: DateAdapter,

      useFactory: adapterFactory,

    }),
    LadeplanungPageRoutingModule
  ],
  declarations: [LadeplanungPage]
})
export class LadeplanungPageModule {}
