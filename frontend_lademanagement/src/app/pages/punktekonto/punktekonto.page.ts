import {Component, OnInit} from '@angular/core';
import {Punktekonto} from '../../interfaces/interfaces';
import {SlotPlanungService} from '../../services/slot-planung.service';

@Component({
  selector: 'app-punktekonto',
  templateUrl: './punktekonto.page.html',
  styleUrls: ['./punktekonto.page.scss'],
})
/**
 * Klasse die der Darstellung der Informationen zum Punktekonto fuer die Visualisierung aufbereitet.
 *
 * @author Thomas Meese
 */
export class PunktekontoPage implements OnInit {
  punktekonto: Punktekonto;

  constructor(private slotplanung: SlotPlanungService) {
  }

  /**
   * Holt die Informationen zum Punktekonto (aktuell nur den Punktestand).
   *
   * @author Thomas Meese
   */
  async holePunktekontoInformationen() {
    this.punktekonto = await this.slotplanung.getPunktekontoInformations().toPromise();
  }

  ngOnInit() {
    this.holePunktekontoInformationen();
  }

}
