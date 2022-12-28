import {Component, Input, LOCALE_ID, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {SlotPlanungService} from '../../../services/slot-planung.service';
import {format} from 'date-fns';
import {konfigurationsKonstanten, Slot} from '../../../interfaces/interfaces';
import {catchError } from 'rxjs/operators';
import {of} from 'rxjs';
import { KonfigurationskonstantenService } from 'src/app/services/konfigurationskonstanten.service';

@Component({
  selector: 'app-buchung',
  templateUrl: './buchung.page.html',
  styleUrls: ['./buchung.page.scss'],
})
/**
 * @author Thomas Meese, Manuel Arling
 */
export class BuchungPage implements OnInit {
  @Input() startDate: Date; // zu reservierender Tag
  @Input() endDate: Date; // zu reservierender Tag
  private reservierungForm: FormGroup;

  private konfigurationsKonstanten: konfigurationsKonstanten;

  constructor(private formbuilder: FormBuilder,
              private modalctrl: ModalController,
              private slotplanungService: SlotPlanungService,
              private konfigurationsKonstantenService: KonfigurationskonstantenService) {
  }

  ngOnInit() {
    //Konstanten vom Backend laden
    this.konfigurationsKonstanten = this.konfigurationsKonstantenService.getKonfigurationsKonstanten();

    //Reactive-form erstellen
    //Formatiere Date zu ISOString mit Timezonen Beruecksichtigung
    const startDateISOWithTimezone = new Date(this.startDate.getTime() - (this.startDate.getTimezoneOffset() * 60000)).toISOString();
    const endDateISOWithTimezone = new Date(this.endDate.getTime() - (this.endDate.getTimezoneOffset() * 60000)).toISOString();
    
    
    this.reservierungForm = this.formbuilder.group({
        startzeit: new FormControl(startDateISOWithTimezone, Validators.required),
        endzeit: new FormControl(endDateISOWithTimezone, Validators.required)
      },
      {
        validator: this.validateTime()
      });
  }

  formateDate() {
    return format(new Date(this.startDate), 'EEEE dd.MM.yyyy').toString();
  }

  /**
   * prueft die Nutzereingabe. Es wird dabei validiert, ob die gehaehlten Zeiten
   * den Regeln des Regelwerks entsprechen.
   */
  validateTime(): ValidatorFn {
    return (checkForm: FormGroup): { [key: string]: boolean } => {
      const startzeit: Date = new Date(checkForm.get('startzeit').value);
      const endzeit: Date = new Date(checkForm.get('endzeit').value);
      console.log(startzeit);
      console.log(endzeit);
      if (startzeit >= endzeit) {
        return {smaller: true};
      } else if ((endzeit.getTime() - startzeit.getTime()) / 1000 / 60 < this.konfigurationsKonstanten.minimale_ladedauer_minuten) {
        return {mintimeError: true};
      } else if ((endzeit.getTime() - startzeit.getTime()) / 1000 / 60 > this.konfigurationsKonstanten.maximale_ladedauer_minuten) {
        return {maxtimeError: true};
      } else { //TODO: Hier sollen nach dem Durchstich die weiteren Pruefungen ergaenzt werden
        return null;
      }
    };
  }

  /**
   * Methode zum Erstellen und Anzeigen eines neuen Alerts mit den übergebenen error Array als auszugebender Text.
   * 
   * @param errorReasons der im Alert anzuzeigender Text.
   * @author Manuel Arling
   */
  showErrorsAlert(errorReasons: String[]) {
    alert(errorReasons);
  }

  /**
   * Die Funktion uebermittelt die vom Nutzer eingegebenen Daten
   * an die REST-Schnitstelle. Fuer die Uebermittlung wird der
   * Service SlotplanungService verwendet.
   * 
   * Der Response wird auf Gueltigkeit geprueft, bei einem Fehler wird der error Text ausgegeben.
   * 
   * @author Thomas Meese, Manuel Arling
   */
  async reservierungBuchen() {
    const reservierung: Slot = {
      //Z aus DateString entfernen, da es sonst dem ISO 8601 entspricht
      // eslint-disable-next-line max-len
      startzeit: this.reservierungForm.getRawValue().startzeit.toString().replace('Z', '').split('+')[0], //TODO: schoenere anpassung bezueglich ISO 8601 entsprechen
      endzeit: this.reservierungForm.getRawValue().endzeit.toString().replace('Z', '').split('+')[0],
    };
    console.log('Reservierung erstellen.');
    this.slotplanungService.postBookedSlot(reservierung).pipe(
      catchError(error => {
        this.showErrorsAlert(error.error);
        return of(0);
      })
    ).subscribe(reservierung => {
      if(reservierung != 0) {
        //Das erhaltene Reservierungsobjekt wird momentan nicht verwendet.
        console.log(reservierung);
      }
      this.closeModal();
    });
  }

  async closeModal() {
    await this.modalctrl.dismiss();
  }
}
