import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Ads } from "../../../shared/models/ads.model";
import { AdsService } from "../../../@core/services/ads.service";
import { Router } from "@angular/router";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";

@Component({
  selector: "app-account-active",
  templateUrl: "./account-active.component.html",
  styleUrls: ["./account-active.component.scss"],
})
export class AccountActiveComponent implements OnChanges {
  @Input() activeProducts: Ads;
  @Input() ads: boolean;
  Ads: Boolean;

  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private adsService: AdsService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {}

  deleteAd(active: Ads, index: number): void {
    this.modal.confirm({
      nzTitle: "Are you sure you want to delete this ad?",
      nzContent: "",
      nzOnOk: () => {
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
        ads.id = active.id;
        ads.image = null;
        ads.price = null;
        ads.productName = null;
        ads.productWarranty = null;
        ads.status = "DELETE";
        ads.urgentSales = null;
        ads.userId = null;
        this.adsService.deleteAds(ads, ads.id).subscribe(() => {
          this.activeProducts[0].slice(index, 1);
          this.notification.success("", "The ad is deleted");
          this.router.navigate(["/site"]);
        });
      },
    });
  }
}
