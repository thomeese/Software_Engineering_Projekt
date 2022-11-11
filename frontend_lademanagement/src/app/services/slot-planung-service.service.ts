import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface SlotJSON {
  start: number;
  stop: number;
}


export interface SlotID {
  slotID: number;
}

export interface Reservierung {
  mitarbeiterID: string;
  startzeit: string;
  endzeit: string;
}

export interface Slot {
  start: Date;
  stop: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SlotPlanungServiceService {

  constructor(private http: HttpClient) {}

  //Holt alle eigenen gebuchten Slots
  getOwnSlots(): Observable<SlotJSON[]> {
    return this.http.get<SlotJSON[]>('<url>/rest/planung');
  }

  //Holt alle freien Zeitraeume
  getFreeSlots(): Observable<SlotJSON[]> {
    return this.http.get<SlotJSON[]>('<url>/rest/planung?frei=1');
  }

  postBookedSlot(booking: Reservierung) {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');

    const httpParams = new HttpParams();
    httpParams.set('mitarbeiterID', booking.mitarbeiterID);
    httpParams.set('startzeit', booking.startzeit);
    httpParams.set('endzeit', booking.endzeit);

    return this.http.post<SlotID>('<url>/rest/planung', {headers: header, params: httpParams});
  }
}
