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

  checked: boolean;
  brockenstube: boolean;
  institution: boolean;
  private: boolean;
  business: boolean;
  role_id: number;
  cantons = cantons;
  cities = cities;
  selectedRegion = 'Aargau (Argovia)';
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    console.log('cantons', this.cantons);

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      credit: [0, [Validators.required]],
      region: ['', [Validators.required]],
      bussinesType: ['PRIVATE', [Validators.required]],
      role_id: [3, [Validators.required]],
      terms: [true, [Validators.required]],
    });

    this.brockenstube = true;
    this.institution = false;
    this.private = true;
    this.business = false;

    this.registerForm.controls['role_id'].setValue(3);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please, fill every field in accurate way';
      this.error = true;
      setTimeout(() => (this.error = false), 5000);
      // return  console.log("form invalid");
    } else if (
      this.registerForm.valid &&
      this.registerForm.value.terms === true
    ) {
      this.registration = this.registerForm.value;
      // console.log(this.registerForm.value)
      this.authService.register(this.registration).subscribe(
        (response) => {
          this.notification.success('', 'Profile successfully created!'),
            this.router.navigate(['/site']);
        },
        (error) => {
          this.error = true;
          setTimeout(() => (this.error = false), 5000);
          this.errorMessage = error.message;
          console.log(this.errorMessage);
        }
      );
    }
  }

  brockButton(string: string) {
    this.brockenstube = true;
    this.institution = false;
    this.registerForm.controls['bussinesType'].setValue(string);
  }

  instButton(string: string) {
    this.institution = true;
    this.brockenstube = false;
    this.registerForm.controls['bussinesType'].setValue(string);
  }

  privateButton(value) {
    this.private = true;
    this.business = false;
    this.registerForm.controls['role_id'].setValue(value);
    this.registerForm.controls['bussinesType'].setValue('PRIVATE');
  }

  businessButton(value) {
    this.private = false;
    this.business = true;
    this.registerForm.controls['role_id'].setValue(value);
    this.registerForm.controls['bussinesType'].setValue('INSTITUTION');
  }
}
