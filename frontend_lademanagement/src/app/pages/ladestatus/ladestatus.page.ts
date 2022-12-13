import {Component, HostListener, OnInit} from '@angular/core';
import {Ladestatus} from '../../interfaces/interfaces';

@Component({
  selector: 'app-ladestatus',
  templateUrl: './ladestatus.page.html',
  styleUrls: ['./ladestatus.page.scss'],
})
export class LadestatusPage implements OnInit {
  ladestatus: Ladestatus = {
    ladestand: Math.floor(Math.random() * 100),
    geladeneEnergie: 100,
    ladedauer: new Date()
  };
  batteryFluidColor: string;
  fullscreen = true;
  smallscreen = false;

  constructor() {
  }

  /**
   * prueft, ob die Bildschirmgroesse fuer die jeweile ansicht ausreichend ist und passt ggf.
   * die Ansicht an.
   *
   * @param event - Resize event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1670) {
      this.fullscreen = false;
      this.smallscreen = true;
    } else {
      this.fullscreen = true;
      this.smallscreen = false;
    }
  }

  /**
   * passt das Aussehen der Batterieflueesigkeit an.
   */
  changeBattery() {
    if (this.ladestatus.ladestand <= 20) {
      this.batteryFluidColor = 'red';
    } else if (this.ladestatus.ladestand <= 40) {
      this.batteryFluidColor = 'orange';
    } else if (this.ladestatus.ladestand <= 80) {
      this.batteryFluidColor = 'yellow';
    } else if (this.ladestatus.ladestand <= 100) {
      this.batteryFluidColor = 'lightgreen';
    }
  }

  ngOnInit() {
    this.changeBattery();
  }

}
