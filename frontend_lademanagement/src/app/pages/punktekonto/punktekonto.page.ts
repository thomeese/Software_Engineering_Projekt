import {Component, HostListener, OnInit} from '@angular/core';
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
  fullsScreen = true;

  constructor(private slotplanung: SlotPlanungService) {
  }
  /**
   * Prueft, ob die Bildschirmgroesse fuer die jeweilige ansicht ausreichend ist und passt ggf.
   * die Ansicht an.
   *
   * @param event - Resize event
   * @author Thomas Meese
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreen();
  }

  /**
   * Prueft aktuelle Bildschirmgroesse
   *
   * @author Thomas Meese
   */
  checkScreen() {
    const screenWidth = window.innerWidth;
    this.fullsScreen = screenWidth >= 900;
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
    this.checkScreen();
  }

}
