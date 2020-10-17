import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
  styleUrls: ['./searched-ads.component.scss']
})
export class SearchedAdsComponent implements OnInit {

  pageNumber = 1;
  disableButton = true;
  ads;
  token;
  favAds: Ads[];
  favoriteAds: Ads[];
  userRequest: UserAddAdsRequest;
  userId: number;
  dataAd;
  productName: string;
  newAds: Ads[];

  constructor(private router: Router,
              private helpersService: HelpersService,
              private userService: UserService,
              private adsService: AdsService,
              private route: ActivatedRoute) { }

  ngOnChanges() {
    if (Object.keys(this.ads).length !== 12) {
      this.disableButton = false;
    }
  }

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
    if (this.token) {
      this.userId = Number(localStorage.getItem('brocki_id'));
      this.userService
      .getFavourites(Number(localStorage.getItem('brocki_id')))
      .subscribe((x) => {
        this.favoriteAds = x;
      }
      );
    }
    this.route.params.subscribe(params => {
      this.productName = params.data
      if (this.productName) {
          this.adsService.getAdsdBySearch(this.productName , this.pageNumber).subscribe(

        (x) => {
          if (this.token) {
            this.ads = x.map(
              (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
            );
          } else {
            this.ads = x;
          }
          if (Object.keys(this.ads).length !== 12) {
            this.disableButton = false;
          }
        },
        (error) => {
          console.log('error');
        }

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
    this.userService.updateUserFavourites(this.userRequest).subscribe((x) => {
      console.log('add update to favorite', x);
    }),
      (error) => {
        console.log('not to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number) {
    this.userService.deleteUserFavourite(adId, this.userId).subscribe((x) => {
      console.log('delete update to favorite', x);
    }),
      // tslint:disable-next-line:no-unused-expression
      (error) => {
        console.log('not delete to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }

  increaseShow() {
    this.pageNumber += 1;
    this.adsService.getAdsdBySearch(this.productName, this.pageNumber).subscribe((response) => {
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

  onMouseWheel(e) {
    this.enableScrolling();
  }

}