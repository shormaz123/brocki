import { Component, OnInit, Output } from "@angular/core";
import { UserService } from "src/app/@core/services/user.service";
import { AuthService } from "../../@core/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  accountName: string;
  isloggedIn: boolean;
  isLogin: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isloggedIn = this.authService.isSignedIn();
    if (this.isloggedIn) {
      this.userService.getUser().subscribe((user) => {
        this.isLogin = true;
        this.accountName = user.userName;
      });
    }
  }
}
