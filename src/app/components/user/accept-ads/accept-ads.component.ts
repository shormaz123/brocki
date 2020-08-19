import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../../@core/services/ads.service';
import { Ads } from '../../../shared/models/ads.model';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-accept-ads',
  templateUrl: './accept-ads.component.html',
  styleUrls: ['./accept-ads.component.scss'],
})
export class AcceptAdsComponent implements OnInit {
  readyForReviewAds: Array<any> = [];
  message: boolean;
  constructor(
    private adsService: AdsService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.adsService.readyForReviewAds().subscribe((res) => {
      this.readyForReviewAds.push(res);
      if (this.readyForReviewAds[0].length === 0) {
        this.message = false;
      } else {
        this.message = true;
      }
    });
  }

  acceptAds(acceptAd: Ads, index: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to accept this ad?',
      nzContent: '',
      nzOnOk: () => {
        this.readyForReviewAds[0].splice(index, 1);
        const ad = new Ads();
        ad.adsDate = null;
        ad.adsLocation = null;
        ad.adsType = null;
        ad.adsGroupId = null;
        ad.adsSubGroupId = null;
        ad.description = null;
        ad.favourite = null;
        ad.fixedPrice = null;
        ad.freeDelivery = null;
        ad.id = acceptAd.id;
        ad.image = null;
        ad.price = null;
        ad.productName = null;
        ad.productWarranty = null;
        ad.status = 'ACTIVE';
        ad.urgentSales = null;
        ad.userId = null;
        this.adsService.changeStatusOfAds(ad, ad.id).subscribe(() => {
          this.notification.success('', 'Ad accepted');
        });
      },
    });
  }

  declineAds(declineAd: Ads, index: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to reject this ad?',
      nzContent: '',
      nzOnOk: () => {
        this.readyForReviewAds[0].splice(index, 1);
        const ad = new Ads();
        ad.adsDate = null;
        ad.adsLocation = null;
        ad.adsType = null;
        ad.adsGroupId = null;
        ad.adsSubGroupId = null;
        ad.description = null;
        ad.favourite = null;
        ad.fixedPrice = null;
        ad.freeDelivery = null;
        ad.id = declineAd.id;
        ad.image = null;
        ad.price = null;
        ad.productName = null;
        ad.productWarranty = null;
        ad.status = 'NOT_ACCEPTED';
        ad.urgentSales = null;
        ad.userId = null;
        if (this.readyForReviewAds[0].length === 0) {
          this.message = false;
        }
        this.adsService.changeStatusOfAds(ad, ad.id).subscribe(() => {
          this.notification.success('', 'Ad rejected');
        });
      },
    });
  }
}
