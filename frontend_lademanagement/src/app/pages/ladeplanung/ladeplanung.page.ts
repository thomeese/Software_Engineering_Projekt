import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SlotplanungServiceService } from 'src/app/services/slotplanung-service.service';



export interface Slot {
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

  viewDate: Date = new Date();

  //Anzahl der zu zeigenden naechsten Tage
  daysInWeek = 7;
  //Timeline erste Stunde
  dayStartHour = 8;
  //Timeline letzte Stunde
  dayEndHour = 22;

  ownSlots: Slot[] = [];
  freeSlots: Slot[] = [];
  events: CalendarEvent[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private slotplanungService: SlotplanungServiceService,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //Zeitraume vom ZeitplanungService holen

    //Freie Slots holen
    //this.slotplanungService.getFreeSlots().subscribe((data: Slot[]) => this.freeSlots = data);
    for(let slot of this.freeSlots) {
      this.events.push({
        start: slot.start, 
        end: slot.stop,
        title: "frei",
        color: {
            primary: "blue",
            secondary: "white"}
        })
    }

    //Eigene Slots holen
    //this.slotplanungService.getOwnSlots().subscribe((data: Slot[]) => this.ownSlots = data);
    for(let slot of this.freeSlots) {
      this.events.push({
        start: slot.start, 
        end: slot.stop,
        title: "Meine Buchung",
        color: {
            primary: "gelb",
            secondary: "white"},
        actions: [
          {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
            //Im Durchstich nicht gefordert
            //hier erfolgt später das löschen/bearbeiten eines eigenen bereits gebuchten Slot
            },
          },
        ]
      })
    }


    //Beispiel Event
    this.events.push({
      start: new Date(), 
      end: new Date("2022-11-10"),
      title: "Meine Buchung",
      color: {
          primary: "black",
          secondary: "blue"},
      actions: [
        {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
          //Im Durchstich nicht gefordert
          //hier erfolgt später das löschen/bearbeiten eines eigenen bereits gebuchten Slot
          },
        },
      ]
    })

    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 7,
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 7;
        }
        this.cd.markForCheck();
      });
  } 

  //Gibt die vorherigen Tage abhaengig von der Bildschirmgroesse aus
  //Es wird minimal der heutige Tag angezeigt
  previousDays() {
    let setDate = new Date(this.viewDate.setDate(this.viewDate.getDate() - this.daysInWeek));
    let date = new Date();
    if(setDate.getTime() > date.getTime()) {
      this.viewDate = setDate;
    } else {
      //erster Tag der naechsten sieben Tage
      this.viewDate = date;
    }
  }

  //Gibt die naechsten Tage abhaengig von der Bildschirmgroesse aus
  //Es kann maximal der naechste siebte Tag angezeigt werden
  nextDays() {
    let setDate = new Date(this.viewDate.setDate(this.viewDate.getDate() + this.daysInWeek));
    let date = new Date();
    date = new Date(date.setDate(date.getDate() + 7 - this.daysInWeek));
    if(setDate.getTime() > date.getTime()) {
      this.viewDate = date;
    } else {
      //erster Tag der naechsten sieben Tage
      this.viewDate = setDate;
    }
  }

  openBookSlotModal() {
    //Component Slot buchen oeffnen
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
