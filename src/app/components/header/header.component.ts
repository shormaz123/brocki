import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { UserService } from "src/app/@core/services/user.service";
import { AuthConst } from "src/app/@core/consts/auth.const";
import { Subscription } from "rxjs";
import { HelpersService } from "src/app/@core/services/helpers.service";
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  accountName: string;
  createAd: boolean;
  roleName;
  user;
  userId;


  private loginNameSubscription: Subscription;

  constructor(
    private userService: UserService,
    private helpers: HelpersService,
    private modal: NzModalService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loginNameSubscription = this.helpers.$loginName.subscribe((filter) => {
      this.getUser();
    });
    if (localStorage.getItem(AuthConst.token) == null) {
    } else {
      this.getUser();
    }
    this.change('de')
  }

  ngOnDestroy() {
    this.loginNameSubscription.unsubscribe();
  }

  change(code: string) {
    this.translate.use(code);
  }

  getUser(): void {
    this.userService.getUser().subscribe(
      (user) => {
        if (user == null) {
          this.accountName = null;
          this.createAd = false;
        } else {
          this.accountName = user.userName;
          this.createAd = true;
          this.userId = user.id;
          localStorage.setItem(AuthConst.userId, user.id.toString());
        }
      },
      (error) => console.log("User not logged in")
    );
  }

  logout() {
    this.modal.confirm({
      nzTitle: "Are you sure you want to logout?",
      nzContent: "",
      nzOnOk: () => {
       localStorage.removeItem(AuthConst.roleName);
       localStorage.removeItem(AuthConst.token);
       localStorage.removeItem(AuthConst.userId);
       this.router.navigate(['/site']);
       window.location.reload();
      }
      });
  }

    create() {
      this.router.navigate(['/registration']);
    }
}
