import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


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


export class SlotplanungServiceService {

  constructor(private http: HttpClient) {
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


  getOwnSlots() {
    return this.http.get<Slot[]>('<url>/rest/planung');
  }

  getFreeSlots() {
    return this.http.get<Slot[]>('<url>/rest/planung?frei=1');
  }
}
