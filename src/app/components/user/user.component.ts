import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../../@core/services/user.service';
import { AuthConst } from 'src/app/@core/consts/auth.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  expression: boolean;
  active: boolean;
  expired: boolean;
  sold: boolean;
  guest: boolean;
  user: User;
  currentUserId: number;
  path: string;
  uploadingUrl: string;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.guest = true;
    // this.userService.getUser().subscribe(response => {
    //   this.path = response.roleName
    //   console.log(this.path)
    // })

  }


  activeButton() {
    this.active = true;
    this.expired = false;
    this.sold = false;
    this.guest = false;

  }

  expiredButton() {
    this.active = false;
    this.expired = true;
    this.sold = false;
    this.guest = false;

  }

  soldButton() {
    this.active = false;
    this.expired = false;
    this.sold = true;
    this.guest = false;

  }

  guestButton() {
    this.active = false;
    this.expired = false;
    this.sold = false;
    this.guest = true;

  }

  updateInfo() {
    if (this.path === "private") {
      this.router.navigate(['/update-info-private'])
    } else {
      this.router.navigate(['/update-info-bussines'])
    }
  }

}
