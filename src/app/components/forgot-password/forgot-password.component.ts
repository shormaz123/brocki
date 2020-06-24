import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  password: string;
  email: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submitForm() {
    this.authService.newPassword(this.email, this.password).subscribe(response => {
      console.log(response)
    },
      error => {
        console.log(error.message)
      })
  }

}
