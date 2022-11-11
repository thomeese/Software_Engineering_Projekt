import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BuchungPage} from './buchung/buchung.page';


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
      component: BuchungPage,
      componentProps: {
        date
      },
      backdropDismiss: true
    });

    await modal.present();
  }
}
