import {
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SlotplanungServiceService } from 'src/app/services/slotplanung-service.service';
import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BuchungPage} from './buchung/buchung.page';
import {SlotPlanungServiceService} from 'src/app/services/slot-planung-service.service';

import {AUTO_STYLE} from '@angular/animations';

interface SlotJSON {
  start: number;
  stop: number;
}

interface Slot {
  start: Date;
  stop: Date;
}

@Component({
  selector: 'app-ladeplanung',
  templateUrl: './ladeplanung.page.html',
  styleUrls: ['./ladeplanung.page.scss'],
})
//https://mattlewis92.github.io/angular-calendar/#/responsive-week-view
export class LadeplanungPage implements OnInit {
  date: Date = new Date();
  viewDate: Date = new Date();
  //Anzahl der zu zeigenden naechsten Tage
  daysInWeek = 7;
  //Timeline erste Stunde
  dayStartHour = 8;
  //Timeline letzte Stunde
  dayEndHour = 22;
  //Bestimmt ob, die Buttons fuer die Anzeige der naechsten/vorherigen Tage der Wochenspannweite angezeigt werden
  showButtons = false;

  ownSlots: Slot[] = [];
  freeSlots: Slot[] = [];
  events: CalendarEvent[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private slotplanungService: SlotPlanungServiceService,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    //Zeitraume vom ZeitplanungService holen
    //Freie Slots holen
    this.slotplanungService.getFreeSlots().subscribe((data: SlotJSON[]) => {
      for (const slotJSON of data) {
        //Slot konvertieren um Objekt Date zu nutzen fuer Kalenderansicht
        const slot: Slot = {start: new Date(slotJSON.start * 1000), stop: new Date(slotJSON.start * 1000)};
        this.freeSlots.push(slot);
        this.events.push({
          start: slot.start,
          end: slot.stop,
          title: 'frei',
          color: {
            primary: 'blue',
            secondary: 'white'
          }
        });
      }
    });
    //Eigene Slots holen
    this.slotplanungService.getOwnSlots().subscribe((data: SlotJSON[]) => {
      for (const slotJSON of data) {
        //Slot konvertieren um Objekt Date zu nutzen fuer Kalenderansicht
        const slot: Slot = {start: new Date(slotJSON.start * 1000), stop: new Date(slotJSON.start * 1000)};
        this.ownSlots.push(slot);
        this.events.push({
          start: slot.start,
          end: slot.stop,
          title: 'Meine Buchung',
          color: {
            primary: 'gelb',
            secondary: 'white'
          }
        });
      }
    });
    //Beispiel Event Meine Buchung
    this.events.push({
      start: new Date(1668157200 * 1000),
      title: 'Meine Buchung',
      color: {
        primary: 'black',
        secondary: 'blue'
      }
    });
    this.events.push({
      start: new Date(1668243600 * 1000),
      end: new Date(1668250800 * 1000),
      title: 'frei',
      color: {
        primary: 'black',
        secondary: 'green'
      }
    });

    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
        showButtons: true
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
        showButtons: true
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 7,
        showButtons: false
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({breakpoint}) => breakpoint))
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({breakpoint}) => !!state.breakpoints[breakpoint]
        );
        //Setzt die neue Anzeigeeinstellung entsprechend dem neuen Breakpoint
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
          this.showButtons = foundBreakpoint.showButtons;
        } else {
          this.daysInWeek = 7;
          this.showButtons = false;
        }
        this.cd.markForCheck();
      });
  }
  //Gibt die vorherigen Tage abhaengig von der Bildschirmgroesse aus
  //Es wird minimal der heutige Tag angezeigt
  previousDays() {
    const setDate = new Date(this.viewDate.setDate(this.viewDate.getDate() - this.daysInWeek));
    const date = new Date();
    if (setDate.getTime() > date.getTime()) {
      this.viewDate = setDate;
    } else {
      //erster Tag der naechsten sieben Tage
      this.viewDate = date;
    }
  }
  //Gibt die naechsten Tage abhaengig von der Bildschirmgroesse aus
  //Es kann maximal der naechste siebte Tag angezeigt werden
  nextDays() {
    const setDate = new Date(this.viewDate.setDate(this.viewDate.getDate() + this.daysInWeek));
    let date = new Date();
    date = new Date(date.setDate(date.getDate() + 7 - this.daysInWeek));
    if (setDate.getTime() > date.getTime()) {
      this.viewDate = date;
    } else {
      //erster Tag der naechsten sieben Tage
      this.viewDate = setDate;
    }
  }
  async openBookSlotModal(date: Date) {
    const modal = await this.modalCtrl.create({
      component: BuchungPage,
      componentProps: {
        date
      },
      backdropDismiss: true
    });

    await modal.present();
  }

  //wird beim anklicken eines Events ausgefuehrt

  handleEvent(action: string, event: CalendarEvent): void {
    if (event.title === 'Meine Buchung') {
      //Meine Buchung bearbeiten
      console.log('Meine Buchung bearbeiten');
    } else if (event.title === 'frei') {
      //Freien Slot angeklickt Bchung starten
      console.log('Freier Slot');
      this.openBookSlotModal(event.start, event.end);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
