import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Reservierung, Slot, SlotID, SlotJSON} from '../interfaces/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlotPlanungServiceService {

  constructor(private http: HttpClient){}

  /**
   * Holt alle eigenen gebuchten Slots von dem Backend und formatiert diese als eine Liste von Slots zurueck.
   */
  getOwnSlots(): Observable<Slot[]> {
    return this.http.get<SlotJSON[]>('http://localhost:8080/backend_war/rest/slot')
      .pipe(
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        map((results) => <Slot[]> results.map((slot: SlotJSON) => <Slot> {
          startzeit: new Date(slot.startzeit * 1000),
          endzeit: new Date(slot.endzeit * 1000),
          fruehsterEinsteckzeitpunkt: new Date(slot.fruehsterEinsteckzeitpunkt * 1000),
          spaetesterAbsteckzeitpunkt: new Date(slot.spaetesterAbsteckzeitpunkt * 1000)
          })
        )
      );
  }

  /**
   * Holt alle freien Slots von dem Backend und formatiert diese als eine Liste von Slots zurueck.
   */
  getFreeSlots(): Observable<Slot[]> {
    //TODO: eventuell wird hier der falsche Typ erwartet muesste es nicht eine Reservierung sein
    return this.http.get<SlotJSON[]>('http://localhost:8080/backend_war/rest/slot?frei=1')
      .pipe(
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        map((results) => <Slot[]> results.map((slot: SlotJSON) => <Slot> {
          startzeit: new Date(slot.startzeit * 1000),
          endzeit: new Date(slot.endzeit * 1000),
          fruehsterEinsteckzeitpunkt: new Date(slot.fruehsterEinsteckzeitpunkt * 1000),
          spaetesterAbsteckzeitpunkt: new Date(slot.spaetesterAbsteckzeitpunkt * 1000)
          })
        )
      );
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
