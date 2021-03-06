import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../@core/services/user.service';
import { AuthConst } from '../../@core/consts/auth.const';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  userId: number;
  token;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
    if (this.token) {
      this.userId = Number(localStorage.getItem('brocki_id'))
    }
  }

  goTo(route: string): void {
    this.router.navigate([route]);
    window.scrollTo({ top: 0 });
  }

  openFile() {
    window.open('assets/documents/AGB2020.pdf');
}
}
