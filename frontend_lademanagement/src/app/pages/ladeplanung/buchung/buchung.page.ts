import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {Reservierung, SlotplanungServiceService} from '../../../services/slotplanung-service.service';
import {format} from 'date-fns';

@Component({
  selector: 'app-buchung',
  templateUrl: './buchung.page.html',
  styleUrls: ['./buchung.page.scss'],
})
export class BuchungPage implements OnInit {
  @Input() date: Date; // zu reservierender Tag
  reservierungForm: FormGroup;

  constructor(private formbuilder: FormBuilder,
              private modalctrl: ModalController,
              private slotplanungService: SlotplanungServiceService) {
  }

  ngOnInit() {
    this.reservierungForm = this.formbuilder.group({
        startzeit: new FormControl(new Date().toISOString(), Validators.required),
        endzeit: new FormControl(new Date().toISOString(), Validators.required)
      },
      {
        validator: this.validateTime()
      });
  }

  formateDate() {
    return format(new Date(this.date), 'EEEE dd.MM.yyyy').toString();
  }

  /**
   * prueft die Nutzereingabe. Es wird dabei validiert ob die gehaehlten Zeiten
   * den Regeln des Regelwerks entsprechhen
   */
  validateTime(): ValidatorFn {
    return (checkForm: FormGroup): { [key: string]: boolean } => {
      const startzeit: Date = checkForm.getRawValue().startzeit;
      const endzeit: Date = checkForm.getRawValue().endzeit;
      if (startzeit > endzeit) {
        console.log('');
        return {smaller: true};
      } else { //Hier sollen nach dem Durchstich die weiteren Pruefungen ergaenzt werden
        console.log('cool');
        return null;
      }
    };
  }

  async reservierungBuchen() {
    const reservierung: Reservierung = {
      mitarbeiterID: '02347234',
      startzeit: this.reservierungForm.getRawValue().startzeit.toString(),
      endzeit: this.reservierungForm.getRawValue().endzeit.toString(),
    };
    this.slotplanungService.postBookedSlot(reservierung);
    await this.modalctrl.dismiss();
  }
}
