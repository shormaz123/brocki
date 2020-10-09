import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthConst } from 'app/@core/consts/auth.const';
import { AuthService } from 'app/@core/services/auth.service';
import {UserService} from '../../@core/services/user.service';

@Component({
  selector: 'app-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrls: ['./confirm-login.component.scss']
})
export class ConfirmLoginComponent implements OnInit {
  confirmToken;
  errorBoolean;
  errorMessage;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.confirmToken = queryParams.token;
    });
    this.translate.use(localStorage.getItem(AuthConst.language));
  }

  goTo(): void {
    this.userService.confirmAccount(this.confirmToken).subscribe(
      (x) => {
        if (x) {
          console.log(x);
          this.router.navigate(['/site']);
        }
    },
      (error) => {
        console.log(error.text);
        if (error.text === 'OK') {
          this.router.navigate(['/site']);
        } else {
          this.errorBoolean = true;
          this.errorMessage = 'No token!';
        }
      });
  }

}
