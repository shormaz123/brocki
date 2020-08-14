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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.confirmToken = queryParams.token;
    });
  }

  goTo(route: string): void {
    this.userService.confirmAccount(this.confirmToken).subscribe( x => {
        this.router.navigate(['/site']);
    },
      error => {
        console.log(error);
      });
  }

}
