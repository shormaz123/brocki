import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@core/services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string;

  constructor(private authService: AuthService,  private router: Router, private toastr: ToastrService) {}

  ngOnInit() {


  }

  submit() {
    this.authService.resetPassword(this.email).subscribe(
      (response) => {
        this.toastr.success('New password has been sent to your email!');
        this.router.navigate(['/site']);
      },
      (error) => {
        this.toastr.error('Wrong email!');
        if (error.status === 200) {

        }
      }
    );
  }
}
