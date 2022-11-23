import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Reservierung, Slot, SlotID, SlotJSON} from '../interfaces/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlotPlanungServiceService {
  readonly rootUrl = 'http://192.168.2.6:8080/backend_war_exploded';
  constructor(private http: HttpClient){}

  /**
   * Holt alle eigenen gebuchten Slots von dem Backend und formatiert diese als eine Liste von Slots zurueck.
   */
  getOwnSlots(): Observable<Slot[]> {
    return this.http.get<SlotJSON[]>(this.rootUrl+'/rest/slot')
      .pipe(
        map((results: SlotJSON[]) => results.map((slot: SlotJSON) => ({
          startzeit: new Date(slot.startzeit * 1000),
          endzeit: new Date(slot.endzeit * 1000),
          fruehsterEinsteckzeitpunkt: new Date(slot.fruehsterEinsteckzeitpunkt * 1000),
          spaetesterAbsteckzeitpunkt: new Date(slot.spaetesterAbsteckzeitpunkt * 1000)
          } as Slot)) as Slot[]
        )
      );
  }

  /**
   * Holt alle freien Slots von dem Backend und formatiert diese als eine Liste von Slots zurueck.
   */
  getFreeSlots(): Observable<Slot[]> {
    //TODO: eventuell wird hier der falsche Typ erwartet muesste es nicht eine Reservierung sein
    return this.http.get<SlotJSON[]>(this.rootUrl+'/rest/slot?frei=1')
      .pipe(
        map((results: SlotJSON[]) => results.map((slot: SlotJSON) => ({
          startzeit: new Date(slot.startzeit * 1000),
          endzeit: new Date(slot.endzeit * 1000),
          fruehsterEinsteckzeitpunkt: new Date(slot.fruehsterEinsteckzeitpunkt * 1000),
          spaetesterAbsteckzeitpunkt: new Date(slot.spaetesterAbsteckzeitpunkt * 1000)
          } as Slot)) as Slot[]
        )
      );
  }

  postBookedSlot(booking: Reservierung) {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    //TODO : mitarbeiterId ueber Token loesen
    const httpParams = new HttpParams();
    httpParams.set('mitarbeiterID', booking.mitarbeiterID);
    httpParams.set('startzeit', booking.startzeit);
    httpParams.set('endzeit', booking.endzeit);

    return this.http.post<SlotID>(this.rootUrl+'/rest/planung', {headers: header, params: httpParams});
  }
}
