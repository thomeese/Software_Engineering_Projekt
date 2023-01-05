import {Component, HostListener, OnInit} from '@angular/core';
import {Ladestatus, Reservierung} from '../../interfaces/interfaces';
import {SlotPlanungService} from '../../services/slot-planung.service';

@Component({
  selector: 'app-ladestatus',
  templateUrl: './ladestatus.page.html',
  styleUrls: ['./ladestatus.page.scss'],
})
/**
 * Klasse die, die Daten fuer die Darstellung des Ladestatusees aufbereitet.
 *
 * @author Thomas Meese
 */
export class LadestatusPage implements OnInit {
  ladestatus: Ladestatus;

  remainingSlottime: number;

  batteryFluidColor: string;

  isCharging = false;
  haeader: string;
  fullscreen = true;
  fahrzeugVoll = false;
  constructor(private slotplanung: SlotPlanungService) {
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
    if (this.ladestatus.ladestandProzent <= 20) {
      this.batteryFluidColor = 'red';
    } else if (this.ladestatus.ladestandProzent <= 40) {
      this.batteryFluidColor = 'orange';
    } else if (this.ladestatus.ladestandProzent <= 80) {
      this.batteryFluidColor = 'yellow';
    } else if (this.ladestatus.ladestandProzent <= 100) {
      this.batteryFluidColor = 'lightgreen';
    }
  }

  /**
   * holt alle benoetigeten Daten fuer die Visualisierung auf der Seite
   * und bereitet sie auf. Die angezeigte Batterie und die Texte werden
   * entsprechend des erhaltenen Statuses angepasst.
   */
  async setup() {
    //Ladestatus holen
    this.ladestatus = await this.slotplanung.getLadestatus().toPromise();
    //falls nicht geladen wird Mock werte setzen
    if (this.ladestatus === null) {
      this.ladestatus = {
        geladeneEnergieKwH: 0,
        ladestandProzent: 0,
        ladedauerStundenMinuten: {
          stunden: 0,
          minuten: 0
        }
      };
    }
    if (this.ladestatus.ladestandProzent === 0 && this.ladestatus.geladeneEnergieKwH === 0) { // Kein Fahrzeug wird geladen
      this.haeader = 'Kein Fahrzeug von Ihnen wird derzeit geladen';
      this.isCharging = false;
    } else  if (this.ladestatus.ladestandProzent === 100){ // Fahrzeug ist voll
      this.haeader = 'Ihr Fahrzeug ist vollständig geladen und kann abgeholt werden';
      this.fahrzeugVoll = true;
    } else{ // Fahrzeug wird geladen
      this.haeader = 'Ihr Fahrzeug wird geladen';
      this.isCharging = true;
    }
    //wenn geladen wird, verbleibene Slotzeit berechenen
    if (this.isCharging) {
      const data: Reservierung[] = await this.slotplanung.getOwnReservierungen().toPromise();
      const now: Date = new Date();
      for (const reservierung of data) {
        if (reservierung.slot.startzeit.getTime() < now.getTime() && reservierung.slot.endzeit.getTime() > now.getTime()) {
          this.remainingSlottime = reservierung.slot.endzeit.getTime() - now.getTime();
        }
      }
    }
    //aussehen der Batterie anpassen
    this.changeBattery();
  }

  /**
   * Rechnet millisekunden in Stunden, Minuten, ... um.
   *
   * @param ms - umzuwandelnde Zeit
   */
  msToTime(ms: number) {
    const seconds = Number((ms / 1000).toFixed(1));
    const minutes = Number((seconds / 60).toFixed(1));
    const hours = Number((minutes / 60).toFixed(1));
    const days = Number((hours / 24).toFixed(1));
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
