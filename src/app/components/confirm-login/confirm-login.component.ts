import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.confirmToken = queryParams.token;
    });
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
        console.log(error.text)
        if (error.text === 'OK') {
          this.router.navigate(['/site']);
        } else {
          this.errorBoolean = true;
          this.errorMessage = 'No token!';
        }
      });
  }

}
