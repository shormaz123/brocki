import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Ads } from '../../shared/models/ads.model';
import { HelpersService } from '../../@core/services/helpers.service';
import { UserService } from '../../@core/services/user.service';
import { UserAddAdsRequest } from '../../shared/models/useraddAdsRequest.model';
import { AdsService } from '../../@core/services/ads.service';
import { AdsParam } from 'app/shared/models/adParams.model';

@Component({
  selector: 'app-filters-ads',
  templateUrl: './filters-ads.component.html',
  styleUrls: ['./filters-ads.component.scss'],
})
export class FiltersAdsComponent implements OnInit, OnChanges {
  filteredAds: Ads[];
  userRequest: UserAddAdsRequest;
  userId: number;

  @Input() ads?: any;
  @Input() filterAd?: any;

  favAds: AdsParam;
  favoriteAds;

  newAds: any;

  pageNumber: number = 1;
  disableButton: boolean = true;

  constructor(
    private helpersService: HelpersService,
    private userService: UserService,
    private adsService: AdsService
  ) {}

  ngOnChanges() {
    if (Object.keys(this.ads).length !== 16) {
      this.disableButton = false;
    }
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.userId = user.id;
      this.userService.getFavourites(this.userId).subscribe((favAds) => {
        this.favoriteAds = favAds;
        this.favAds = this.ads.map(
          (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
        );
      });
    });
  }

  addToWishlist(event: any) {
    this.userRequest = {
      adsId: event,
      userId: this.userId,
    };
    this.userService
      .updateUserFavourites(this.userRequest)
      .subscribe((x) => {}),
      (error) => {};
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(event: any) {
    this.userService
      .deleteUserFavourite(event.adId, this.userId)
      .subscribe((x) => {}),
      // tslint:disable-next-line:no-unused-expression
      (error) => {};
    this.helpersService.$numOfFavs.next();
  }

  increaseShow() {
    this.pageNumber += 1;

    const filteredAds = {
      location: this.filterAd.location,
      fromPrice: this.filterAd.fromPrice,
      toPrice: this.filterAd.toPrice,
      fixedPrice: this.filterAd.fixedPrice,
      hasImage: this.filterAd.hasImage,
      adsGroupId: this.filterAd.adsGroupId,
      subCategory: this.filterAd.subCategory,
      pageNumber: this.pageNumber,
      pageSize: this.filterAd.pageSize,
    };
    this.adsService.getAdsByParamToFilter(filteredAds).subscribe((response) => {
      this.newAds = response;
      if (Object.keys(this.newAds).length !== 16) {
        this.disableButton = false;
      }
      this.ads.push(...this.newAds);
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
