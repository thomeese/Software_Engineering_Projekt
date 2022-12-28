import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFrom: FormGroup;
  regexEmail = '.*@koszarek.ml';
  regexPasswort = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$'; //Maybe not needed

  constructor(private formbuilder: FormBuilder,
              private authService: AuthenticationService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private router: Router) {
  }

  ngOnInit() {
    //Form generieren
    this.loginFrom = this.formbuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.regexEmail)]),
      password: new FormControl('', []),
    });
  }

  /**
   * meldet einen nicht angemeldeten Benutzer mittels E-Mail adresse an
   */
  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();
    const loggedInUser = await this.authService.signIn(this.loginFrom.value);
    await loading.dismiss();
  }

  /**
   * zeigt ein Alert an.
   *
   * @param header - Titel
   * @param message - anzuzeigende Nachricht
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
