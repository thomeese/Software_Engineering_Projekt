import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


export interface SlotID {
  slotID: number;
}

export interface Reservierung {
  mitarbeiterID: string;
  startzeit: string;
  endzeit: string;
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

}
