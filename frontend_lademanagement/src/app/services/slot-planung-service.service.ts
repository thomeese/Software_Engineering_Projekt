import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Reservierung, Slot, SlotID, SlotJSON} from '../interfaces/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlotPlanungServiceService {
  readonly rootUrl = 'http://localhost:8080/backend_war'; //http://192.168.2.6:8080/backend_war_exploded
  constructor(private http: HttpClient) {
  }

  /**
   * Holt alle eigenen gebuchten Slots von dem Backend und formatiert diese als eine Liste von Slots zurueck.
   */
  getOwnSlots(): Observable<Slot[]> {
    return this.http.get<SlotJSON[]>(this.rootUrl + '/rest/slot')
      .pipe(
        map((results: SlotJSON[]) => results.map((slot: SlotJSON) => ({
            startzeit: new Date(slot.startzeit),
            endzeit: new Date(slot.endzeit),
            fruehsterEinsteckzeitpunkt: new Date(slot.fruehsterEinsteckzeitpunkt),
            spaetesterAbsteckzeitpunkt: new Date(slot.spaetesterAbsteckzeitpunkt)
          } as Slot)) as Slot[]
        )
      );
  }

  /**
   * Holt alle freien Slots von dem Backend und formatiert diese als eine Liste von Slots zurueck.
   */
  getFreeSlots(): Observable<Slot[]> {
    //TODO: eventuell wird hier der falsche Typ erwartet muesste es nicht eine Reservierung sein
    return this.http.get<SlotJSON[]>(this.rootUrl + '/rest/slot?frei=1')
      .pipe(
        map((results: SlotJSON[]) => results.map((slot: SlotJSON) => ({
            startzeit: new Date(slot.startzeit),
            endzeit: new Date(slot.endzeit),
            fruehsterEinsteckzeitpunkt: new Date(slot.fruehsterEinsteckzeitpunkt),
            spaetesterAbsteckzeitpunkt: new Date(slot.spaetesterAbsteckzeitpunkt)
          } as Slot)) as Slot[]
        )
      );
  }

  postBookedSlot(booking: Reservierung): Observable<SlotID> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    httpOptions.headers.set('Content-Type', 'application/json');
    httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    //TODO : mitarbeiterId ueber Token loesen
    return this.http.post<SlotID>(this.rootUrl + '/rest/slot', booking, httpOptions);
  }
}
