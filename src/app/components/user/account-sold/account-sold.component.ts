import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AdsService } from '../../../@core/services/ads.service';
import { UserService } from '../../../@core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Ads } from '../../../shared/models/ads.model';

@Component({
  selector: 'app-account-sold',
  templateUrl: './account-sold.component.html',
  styleUrls: ['./account-sold.component.scss'],
})
export class AccountSoldComponent implements OnChanges {
  @Input() ads: boolean;
  @Input() soldProducts: Array<any> = [];

  paginationNumber: number = 1;
  pageSize: number = 8;
  status: string;
  userId: number;
  disableButton: boolean = true;
  soldAds: Ads[] = [];

  constructor(
    private adsService: AdsService,
    private route: ActivatedRoute,
    private userServuce: UserService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  style() {
    if (this.soldProducts[0] > 0) {
      return { height: '0px' };
    } else {
      return { height: '100' };
    }
  }

  increaseShow() {
    (this.paginationNumber += 1), (this.status = 'SOLD'), this.userId;
    this.adsService
      .getSoldAdsPagination(
        this.userId,
        this.paginationNumber,
        this.status,
        this.pageSize
      )
      .subscribe((response) => {
        this.soldAds = response;
        this.soldProducts[0].push(...this.soldAds);
        this.disableScrolling();

        if (response.length !== 8) {
          this.disableButton = false;
        }

        if (this.soldAds.length == 0) {
          this.disableButton = false;
        }
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
