import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BuchungComponent} from './buchung/buchung.component';


@Component({
  selector: 'app-ladeplanung',
  templateUrl: './ladeplanung.page.html',
  styleUrls: ['./ladeplanung.page.scss'],
})
export class LadeplanungPage implements OnInit {
  date: Date = new Date();

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  async openBookingForm(date: Date) {
    const modal = await this.modalCtrl.create({
      component: BuchungComponent,
      componentProps: {
        date
      }
    });

    await modal.present();
  }
}
