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
import {Feature, MapboxServiceService} from '../../@core/services/mapbox-service.service';

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
  addresses: String[] = [];
  selectedAddress = null;
  location = {
    longitude: 0,
    latitude: 0,
  };
  responseLocationObject;
  selectedLocation;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private mapboxService: MapboxServiceService
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      credit: [0, [Validators.required]],
      region: ['', [Validators.required]],
      bussinesType: ['PRIVATE'],
      role_id: [3,],
      terms: [false, [Validators.required]],
      location: ['', [Validators.required]]
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

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: any) => {
          this.addresses = features.map(feat => feat.place_name);
          this.responseLocationObject = features.map(feat => feat.geometry);
          console.log( 'objekat', features);

        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: string, i: number) {
    this.selectedAddress = address;
    this.registerForm.controls.address.setValue(address);
    this.addresses = [];
    this.selectedLocation = this.responseLocationObject[i];
    console.log( 'koordinate', this.selectedLocation);
    this.registerForm.patchValue( {
      location: {
        longitude: this.selectedLocation.coordinates[0],
        latitude: this.selectedLocation.coordinates[1],
      },
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid &&
    this.registerForm.value.terms === true) {
      this.registration = this.registerForm.value;
      console.log(this.registerForm.value)
      this.authService.register(this.registration).subscribe(
        (response) => {
          this.notification.success('', 'Profile successfully created!'),
            this.router.navigate(['/site']);
        },
        (error) => {
          this.error = true;
          setTimeout(() => (this.error = false), 2000);
          this.errorMessage = error.message;
          console.log(this.errorMessage);
        }
      );
    } else {
      // this.registerForm.invalid
      this.errorMessage = 'Please, fill every field in accurate way';
      this.error = true;
      setTimeout(() => (this.error = false), 5000);
      // return  console.log("form invalid");
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
}
