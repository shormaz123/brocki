import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "src/app/@core/services/user.service";
import { AuthConst } from "src/app/@core/consts/auth.const";
import { Subscription } from "rxjs";
import { HelpersService } from "src/app/@core/services/helpers.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  accountName: string;
  createAd: boolean;
  roleName;
  user;
  userId = {};

  private loginNameSubscription: Subscription;

  constructor(
    private userService: UserService,
    private helpers: HelpersService
  ) {}

  ngOnInit() {
    this.loginNameSubscription = this.helpers.$loginName.subscribe((filter) => {
      this.getUser();
    });
    if ((this.accountName = localStorage.getItem("username"))) {
      this.createAd = true;
    } else {
      (this.accountName = null), (this.createAd = false);
    }

    this.userId = parseFloat(localStorage.getItem(AuthConst.userId));

    console.log(this.userId);
  }

  ngOnDestroy() {
    this.loginNameSubscription.unsubscribe();
  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      if (user == null) {
        this.accountName = null;
        console.log(this.accountName);
        this.createAd = false;
      } else {
        this.accountName = user.userName;
        this.createAd = true;

        localStorage.setItem("username", user.userName);
        localStorage.setItem(AuthConst.userId, user.id.toString());
      }
    });
  }
}
