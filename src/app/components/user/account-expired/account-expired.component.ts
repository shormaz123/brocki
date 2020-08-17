import { Component, OnChanges, Input } from '@angular/core';
import { Ads } from '../../../shared/models/ads.model';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { AdsService } from '../../../@core/services/ads.service';

@Component({
  selector: 'app-account-expired',
  templateUrl: './account-expired.component.html',
  styleUrls: ['./account-expired.component.scss'],
})
export class AccountExpiredComponent implements OnChanges {
  @Input() expiredProducts: Ads;
  @Input() ads: boolean;
  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private adsService: AdsService
  ) {}

  ngOnChanges() {}

  style() {
    if (this.expiredProducts[0] > 0) {
      return { height: '0px' };
    } else {
      return { height: '100' };
    }
  }

  /**
   * reactivate function when backend create api for reactivate ads
   *
   */
  // reactivate(expired: Ads, index: number): void {
  //   this.modal.confirm({
  //     nzTitle: 'Are you sure you want to reactivate this ad?',
  //     nzContent: '',
  //     nzOnOk: () => {
  //       this.expiredProducts[0].splice(index, 1);
  //       if (this.expiredProducts[0].length === 0) {
  //         this.ads = false;
  //       }
  //       const ads = new Ads();
  //       ads.adsDate = null;
  //       ads.adsLocation = null;
  //       ads.adsType = null;
  //       ads.adsgroupId = null;
  //       ads.adssubgropuId = null;
  //       ads.description = null;
  //       ads.favourite = null;
  //       ads.fixedPrice = null;
  //       ads.freeDelivery = null;
  //       ads.id = expired.id;
  //       ads.image = null;
  //       ads.price = null;
  //       ads.productName = null;
  //       ads.productWarranty = null;
  //       ads.status = 'ACTIVE';
  //       ads.urgentSales = null;
  //       ads.userId = null;
  //       this.adsService.changeStatusOfAds(ads, ads.id).subscribe(() => {
  //         this.notification.success('', 'The ad has been reactivated');
  //       });
  //     },
  //   });
  // }
}
