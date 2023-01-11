import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {KonstantenLogin} from '../../interfaces/interfaces';
import {KonfigurationskonstantenService} from '../../services/konfigurationskonstanten.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
/**
 * Klasse die Daten fuer das Login verarbeitet.
 *
 * @author Thomas Meese
 */
export class LoginPage implements OnInit {
  loginFrom: FormGroup;
  regexPasswort = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$'; //Maybe not needed
  private loginKonstanten: KonstantenLogin;

  constructor(private formbuilder: FormBuilder,
              private authService: AuthenticationService,
              private konstantenService: KonfigurationskonstantenService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private router: Router) {
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
    this.setCSS();
  }

  /**
   * Passt die CSS-Variablen fuer die Groesse der Card in Abhaengigkeit der
   * Fenstergroesse an
   *
   * @author Thomas Meese
   */
  setCSS() {
    const screenWidth = window.innerWidth;
    const element = document.getElementsByClassName('form-card')[0] as HTMLElement;
    if (screenWidth > 800) {
      element.style.height = '50%';
      element.style.width = '50%';
      element.style.marginLeft = '25%';
    } else {
      element.style.height = '50%';
      element.style.width = '80%';
      element.style.marginLeft = '10%';
    }
  }

  ngOnInit() {
    this.loginKonstanten = this.konstantenService.getKonstantenLogin();
    //Form generieren
    this.loginFrom = this.formbuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.loginKonstanten.emailRegex)]),
      password: new FormControl('', []),
    });
    this.setCSS();
  }

  /**
   * meldet einen nicht angemeldeten Benutzer mittels E-Mail-Adresse an
   *
   * @author Thomas Meese
   */
  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();
    const loggedInUser = await this.authService.signIn(this.loginFrom.value);
    loggedInUser.subscribe(res => {
      if (res === true) {
        this.router.navigateByUrl('/ladeplanung', {replaceUrl: true});
      } else {
        this.displayAlert('Anmeldung fehlgeschlagen', 'Versuchen Sie es Bitte erneut');
      }
      loading.dismiss();
    });
  }

  /**
   * zeigt ein Alert an.
   *
   * @param header - Titel
   * @param message - anzuzeigende Nachricht
   * @author Thomas Meese
   */
  async displayAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Schließen'],
    });
    await alert.present();
  }
}
