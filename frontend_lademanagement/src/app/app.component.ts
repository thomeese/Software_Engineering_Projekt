import {Component} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Ladeplanung', url: '/ladeplanung', icon: 'calendar'},
    {title: 'Ladestatus', url: '/ladestatus', icon: 'battery-charging'},
  ];
  public labels = [];

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  /**
   * Meldet einen angemeldeten benutzer ab.
   */
  async signOut() {
    await this.router.navigateByUrl('/login', {replaceUrl: true});
    document.location.reload();
  }

}
