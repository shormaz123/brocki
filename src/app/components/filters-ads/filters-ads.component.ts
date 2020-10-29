import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Ads } from '../../shared/models/ads.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from '../../@core/services/helpers.service';
import { UserService } from '../../@core/services/user.service';
import { UserAddAdsRequest } from '../../shared/models/useraddAdsRequest.model';
import { AuthConst } from '../../@core/consts/auth.const';
import { AdsService } from '../../@core/services/ads.service';
import { FilterAds } from '../../shared/models/filterAds.model';

@Component({
  selector: 'app-filters-ads',
  templateUrl: './filters-ads.component.html',
  styleUrls: ['./filters-ads.component.scss'],
})
export class FiltersAdsComponent implements OnInit, OnChanges {
  filteredAds: Ads[];
  userRequest: UserAddAdsRequest;
  token;
  userId: number;

  @Input() ads?: any;
  @Input() filterAd?: any;

  newAds: any;

  // public filterAd: FilterAds;

  pageNumber: number = 1;
  disableButton: boolean = true;

  constructor(
    private router: Router,
    private helpersService: HelpersService,
    private userService: UserService,
    private adsService: AdsService,
    private route: ActivatedRoute
  ) {

  }

  ngOnChanges() {
    if (Object.keys(this.ads).length !== 12) {
      this.disableButton = false;
    }
  }

  ngOnInit() {

  }

  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: this.userId,
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe((x) => {
    }),
      (error) => {
      };
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number) {
    this.userService.deleteUserFavourite(adId, this.userId).subscribe((x) => {
    }),
      // tslint:disable-next-line:no-unused-expression
      (error) => {
      };
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
      if (Object.keys(this.newAds).length !== 12) {
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
