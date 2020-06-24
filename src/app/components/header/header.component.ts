import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  accountName: string;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getUser().subscribe( user => {
      this.accountName=user.userName;
    });
  }

}
