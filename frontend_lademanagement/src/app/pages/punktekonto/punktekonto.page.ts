import {Component, OnInit} from '@angular/core';
import {Punktekonto} from '../../interfaces/interfaces';
import {SlotPlanungService} from '../../services/slot-planung.service';

@Component({
  selector: 'app-punktekonto',
  templateUrl: './punktekonto.page.html',
  styleUrls: ['./punktekonto.page.scss'],
})
export class PunktekontoPage implements OnInit {
  punktekonto: Punktekonto;

  constructor(private slotplanung: SlotPlanungService) {
  }

  async holePunktekontoInformationen() {
    this.punktekonto = await this.slotplanung.getPunktekontoInformations().toPromise();
  }

  ngOnInit() {
    this.holePunktekontoInformationen();
  }

}
