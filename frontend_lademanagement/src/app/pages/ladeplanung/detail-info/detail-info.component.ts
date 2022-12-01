import {Component, Input, OnInit} from '@angular/core';
import {Reservierung} from '../../../interfaces/interfaces';
import {ModalController} from '@ionic/angular';
import {format} from 'date-fns';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss'],
})
export class DetailInfoComponent implements OnInit {
  @Input() reservierung: Reservierung;

  constructor(private modalctrl: ModalController) {
  }

  ngOnInit() {
  }

  /**
   * Formatiert das Datum der Startzeit im Format dd.MM.yyyy
   */
  formateDate() {
    return format(new Date(this.reservierung.slot.startzeit), 'dd.MM.yyyy').toString();
  }

  /**
   *
   * @param date zu formatierendes Datum
   */
  formatTime(date: Date) {
    return format(new Date(date), 'HH:mm').toString();
  }

  async closeModal() {
    await this.modalctrl.dismiss();
  }

}
