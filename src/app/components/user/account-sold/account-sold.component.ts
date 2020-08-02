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

  constructor(
    private adsService: AdsService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnChanges() {}
}
