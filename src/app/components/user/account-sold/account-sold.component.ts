import { Component, OnChanges, Input } from '@angular/core';
import { AdsService } from '../../../@core/services/ads.service';

@Component({
  selector: 'app-account-sold',
  templateUrl: './account-sold.component.html',
  styleUrls: ['./account-sold.component.scss'],
})
export class AccountSoldComponent implements OnChanges {
  @Input() ads: boolean;
  @Input() soldProducts: Array<any> = [];

  paginationNumber: number = 1;
  status: string;
  userId: number;

  constructor(private adsService: AdsService) {}

  ngOnChanges() {}

  style() {
    if (this.soldProducts[0] > 0) {
      return { height: '0px' };
    } else {
      return { height: '100' };
    }
  }

  increaseShow() {
    (this.paginationNumber += 1), (this.status = 'SOLD'), (this.userId = 265);
    this.adsService
      .getSoldAdsPAgination(this.userId, this.paginationNumber, this.status)
      .subscribe((response) => {
        const soldAds = response;
        this.soldProducts[0].push(...soldAds);
        this.disableScrolling();
      });
  }

  disableScrolling() {
    const x = window.scrollX;
    const y = window.scrollY;
    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }

  enableScrolling() {
    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = function () {};
  }

  onMouseWheel(e) {
    this.enableScrolling();
  }
}
