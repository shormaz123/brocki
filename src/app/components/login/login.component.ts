import { Component, OnInit } from '@angular/core';
import { AuthConst } from '../../@core/consts/auth.const';
import { AuthService } from '../../@core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelpersService } from '../../@core/services/helpers.service';
import { WishlistService } from 'app/@core/services/wishlist.service';
import { AuthStore } from 'app/@core/services/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  password: string;
  email: string;
  errorBoolean: boolean;
  errorMessage: string;
  eye = false;

  constructor(
    private router: Router,
    public wishlist: WishlistService,
    public auth: AuthStore
  ) {}

  ngOnInit() {
    this.errorBoolean = false;
  }

  toggleEye(): void {
    this.eye = !this.eye;
  }

  // getValuesTest

  submitForm(): void {
    this.auth.login(this.email, this.password).subscribe(
      () => {
        this.router.navigateByUrl('/site');
      },
      (error) => {
        this.errorBoolean = true;
        setTimeout(() => (this.errorBoolean = false), 2000);
        this.errorMessage = error.message;
      }
    );
  }
}
