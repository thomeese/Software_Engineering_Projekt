import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { konfigurationsKonstanten } from '../interfaces/interfaces';


/**
 * Service Klasse zum Holen der Konfigurationskonstanten vom Backend, wie z.B. Minimaleladezeit, Maximaleladezeit, etc.
 * 
 * @author Manuel Arling
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class KonfigurationskonstantenService {
  //TODO: rootURL aus beiden Services auslagern um an einer zentralen Stelle zu haben
  readonly rootUrl = 'http://localhost:8080/backend_war'; // http://192.168.137.1:8080/backend_war_exploded
  private konfigurationsKonstanten : konfigurationsKonstanten = {
    einsteckzeit_minuten: 15,
    aussteckzeit_minuten: 15,
    minimale_ladedauer_minuten: 30,
    maximale_ladedauer_minuten: 120
  };

  constructor(private http: HttpClient) { 
    //TODO: Mock durch richtige holeKonfigurationsKonstantenVomBackend ersetzen.
    //this.holeKonfigurationsKonstantenVomBackend();
    this.mockKonfigurationsKonstanten();
  }

  /**
   * Holt die Konfigurationskonstanten vom Backenend und speichert diese in der privaten Variable ab.
   * 
   * @author Manuel Arling
   */

  holeKonfigurationsKonstantenVomBackend() {
    this.http.get<konfigurationsKonstanten>(this.rootUrl + '/rest/konfiguration').subscribe((data) => {
      this.konfigurationsKonstanten = data;
    });
  }


  /**
   * Mockt die Konfigurationskonstanten vom Backend auf festdefinierte Werte.
   * 
   * @author Manuel Arling
   * 
   */
  mockKonfigurationsKonstanten() {
    this.konfigurationsKonstanten.einsteckzeit_minuten = 15;
    this.konfigurationsKonstanten.aussteckzeit_minuten = 15;
    this.konfigurationsKonstanten.minimale_ladedauer_minuten = 30;
    this.konfigurationsKonstanten.maximale_ladedauer_minuten = 120;
    console.log(this.konfigurationsKonstanten);
  }

  /**
   * Gibt die konfigurationsKonstanten als ein Objekt zurueck.
   * 
   * @returns konfigurationsKonstanten fuer die Ladeplanung
   * 
   * @author Manuel Arling
   */
  getKonfigurationsKonstanten() {
    return this.konfigurationsKonstanten;
  }
}
