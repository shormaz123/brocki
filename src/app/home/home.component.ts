import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthConst } from 'app/@core/consts/auth.const';
import { TranslateServiceRest } from 'app/@core/services/translateREST.service';
import { WishlistService } from 'app/@core/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  notify: any;
  language: string;
  currentLang: string;

 // snackbar properties
 message;
 actionButtonLabel;
 action = true;
 setAutoHide = true;
 autoHide = 5000;
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';

 addExtraClass: boolean = false;

 //



  constructor(
    private translateService: TranslateService,
    private translateBackend: TranslateServiceRest,
    public snackBar: MatSnackBar,
    ) {}

  ngOnInit() {
    this.language = localStorage.getItem(AuthConst.language);
    this.currentLang = this.language;
    this.change(this.currentLang)
  }

  change(code: string) {
    this.translateService.use(code);
    this.translateBackend.sendLanguage(code);
    this.currentLang = code;
    this.setLanguage();
  }

  openSnackbar() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  setLanguage() {
    if (this.currentLang === 'en') {
      return (
        this.message = 'Not yet available!',
        this.actionButtonLabel = 'Ok'
      )

    } else if (this.currentLang === 'fr') {
      this.message = 'Pas encore disponible!',
      this.actionButtonLabel = "D'accord";
    } else if (this.currentLang === 'de') {
      this.message = 'Noch nicht verfügbar!',
      this.actionButtonLabel = 'In Ordnung';
    } else if (this.currentLang === 'it') {
      this.message = "Non ancora disponibile!",
      this.actionButtonLabel = 'Ok';
    }
  }

}


