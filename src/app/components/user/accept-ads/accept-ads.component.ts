import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  card: Ads;
  reviewCard: boolean;
  constructor(
    private adsService: AdsService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router
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
        ad.adsGroupId = null;
        ad.adsSubGroupId = null;
        ad.description = null;
        ad.favourite = null;
        ad.id = acceptAd.id;
        ad.image = null;
        ad.price = null;
        ad.productName = null;
        ad.status = 'ACTIVE';
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
        ad.adsGroupId = null;
        ad.adsSubGroupId = null;
        ad.description = null;
        ad.favourite = null;
        ad.id = declineAd.id;
        ad.image = null;
        ad.price = null;
        ad.productName = null;
        ad.status = 'NOT_ACCEPTED';
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

  goTo(route: string): void {
    this.router.navigate([route]);
    window.scrollTo({ top: 0 });
  }

  /**
   * Detailed overview of the individual ad
   *
   */
  SingleAd(card: Ads): void {
    this.card = card;
    this.reviewCard = true;
  }
}
