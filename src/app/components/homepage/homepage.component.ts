import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConst } from 'app/@core/consts/auth.const';
import { LoadingIndicatorService } from 'app/@core/loading-indicator.service';
import { AdsService } from 'app/@core/services/ads.service';
import { AuthService } from 'app/@core/services/auth.service';
import { HelpersService } from 'app/@core/services/helpers.service';
import { TranslateServiceRest } from 'app/@core/services/translateREST.service';
import { UserService } from 'app/@core/services/user.service';
import { Ads } from 'app/shared/models/ads.model';
import { UserAddAdsRequest } from 'app/shared/models/useraddAdsRequest.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  userId;
  userRequest: UserAddAdsRequest;
  paginationNumber = 1;
  paginationAds: Ads[];
  token;
  favAds;
  randomAdsA;
  randomAdsB;
  ads: Ads[];
  filteredAds: Ads[];
  favoriteAds: Ads[];
  numberOfFavs: Subscription;
  subscriptionLang: Subscription;
  numberOfFavorites: number;
  currentLang = 'de';
  disableButton: boolean = true;

  constructor(
    private adsService: AdsService,
    private userService: UserService,
    private helpersService: HelpersService,
    private router: Router,
    private translateBackend: TranslateServiceRest,
    private authService: AuthService,
    private loadingService: LoadingIndicatorService
  ) {}

  ngOnInit() {
    this.loadingService.loadingOn();
    this.token = localStorage.getItem(AuthConst.token);
    this.userId = Number(localStorage.getItem('brocki_id'));
    this.adsService
      .getAdsByPagination(this.paginationNumber)
      .subscribe((response) => {
        this.ads = response;
        this.loadingService.loadingOff();
        this.randomAdsA = this.shuffle(
          this.ads.slice(0, Math.floor(this.ads.length / 2))
        );
        this.randomAdsB = this.shuffle(
          this.ads.slice(Math.floor(this.ads.length / 2), this.ads.length)
        );
        if (this.token) {
          this.getUserAndFavAd();
        } else {
          this.favAds = this.ads;
        }
      }
      );
    this.subscriptionLang = this.translateBackend
      .getLanguage()
      .subscribe((message) => {
        this.currentLang = message;
      });
    this.numberOfFavs = this.helpersService
      .getNumberOfFavorites()
      .subscribe((number) => {
        this.numberOfFavorites = number;
      });
  }

  getUserAndFavAd() {
    this.userService
      .getFavourites(Number(localStorage.getItem('brocki_id')))
      .subscribe((x) => {
        this.favoriteAds = x;
        this.numberOfFavorites = x.length;
        this.sendNumberOfFavorites(x.length);
        // Replace objects between two arrays.
        this.favAds = this.ads.map(
          (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
        );
        this.randomAdsA = this.shuffle(
          this.favAds.slice(0, Math.floor(this.favAds.length / 2))
        );
        this.randomAdsB = this.shuffle(
          this.favAds.slice(
            Math.floor(this.favAds.length / 2),
            this.favAds.length
          )
        );
      });
  }

  ngOnDestroy() {
    this.numberOfFavs.unsubscribe();
    this.subscriptionLang.unsubscribe();
  }

  shuffle(array) {
    const newArr = array.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  }

  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: this.userId,
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe((x) => {
      this.raiseAdNumber();
    }),
      (error) => {
        if ((error.message = 'Unexpected end of JSON input')) {
        }
      };
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number) {
    this.userService.deleteUserFavourite(adId, this.userId).subscribe((x) => {
      this.downAdNumber();
    }),
      // tslint:disable-next-line:no-unused-expression
      (error) => {
      };
  }

  goToAd(id: number) {
    this.router.navigate(['/ad', id], { fragment: 'header' });
  }

  increaseShow() {
    (this.paginationNumber += 1),
      this.adsService
        .getAdsByPagination(this.paginationNumber)
        .subscribe((response) => {
          this.paginationAds = response;
          if (this.paginationAds.length !== 16) {
            this.disableButton = false;
          }
          if (this.token) {
            this.favAds.push(...this.paginationAds);
            this.disableScrolling();
          } else {
            this.favAds.push(...this.paginationAds);
            this.disableScrolling();
          }
        });
  }

  disableScrolling() {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }

  sendNumberOfFavorites(number: number) {
    this.helpersService.sendNumberOfFavorites(number);
  }

  raiseAdNumber() {
    this.numberOfFavorites = this.numberOfFavorites + 1;
    this.sendNumberOfFavorites(this.numberOfFavorites);
  }

  downAdNumber() {
    this.numberOfFavorites = this.numberOfFavorites - 1;
    this.sendNumberOfFavorites(this.numberOfFavorites);
  }
}
