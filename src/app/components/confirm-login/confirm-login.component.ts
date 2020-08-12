import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrls: ['./confirm-login.component.scss']
})
export class ConfirmLoginComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }

}
