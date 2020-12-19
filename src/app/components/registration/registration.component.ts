import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../../shared/models/userRegistration.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { AuthConst } from 'app/@core/consts/auth.const';
import { UserService } from 'app/@core/services/user.service';
import { AuthStore } from 'app/@core/services/auth.store';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registration: UserRegistration;
  registerForm: FormGroup;
  submitted = false;
  error = false;

  // snackbar properties

  message = this.translateService.instant('translate.confirmAccountText');
  actionButtonLabel = this.translateService.instant('translate.ok');
  action = true;
  setAutoHide = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //

  brockenstube: boolean;
  institution: boolean;
  private: boolean;
  business: boolean;
  errorMessage: string;
  addressAd: any;
  addressNumber: any;
  addressPostalCode: any;
  addressPlace: any;

  houseNumber: number;
  street: string;
  eye = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private translateService: TranslateService,
    public snackBar: MatSnackBar,
    public userService: UserService,
    private auth: AuthStore
  ) {}

  ngOnInit() {
    const completeAddress =
      `${this.addressAd} ` +
      `${this.addressNumber} ` +
      `${this.addressPostalCode} ` +
      `${this.addressPlace}`;

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      credit: [0, [Validators.required]],
      bussinesType: ['PRIVATE'],
      role_id: [3],
      terms: [false, [Validators.required]],
      street: ['', [Validators.required]],
      houseNumber: [''],
      postalNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
    this.brockenstube = true;
    this.institution = false;
    this.private = true;
    this.business = false;
    this.registerForm.controls.role_id.setValue(3);
  }

  toggleEye(): void {
    this.eye = !this.eye;
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid && this.registerForm.value.terms === true) {
      this.houseNumber = this.registerForm.value.street.replace(/\D/g, '');
      this.street = this.registerForm.value.street.replace(/[0-9]/g, '').trim();
      const userRegistration = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        userName: this.registerForm.value.userName,
        credit: 0,
        bussinesType: this.registerForm.value.bussinesType,
        role_id: this.registerForm.value.role_id,
        terms: this.registerForm.value.terms,
        street: this.street,
        houseNumber: this.houseNumber,
        postalNumber: this.registerForm.value.postalNumber,
        city: this.registerForm.value.city,
      };

      this.auth.loginAfterRegistration(userRegistration).subscribe(
        (response) => {
          this.openSnackbar(), this.router.navigate(['/site']);
        },
        (error) => {
          this.error = true;
          setTimeout(() => (this.error = false), 2000);
          this.errorMessage = error.message;
        }
      );
    } else {
      this.errorMessage = this.translateService.instant(
        'translate.fillEveryFieldError'
      );
      this.error = true;
      setTimeout(() => (this.error = false), 5000);
    }
  }

  brockButton(string: string) {
    this.brockenstube = true;
    this.institution = false;
    this.registerForm.controls.bussinesType.setValue(string);
  }

  instButton(string: string) {
    this.institution = true;
    this.brockenstube = false;
    this.registerForm.controls.bussinesType.setValue(string);
  }

  privateButton(value) {
    this.private = true;
    this.business = false;
    this.registerForm.controls.role_id.setValue(value);
    this.registerForm.controls.bussinesType.setValue('PRIVATE');
  }

  businessButton(value) {
    this.private = false;
    this.business = true;
    this.registerForm.controls.role_id.setValue(value);
    this.registerForm.controls.bussinesType.setValue('BUSSINES');
  }

  openSnackbar() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.panelClass = ['orange-snackbar'];
    this.snackBar.open(
      this.translateService.instant('translate.confirmAccountText'),
      this.action ? this.translateService.instant('translate.ok') : undefined,
      config
    );
  }
}
