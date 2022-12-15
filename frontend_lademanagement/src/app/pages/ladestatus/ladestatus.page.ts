import {Component, HostListener, OnInit} from '@angular/core';
import {Ladestatus, Reservierung} from '../../interfaces/interfaces';
import {SlotPlanungServiceService} from '../../services/slot-planung-service.service';

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

  remainingSlottime: number;
  batteryFluidColor: string;

  isCharging = false;
  haeader: string;
  fullscreen = true;

  constructor(private slotplanung: SlotPlanungServiceService) {
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
    } else {
      this.fullscreen = true;
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

  async setup() {
    this.ladestatus = await this.slotplanung.getLadestatus().toPromise();
    if (this.ladestatus === null) {
      this.ladestatus = {
        ladestand: 10,
        geladeneEnergie: 0,
        ladedauer: new Date()
      };
    }
    if (this.ladestatus.ladestand === 0 && this.ladestatus.geladeneEnergie === 0) {
      this.haeader = 'Kein Fahrzeug von Ihnen wird derzeit geladen';
      this.isCharging = false;
    } else {
      this.haeader = 'Ihr Fahrzeug wird geladen';
      this.isCharging = true;
    }
    if (this.isCharging) {
      const data: Reservierung[] = await this.slotplanung.getOwnReservierungen().toPromise();
      const now: Date = new Date();
      for (const reservierung of data) {
        if (reservierung.slot.startzeit.getTime() < now.getTime() && reservierung.slot.endzeit.getTime() > now.getTime()) {
          this.remainingSlottime = reservierung.slot.endzeit.getTime() - now.getTime();
        }
      }
    }
    this.changeBattery();
  }

  /**
   * Rechnet millisekunden in Stunden, Minuten, ... um.
   *
   * @param ms - umzuwandelnde Zeit
   */
  msToTime(ms: number) {
    const seconds = Number((ms / 1000).toFixed(1));
    const minutes = Number((ms / (1000 * 60)).toFixed(1));
    const hours = Number((ms / (1000 * 60 * 60)).toFixed(1));
    const days = Number((ms / (1000 * 60 * 60 * 24)).toFixed(1));
    if (seconds < 60) {
      return seconds + ' Sekunden';
    } else if (minutes < 60) {
      return minutes + ' Minuten';
    } else if (hours < 24) {
      return hours + ' Stunden';
    } else {
      return days + ' Tage';
    }
  }

  ngOnInit() {
    this.setup();
  }

}
