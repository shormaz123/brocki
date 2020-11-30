import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { AdsService } from '../../../@core/services/ads.service';

@Component({
  selector: 'app-sold-seller',
  templateUrl: './sold-seller.component.html',
  styleUrls: ['./sold-seller.component.scss'],
})
export class SoldSellerComponent implements OnChanges, OnInit {
  @Input() soldProducts: any;
  @Input() ads: boolean;

  paginationNumber: number = 1;
  pageSize: number = 8;
  status: string;
  userId: number;
  disableButton: boolean = true;

  constructor(private adsService: AdsService) {}

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.ads === false) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }

  increaseShow() {
    (this.paginationNumber += 1), (this.status = 'SOLD'), (this.userId = 265);
    this.adsService
      .getSoldAdsPagination(
        this.userId,
        this.paginationNumber,
        this.status,
        this.pageSize
      )
      .subscribe((response) => {
        if (response.length !== 8) {
          this.disableButton = false;

        }
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
