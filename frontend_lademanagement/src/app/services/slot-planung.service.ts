import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Ladestatus, LadestatusDTO, Punktekonto, Reservierung, Slot, SlotID} from '../interfaces/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlotPlanungService {
  readonly rootUrl = 'http://localhost:8080/backend_war'; // http://192.168.137.1:8080/backend_war_exploded
  constructor(private http: HttpClient) {
  }

  /**
   * Holt alle eigenen gebuchten Reservierungen von dem Backend und gibt diese formatiert als eine Liste von Reservierungen zurueck.
   */
  getOwnReservierungen(): Observable<Reservierung[]> {
    return this.http.get<Reservierung[]>(this.rootUrl + '/rest/reservierung',{withCredentials:true})
      .pipe(
        map((results: Reservierung[]) => results.map((reservierung: Reservierung) => ({
            name: reservierung.name,
            fruehesterEinsteckzeitpunkt: new Date(reservierung.fruehesterEinsteckzeitpunkt),
            spaetesterAussteckzeitpunkt: new Date(reservierung.spaetesterAussteckzeitpunkt),
            slot: {
              startzeit: new Date(reservierung.slot.startzeit),
              endzeit: new Date(reservierung.slot.endzeit),
            }
          }))
        )
      );
  }

  /**
   * Holt alle freien Slots von dem Backend und formatiert diese als eine Liste von Slots zurueck.
   */
  getFreeSlots(): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.rootUrl + '/rest/slot?frei=1')
      .pipe(
        map((results: Slot[]) => results.map((slot: Slot) => ({
            startzeit: new Date(slot.startzeit),
            endzeit: new Date(slot.endzeit),
          }))
        )
      );
  }

  /**
   * Holt den Ladestatus des Fahrzeugs vom Backend.
   */
  getLadestatus(): Observable<Ladestatus> {
    return this.http.get<LadestatusDTO>(this.rootUrl + '/rest/status',{withCredentials:true}).pipe(
      map((result: LadestatusDTO) => ({
        geladeneEnergieKwH: result.geladeneEnergieKwH,
        ladestandProzent: result.ladestandProzent,
        ladedauerStundenMinuten: {
          stunden: Number(result.ladedauerStundenMinuten.split(':', 2)[0]),
          minuten: Number(result.ladedauerStundenMinuten.split(':', 2)[1])
        }
      }))
    );
  }

  /**
   * Holt die Informationen zum Punktekonto vom Backend
   */
  getPunktekontoInformations(): Observable<Punktekonto> {
    return this.http.get<Punktekonto>(this.rootUrl + '/rest/punktesystem',{withCredentials:true});
  }

  /**
   * Sendet die benoetigten Daten fuer eine Reservierung an das Beckend.
   *
   * @param booking zu sendende Reservierung
   */
  postBookedSlot(booking: Slot): Observable<Reservierung> {
    const httpOptions = {
      headers: new HttpHeaders(),
      withCredentials:true
    };
    httpOptions.headers.set('Content-Type', 'application/json');
    httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<Reservierung>(this.rootUrl + '/rest/slot', booking, httpOptions);
  }
}
