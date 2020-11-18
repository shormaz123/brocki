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

  private loginName: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private helpers: HelpersService,
    public wishlist: WishlistService,
    public auth: AuthStore
  ) {}

  ngOnInit() {
    this.errorBoolean = false;
  }

  // getValuesTest

  submitForm(): void {
    // this.authService.login(this.email, this.password).subscribe(
    //   (response) => {
    //     if (response) {
    //       localStorage.setItem(AuthConst.roleName, response.roleName);
    //       localStorage.setItem(AuthConst.token, response.token);
    //       this.helpers.$loginName.next(response.token);
    //       // this.wishlist.load();
    //     }
    //     this.router.navigateByUrl('/site');
    //   },
    //   (error) => {
    //     this.errorBoolean = true;
    //     setTimeout(() => (this.errorBoolean = false), 2000);
    //     this.errorMessage = error.message;
    //   }
    // );
    this.auth.login(this.email, this.password)
    .subscribe(
        () => {
            this.router.navigateByUrl("/site")
        },
        error => {
                  this.errorBoolean = true;
                  setTimeout(() => (this.errorBoolean = false), 2000);
                  this.errorMessage = error.message;
        }
    );
  }
}
