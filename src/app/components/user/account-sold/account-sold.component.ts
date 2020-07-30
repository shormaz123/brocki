import { Component, OnInit } from "@angular/core";
import { AdsService } from "../../../@core/services/ads.service";
import { AdsParam } from "../../../shared/models/adParams.model";
// import { Ads } from "../../../shared/models/ads.model";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { UserService } from "../../../@core/services/user.service";
import { Ads } from "src/app/shared/models/ads.model";

@Component({
  selector: "app-account-sold",
  templateUrl: "./account-sold.component.html",
  styleUrls: ["./account-sold.component.scss"],
})
export class AccountSoldComponent implements OnInit {
  userId: number;
  soldAds: Array<any> = [];
  ads: boolean;
  constructor(
    private adsService: AdsService,
    private userService: UserService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    // var date1 = new Date("08/03/2015");
    // var date2 = new Date("08/06/2015");

    // var diff = date2.getTime() - date1.getTime();

    // var msec = diff;
    // var hh = Math.floor(msec / 1000 / 60 / 60);
    // msec -= hh * 1000 * 60 * 60;
    // var d = Math.floor(hh / 24);
    // var mm = Math.floor(msec / 1000 / 60);
    // msec -= mm * 1000 * 60;
    // var ss = Math.floor(msec / 1000);
    // msec -= ss * 1000;

    // console.log(hh, d);

    this.userService.getUser().subscribe((res) => {
      const soldAds = new AdsParam();
      soldAds.status = "SOLD";
      soldAds.userId = res.id;
      this.adsService.getSoldAds(soldAds).subscribe((res) => {
        this.soldAds.push(res);
        if (this.soldAds[0].length === 0) {
          this.ads = false;
        } else {
          this.ads = true;
        }
        // console.log(this.soldAds);
      });
    });
  }

  deleteAd(ad: Ads, index: number): void {
    this.modal.confirm({
      nzTitle: "Are you sure you want to delete this ad?",
      nzContent: "",
      nzOnOk: () => {
        this.soldAds[0].splice(index, 1);
        const ads = new Ads();
        ads.adsDate = null;
        ads.adsLocation = null;
        ads.adsType = null;
        ads.adsgroupId = null;
        ads.adssubgropuId = null;
        ads.description = null;
        ads.favourite = null;
        ads.fixedPrice = null;
        ads.freeDelivery = null;
        ads.id = ad.id;
        ads.image = null;
        ads.price = null;
        ads.productName = null;
        ads.productWarranty = null;
        ads.status = "DELETE";
        ads.urgentSales = null;
        ads.userId = null;
        this.adsService.deleteAds(ads, ads.id).subscribe(() => {
          this.notification.success("", "The ad is deleted");
        });
      },
    });
  }
}
