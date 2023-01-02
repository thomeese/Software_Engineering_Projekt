import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  KonfigurationsKonstanten,
  KonstantenLadedauer,
  KonstantenLogin,
  KonstantenSteckzeiten
} from '../interfaces/interfaces';


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
  private konfigurationsKonstanten: KonfigurationsKonstanten;

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
    this.http.get<KonfigurationsKonstanten>(this.rootUrl + '/rest/konfiguration').subscribe((konstanten) => {
      //TODO: wenn Mockt nicht mehr verwendet wird, konstanten entsprechend auf die Interfaces mappen.
    });
  }


  /**
   * Mockt die Konfigurationskonstanten vom Backend auf festdefinierte Werte.
   *
   * @author Manuel Arling
   *
   */
  mockKonfigurationsKonstanten() {
    this.konfigurationsKonstanten = {
      konstantenLadedauer: {
        minimale_ladedauer_minuten: 30,
        maximale_ladedauer_minuten: 120,
      },
      konstantenSteckzeiten: {
        einsteckzeit_minuten: 15,
        aussteckzeit_minuten: 15,
      },
      konstantenLogin: {
        emailRegex: '.*@koszarek.ml'
      }
    };
    console.log(this.konfigurationsKonstanten);
  }

  /**
   * Gibt alle Konfigurationskonstanten als ein Objekt zurueck.
   *
   * @returns alle Konfigurationskonstanten des Systems
   *
   * @author Manuel Arling
   */
  getKonfigurationsKonstanten(): KonfigurationsKonstanten {
    return this.konfigurationsKonstanten;
  }


  /**
   * Gibt die Konfigurationskonstanten fuer die ladedauer zurueck.
   *
   * @returns Konfigurationskonstanten fuer die Ladedauer
   * @author Manuel Arling
   */
  getKonstantenLadedauer(): KonstantenLadedauer {
    return this.konfigurationsKonstanten.konstantenLadedauer;
  }

  /**
   * Gibt die Konfigurationskonstanten fuer die Ein- und Aussteckzeiten zurueck.
   *
   * @returns Konfigurationskonstanten fuer die Ein- und Aussteckzeiten.
   * @author Manuel Arling
   */
  getKonstantenSteckzeiten(): KonstantenSteckzeiten {
    return this.konfigurationsKonstanten.konstantenSteckzeiten;
  }

  /**
   * Gibt die Konfingurationkonstanten fuer das Login zurueck.
   *
   * @return KonstantenLogin
   * @author Thomas Meese
   */
  getKonstantenLogin(): KonstantenLogin {
    return this.konfigurationsKonstanten.konstantenLogin;
  }
}
