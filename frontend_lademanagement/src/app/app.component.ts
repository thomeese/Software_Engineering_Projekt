import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Ladeplanung', url: '/ladeplanung', icon: 'calendar'},
  ];
  public labels = [];

  constructor() {
  }

}
