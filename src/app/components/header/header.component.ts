import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { UserService } from "src/app/@core/services/user.service";
import { AuthConst } from "src/app/@core/consts/auth.const";
import { Subscription } from "rxjs";
import { HelpersService } from "src/app/@core/services/helpers.service";

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
    private helpers: HelpersService
  ) {}

  ngOnInit() {
    this.loginNameSubscription = this.helpers.$loginName.subscribe((filter) => {
      this.getUser();
      console.log("getUser function");
    });
    if (localStorage.getItem(AuthConst.token) == null) {
    } else {
      this.getUser();
    }
  }

  ngOnDestroy() {
    this.loginNameSubscription.unsubscribe();
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
          // console.log(user);
          localStorage.setItem(AuthConst.userId, user.id.toString());
        }
      },
      (error) => console.log("User not logged in")
    );
  }
}
