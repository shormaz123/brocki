import { Component, OnInit } from '@angular/core';
import { Ads } from '../../shared/models/ads.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from '../../@core/services/helpers.service';
import { UserService } from '../../@core/services/user.service';
import { UserAddAdsRequest } from '../../shared/models/useraddAdsRequest.model';
import { AuthConst } from '../../@core/consts/auth.const';
import { AdsService } from '../../@core/services/ads.service';

@Component({
  selector: 'app-searched-ads',
  templateUrl: './searched-ads.component.html',
  styleUrls: ['./searched-ads.component.scss'],
})
export class SearchedAdsComponent implements OnInit {
  pageNumber = 1;
  disableButton = false;
  ads: Ads[] = [];
  token;
  favoriteAds: Ads[];
  userRequest: UserAddAdsRequest;
  userId: number;
  productName: string;
  newAds: Ads[];

  constructor(
    private router: Router,
    private helpersService: HelpersService,
    private userService: UserService,
    private adsService: AdsService,
    private route: ActivatedRoute
  ) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
    if (Object.keys(this.ads).length !== 12) {
      this.disableButton = false;
    }
  }

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
    if (this.token) {
      this.userId = Number(localStorage.getItem('brocki_id'));
      this.userService.getFavourites().subscribe((x) => {
        this.favoriteAds = x;
      });
    }
    this.route.params.subscribe((params) => {
      this.productName = params.data;
      if (this.productName) {
        this.adsService
          .getAdsdBySearch(this.productName, this.pageNumber)
          .subscribe(
            (x) => {
              if (this.token) {
                this.ads = x.map(
                  (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
                );
              } else {
                this.ads = x;
              }
              this.disableButton = Object.keys(this.ads).length === 12;
            },
          );
      }
    });
    // this.token = localStorage.getItem(AuthConst.token);
    // if (this.token) {
    //   this.userService.getUser().subscribe((user) => {
    //     this.userId = user.id;
    //   });
    // }
  }

  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: this.userId,
    };
    this.userService
      .updateUserFavourites(this.userRequest)
      .subscribe(() => {}, () => {}, );

    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number) {
    this.userService
      .deleteUserFavourite(adId, this.userId)
      .subscribe(() => {}, () => {}, );

    this.helpersService.$numOfFavs.next();
  }

  increaseShow() {
    this.pageNumber += 1;
    this.adsService
      .getAdsdBySearch(this.productName, this.pageNumber)
      .subscribe((response) => {
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
    window.onscroll = function() {
      window.scrollTo(x, y);
    };
  }

  enableScrolling() {
    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = function() {};
  }

  onMouseWheel() {
    this.enableScrolling();
  }
}
