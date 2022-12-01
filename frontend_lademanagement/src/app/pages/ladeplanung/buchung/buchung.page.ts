import {Component, Input, LOCALE_ID, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {SlotPlanungServiceService} from '../../../services/slot-planung-service.service';
import {format} from 'date-fns';
import {Zeitslot} from '../../../interfaces/interfaces';

@Component({
  selector: 'app-buchung',
  templateUrl: './buchung.page.html',
  styleUrls: ['./buchung.page.scss'],
})
/**
 * @author Thomas Meese
 */
export class BuchungPage implements OnInit {
  @Input() startDate: Date; // zu reservierender Tag
  @Input() endDate: Date; // zu reservierender Tag
  private reservierungForm: FormGroup;
  private minSlottime = 30;
  private maxSlottime = 120;

  constructor(private formbuilder: FormBuilder,
              private modalctrl: ModalController,
              private slotplanungService: SlotPlanungServiceService) {
  }

  ngOnInit() {
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
      if (startzeit >= endzeit) {
        return {smaller: true};
      } else if ((endzeit.getTime() - startzeit.getTime()) / 1000 / 60 < this.minSlottime) {
        return {mintimeError: true};
      } else if ((endzeit.getTime() - startzeit.getTime()) / 1000 / 60 > this.maxSlottime) {
        return {maxtimeError: true};
      } else { //TODO: Hier sollen nach dem Durchstich die weiteren Pruefungen ergaenzt werden
        return null;
      }
    };
  }

  /**
   * Die Funktion uebermittelt die vom Nutzer eingegebenen Daten
   * an die REST-Schnitstelle. Fuer die Uebermittlung wird der
   * Service SlotplanungService verwendet.
   */
  async reservierungBuchen() {
    const reservierung: Zeitslot = {
      //Z aus DateString entfernen, da es sonst dem ISO 8601 entspricht
      // eslint-disable-next-line max-len
      startzeit: this.reservierungForm.getRawValue().startzeit.toString().replace('Z', '').split('+')[0], //TODO: schoenere anpassung bezueglich ISO 8601 entsprechen
      endzeit: this.reservierungForm.getRawValue().endzeit.toString().replace('Z', '').split('+')[0],
    };
    console.log('Reservierung erstellen.');
    this.slotplanungService.postBookedSlot(reservierung).subscribe(slotID => {
      console.log('SlotID: ');
      console.log(slotID);
      this.closeModal();
    });
  }

  async closeModal() {
    await this.modalctrl.dismiss();
  }
}
