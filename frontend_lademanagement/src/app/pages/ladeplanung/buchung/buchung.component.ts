import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {format} from 'date-fns';

@Component({
  selector: 'app-buchung',
  templateUrl: './buchung.component.html',
  styleUrls: ['./buchung.component.scss'],
})
export class BuchungComponent implements OnInit {

  @Input() date: Date;
  reservierungForm: FormGroup;

  constructor(private formbuilder: FormBuilder,
              private modalctrl: ModalController) {
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
    return  format(new Date(this.date),'EEEE dd.MM.yyyy').toString();
  }

  validateTime(): ValidatorFn {
    return (checkForm: FormGroup): { [key: string]: boolean } => {
      const startzeit = new Date(checkForm.getRawValue().startzeit);
      const endzeit = new Date(checkForm.getRawValue().endzeit);
      console.log(startzeit);
      console.log(endzeit);
      if (startzeit >= endzeit) {
        return {smaller: true};
      } else { //Hier sollten spaeter noch weitere Checks kommen wie: passen min- und maxtime
        console.log('cool');
        return null;
      }
    };
  }

  async reservierungBuchen() {
    await this.modalctrl.dismiss();
  }

}
