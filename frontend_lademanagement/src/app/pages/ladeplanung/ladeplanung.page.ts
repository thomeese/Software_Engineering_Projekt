import {
  Component,
  OnInit,
  ChangeDetectorRef, OnDestroy
} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {CalendarEvent} from 'angular-calendar';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {LoadingController, ModalController} from '@ionic/angular';
import {BuchungPage} from './buchung/buchung.page';
import {SlotPlanungServiceService} from 'src/app/services/slot-planung-service.service';
import {Reservierung, Slot} from '../../interfaces/interfaces';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import {DetailInfoComponent} from './detail-info/detail-info.component';

registerLocaleData(localeDE);


@Component({
  selector: 'app-ladeplanung',
  templateUrl: './ladeplanung.page.html',
  styleUrls: ['./ladeplanung.page.scss'],
})


//Basis Kalender hier zu finden: https://mattlewis92.github.io/angular-calendar/#/responsive-week-view
export class LadeplanungPage implements OnInit, OnDestroy {
  language = localeDE;
  viewDate: Date = new Date();
  //Anzahl der zu zeigenden naechsten Tage
  daysInWeek = 7;
  //Timeline erste Stunde
  dayStartHour = 8;
  //Timeline letzte Stunde
  dayEndHour = 22;
  //Bestimmt ob, die Buttons fuer die Anzeige der naechsten/vorherigen Tage der Wochenspannweite angezeigt werden
  showButtons = false;

  ownReservierungen: Reservierung[] = [];
  freeSlots: Slot[] = [];

  //Haelt die Kalendereintraege, welche angezeigt werden sollen
  events: CalendarEvent[] = null;

  private destroy$ = new Subject<void>();

  constructor(
    private slotplanungService: SlotPlanungServiceService,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {

    this.holeTermine();

    // Dient zum Setzen der Variablen abhaengig von der Bildschirmgroesse
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

    //Beobachtet die Bildschirmgroesse und aendert den Kalender und die Anzeige der Buttons abhaengig davon
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

  async openDetailModal(reservierung: Reservierung){
    const modal = await this.modalCtrl.create({
      component: DetailInfoComponent,
      componentProps: {
        reservierung
      },
      backdropDismiss: true
    });

    await modal.present();
  }
  async openBookSlotModal(startDate: Date, endDate: Date) {
    const modal = await this.modalCtrl.create({
      component: BuchungPage,
      componentProps: {
        startDate,
        endDate
      },
      backdropDismiss: true
    });

    await modal.present();
  }


  //wird beim Anklicken eines Kalendereintrags ausgefuehrt
  handleEvent(action: string, event: CalendarEvent): void {
    if (event.title === 'Meine Buchung') {
      //eigene Buchung angeklickt, passende Reservierung suchen
      for(const data of this.ownReservierungen){
        if(data.slot.startzeit === event.start && data.slot.endzeit === event.end){
          //Detailansicht starten
          this.openDetailModal(data);
        }
      }
    } else if (event.title === 'Frei') {
      //Freien Slot angeklickt Buchung starten
      this.openBookSlotModal(event.start, event.end);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  /**
   * Holt alle freien Slots der naechsten sieben Tage und erstellt die dazugehoerigen Kalendereintraege.
   *
   * @return gibt die Kalendereintrage zurueck.
   */
  async holeFreieSlots(): Promise<CalendarEvent[]>{
      const asyncEvents: CalendarEvent[] = [];
      //Zeitraume vom ZeitplanungService holen
      //Freie Slots holen
      const data = await this.slotplanungService.getFreeSlots().toPromise();
      for (const slot of data) {
        this.freeSlots.push(slot);
        asyncEvents.push({
          start: slot.startzeit,
          end: slot.endzeit,
          title: 'Frei',
          color: {
            primary: 'blue',
            secondary: 'white'
          }
        });
      }
      return asyncEvents;
  }

  /**
   * Holt alle eigenen Reservierungen der naechsten sieben Tage und erstellt die dazugehoerigen Kalendereintraege.
   *
   * @return gibt die Kalendereintrage zurueck.
   */
  async holeEigeneReservierungen(): Promise<CalendarEvent[]> {
      const data = await this.slotplanungService.getOwnReservierungen().toPromise();
        const asyncEvents: CalendarEvent[] = [];
        for (const reservierung of data) {
          this.ownReservierungen.push(reservierung);
          asyncEvents.push({
            start: reservierung.slot.startzeit,
            end: reservierung.slot.endzeit,
            title: 'Meine Buchung',
            color: {
              primary: 'yellow',
              secondary: 'white'
            }
          });
        }
        return asyncEvents;
  }

  /**
   * Ruft die beiden Methoden zum Holen der eigenen und freien Slots der naechsten sieben Tage auf fuegt im Anschluss
   * die Rueckgabewerte zusammen zu der this.events variablen, damit der Kalender angezeigt wird.
   *
   * Waehrend das Holen nicht abgeschlossen ist, wird ein Ladespinner angezeigt.
   */
  private async holeTermine() {
    const loading = await this.loadingCtrl.create({
      message: 'Lade Kalendereinträge',
      duration: 3000,
      spinner: 'circles',
    });
    await loading.present();
    const eigeneReservierungen = await this.holeEigeneReservierungen() as CalendarEvent[];
    const freieSlots =  await this.holeFreieSlots() as CalendarEvent[];
    this.events = eigeneReservierungen.concat(freieSlots);
    await loading.dismiss();
  }
}
