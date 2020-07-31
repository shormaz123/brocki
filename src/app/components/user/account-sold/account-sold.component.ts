import { Component, OnChanges, Input } from "@angular/core";
import { AdsService } from "../../../@core/services/ads.service";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { Ads } from "src/app/shared/models/ads.model";

@Component({
  selector: "app-account-sold",
  templateUrl: "./account-sold.component.html",
  styleUrls: ["./account-sold.component.scss"],
})
export class AccountSoldComponent implements OnChanges {
  @Input() ads: boolean;
  @Input() soldProducts: Array<any> = [];
  userId: number;

  constructor(
    private adsService: AdsService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnChanges() {}

  deleteAd(ad: Ads, index: number): void {
    this.modal.confirm({
      nzTitle: "Are you sure you want to delete this ad?",
      nzContent: "",
      nzOnOk: () => {
        this.soldProducts[0].splice(index, 1);
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
