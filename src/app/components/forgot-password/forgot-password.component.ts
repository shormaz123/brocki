import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string;

  constructor(private authService: AuthService,  private router: Router) {}

  ngOnInit() {}

  submit() {
    this.authService.resetPassword(this.email).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/site']);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
}
