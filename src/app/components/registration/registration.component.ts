import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRegistration } from '../../shared/models/userRegistration.model';
import { AuthService } from '../../@core/services/auth.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import cantons from '../../shared/cantons.json';
import cities from '../../shared/cities.json';
import { MessageService } from 'primeng/api';
import { NzNotificationService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

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

  message = this.translateService.instant('translate.confirmAccountText');;
  actionButtonLabel = this.translateService.instant('translate.ok');
  action = true;
  setAutoHide = true;
  autoHide = 20000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass: boolean = false;

  //

  checked: boolean;
  brockenstube: boolean;
  institution: boolean;
  private: boolean;
  business: boolean;
  role_id: number;
  errorMessage: string;
  location = {
    longitude: 0,
    latitude: 0,
  };
  responseLocationObject;
  selectedLocation;

  addressAd: any;
  addressNumber: any;
  addressPostalCode: any;
  addressPlace: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {


    const completeAddress = (`${this.addressAd} ` + `${this.addressNumber} ` + `${this.addressPostalCode} ` + `${this.addressPlace}`);

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      credit: [0, [Validators.required]],
      bussinesType: ['PRIVATE'],
      role_id: [3, ],
      terms: [false, [Validators.required]],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      postalNumber: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
    this.brockenstube = true;
    this.institution = false;
    this.private = true;
    this.business = false;
    this.registerForm.controls.role_id.setValue(3);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid &&
    this.registerForm.value.terms === true) {
      this.registration = this.registerForm.value;
      this.authService.register(this.registration).subscribe(
        (response) => {
          this.openSnackbar(),
            this.router.navigate(['/site']);
        },
        (error) => {
          this.error = true;
          setTimeout(() => (this.error = false), 2000);
          this.errorMessage = error.message;
        }
      );
    } else {
      this.errorMessage = this.translateService.instant('translate.fillEveryFieldError');
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
    this.registerForm.controls.bussinesType.setValue('INSTITUTION');
  }

  openSnackbar() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = ['orange-snackbar']
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config
      );
  }
}
