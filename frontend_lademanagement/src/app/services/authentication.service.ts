import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service Klasse zum Authentifizieren von Benutzer mithilfe des Backends.
 *
 * @author Thomas Meese
 *
 */
export class AuthenticationService {
  readonly rootUrl = 'http://192.168.137.1:8080/backend_war'; // http://192.168.137.1:8080/backend_war_exploded
  constructor(private http: HttpClient) {
  }

  /**
   * sendet Anmeldedaten an das Backend. Falls die Authentifizierung erfolgreich
   * war, wird der Benutzer angemeldet.
   *
   * @param email
   * @param password
   * @author Thomas Meese
   */
  async signIn({email, password}): Promise<Observable<boolean>> {
    const httpOptions = {
      observe:'response' as const,
      headers: new HttpHeaders(),
      withCredentials:true
    };
    httpOptions.headers.set('Content-Type', 'text/plain');
    httpOptions.headers.set('Accept','*/*');
    const erg = new Subject<boolean>();
    this.http.post(this.rootUrl + '/rest/login', email, httpOptions).subscribe(res=>{
      if(res.status===200){
        erg.next(true);
      }else{
        erg.next(false);
      }
    },error => {
      erg.next(false);
    });
    return erg.asObservable();
  }
}
