import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthConst } from 'app/@core/consts/auth.const';
import { UserService } from '../../@core/services/user.service';

@Component({
  selector: 'app-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrls: ['./confirm-login.component.scss'],
})
export class ConfirmLoginComponent implements OnInit {
  confirmToken;
  errorBoolean;
  errorMessage;
  currentLang;
  text ='Bitte bestätigen Sie Ihre Registrierung.';
  buttonText = 'Konto bestätigen';
  language;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.confirmToken = queryParams.token;
    });
    this.translate.use(localStorage.getItem(AuthConst.language));
    this.language = localStorage.getItem(AuthConst.language);
    this.currentLang = this.language;
    this.setLanguage();
  }

  goTo(): void {
    this.userService.confirmAccount(this.confirmToken).subscribe(
      (x) => {
        if (x) {
          this.router.navigate(['/site']);
        }
      },
      (error) => {
        if (error.text === 'OK') {
          this.router.navigate(['/site']);
        } else {
          this.errorBoolean = true;
          this.errorMessage = 'No token!';
        }
      }
    );
  }

  setLanguage() {
    if (this.currentLang === 'en') {
      this.text='Please, confirm your registration.',
      this.buttonText = 'Confirm account'
    } else if (this.currentLang === 'fr') {
      this.text='Veuillez confirmer votre inscription.',
      this.buttonText = 'Confirmer le compte'
    } else if (this.currentLang === 'de') {
      this.text='Bitte bestätigen Sie Ihre Registrierung.',
      this.buttonText = 'Konto bestätigen'
    } else if (this.currentLang === 'it') {
      this.text='Per favore, conferma la tua registrazione',
      this.buttonText = "Confermare l'account"
    }
  }
}
