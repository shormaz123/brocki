import { Component, OnChanges, Input } from '@angular/core';
import { Ads } from '../../../shared/models/ads.model';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { AdsService } from '../../../@core/services/ads.service';
import { UserStatus } from '../../../shared/enums/userStatus';

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

  ngOnChanges() {
    console.log(this.expiredProducts)
  }

  style() {
    if (this.expiredProducts[0] > 0) {
      return { height: '0px' };
    } else {
      return { height: '100' };
    }
  }

  /**
   * reactivateAd function when backend create api for reactivate ads
   *
   */
  reactivateAd(expired: Ads, index: number): void {
    console.log(expired,index)
    this.modal.confirm({
      nzTitle: 'Are you sure you want to reactivate this ad?',
      nzContent: '',
      nzOnOk: () => {
        this.expiredProducts[0].splice(index, 1);
        if (this.expiredProducts[0].length === 0) {
          this.ads = false;
        }
        const ads = new Ads();
        ads.adsDate = null;
        ads.adsLocation = expired.adsLocation;
        ads.adsGroupId = expired.adsGroupId;
        ads.adsSubGroupId = expired.adsSubGroupId;
        ads.description = expired.description;
        ads.favourite = expired.favourite;
        ads.id = expired.id;
        ads.image = expired.image;
        ads.price = expired.price;
        ads.status = UserStatus.ACTIVE;
        ads.userId = expired.userId;
        ads.tags = expired.tags;
        this.adsService.changeStatusOfAds(ads, ads.id).subscribe(() => {
          this.notification.success('', 'The ad has been reactivated');
        });
      },
    });
  }
}
