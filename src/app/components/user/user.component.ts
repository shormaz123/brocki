import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/user.model";
import { UserService } from "../../@core/services/user.service";
import { AuthConst } from "src/app/@core/consts/auth.const";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
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
  userId: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((res) => {
      this.path = res.bussinesType;
    });
    this.guest = true;
    this.activatedRoute.params.subscribe(
      (params) => {
        this.userId = params["id"];
        console.log(this.userId);
        this.userService.getUserById(this.userId).subscribe((user) => {
          this.user = user;
        });
      },
      (error) => {
        console.log("user not found");
      }
    );
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
    if (this.path === "PRIVATE") {
      this.router.navigate(["/update-info-private"]);
    } else {
      this.router.navigate(["/update-info-bussines"]);
    }
  }
  goTo(route: string): void {
    this.router.navigate([route]);
  }
}
