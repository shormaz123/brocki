import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRegistration } from 'src/app/shared/models/userRegistration.model';
import { AuthService } from 'src/app/@core/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
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
  role_id : number;





  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required ]],
        location: ['', [Validators.required ]],
        userName: ['', [Validators.required ]],
        city: ['', [Validators.required ]],
        credit: [0, [Validators.required ]],
        bussinesType: ['PRIVATE', [Validators.required ]],
        role_id: [3, [Validators.required ]],
        terms: [true, [Validators.required ]]
      })

    this.brockenstube = true;
    this.institution = false;
    this.private = true;
    this.business = false;

    this.registerForm.controls['role_id'].setValue(3)

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value)

    if (this.registerForm.invalid) {
      this.error = true;
      return  console.log("form invalid");
  } else if ( this.registerForm.valid && this.registerForm.value.terms === true)
  {
    this.registration = this.registerForm.value;
    console.log(this.registerForm.value)
     this.authService.register(this.registration).subscribe(response =>
     console.log(response)
   )
    this.router.navigate(["/site"])
  }
  }


brockButton(string:string) {
  this.brockenstube = true;
  this.institution = false;
  this.registerForm.controls['bussinesType'].setValue(string)
}

instButton(string:string) {
  this.institution = true;
  this.brockenstube = false;
  this.registerForm.controls['bussinesType'].setValue(string)
}

privateButton(value) {
  this.private = true;
  this.business = false;
  this.registerForm.controls['role_id'].setValue(value)
  this.registerForm.controls['bussinesType'].setValue('PRIVATE')
}

businessButton(value) {
  this.private = false;
  this.business = true;
  this.registerForm.controls['role_id'].setValue(value)
  this.registerForm.controls['bussinesType'].setValue('INSTITUTION')
}



}



