import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: LOCALE_ID, useValue: 'de-DE'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
