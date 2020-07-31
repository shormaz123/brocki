import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/user.model";
import { UserService } from "../../@core/services/user.service";
import { AdsService } from "../../@core/services/ads.service";
import { Ads } from "../../shared/models/ads.model";
import { AuthConst } from "src/app/@core/consts/auth.const";
import { AdsParam } from "../../shared/models/adParams.model";
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
  activeProducts: Array<any> = [];
  soldProducts: Array<any> = [];
  ads: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adsService: AdsService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((res) => {
      this.path = res.bussinesType;
    });
    this.guest = true;
    this.activatedRoute.params.subscribe(
      (params) => {
        this.userId = params["id"];
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
    this.adsService.getAllByUserId(this.userId).subscribe((res) => {
      this.activeProducts.push(res);
      if (this.activeProducts[0].length === 0) {
        this.ads = false;
      } else {
        this.ads = true;
      }
    });
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
    this.userService.getUser().subscribe((res) => {
      const soldAds = new AdsParam();
      soldAds.status = "SOLD";
      soldAds.userId = res.id;
      this.adsService.getSoldAds(soldAds).subscribe((res) => {
        this.soldProducts.push(res);
        console.log(this.soldProducts);
        if (this.soldProducts[0].length === 0) {
          this.ads = false;
        } else {
          this.ads = true;
        }
      });
    });
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
