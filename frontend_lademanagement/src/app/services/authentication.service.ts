import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
  }

  /**
   * sendet Anmeldedaten an das Backend. Falls die Authentifizierung erfolgreich
   * war, wird der Benutzer angemeldet.
   *
   * @param email
   * @param password
   */
  async signIn({email, password}) {
    //Todo: implement Method
    return true;
  }
  async signOut() {
    //Todo: implement Method
  }
}
