import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../../@core/services/user.service';
import { HelpersService } from '../../@core/services/helpers.service';
import { UserAddAdsRequest } from '../../shared/models/useraddAdsRequest.model';
import { Ads } from '../../shared/models/ads.model';
import { AuthConst } from '../../@core/consts/auth.const';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ads-card-carousel',
  templateUrl: './ads-card-carousel.component.html',
  styleUrls: ['./ads-card-carousel.component.scss'],
})
export class AdsCardCarouselComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;

  public carouselOne: NgxCarousel;
  userRequest: UserAddAdsRequest;
  @Input() userId;
  @Input() randomAds: Ads[];
  @Input() favoriteNumber;
  ads: Ads[];
  numberOfFavorites: number;
  numberOfFavs: Subscription;

  token;

  title = 'ngSlick';

  constructor(
    private userService: UserService,
    private helpersService: HelpersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.numberOfFavs = this.helpersService
      .getNumberOfFavorites()
      .subscribe((number) => {
        this.numberOfFavorites = number;
      });
    this.token = localStorage.getItem(AuthConst.token);
    this.carouselTile = {
      grid: { xs: 2, sm: 3, md: 3, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: false,
      },
      load: 2,
      touch: true,
      easing: 'ease',
    };
  }

  public carouselTileLoad(evt: any) {
    const len = this.randomAds.length;
    if (len <= 30) {
      for (let i = len; i < len + 10; i++) {
        this.carouselTileItems.push(i);
      }
    }
  }

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.numberOfFavorites = this.favoriteNumber;
    this.preloadImages();
  }

  preloadImages() {
    this.ads = this.randomAds;
  }

  ngOnDestroy() {
    this.numberOfFavs.unsubscribe();
  }
  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: Number(localStorage.getItem(AuthConst.userId)),
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe((x) => {
      this.raiseAdNumber();
    }),
      (error) => {};
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number) {
    this.userService
      .deleteUserFavourite(adId, Number(localStorage.getItem(AuthConst.userId)))
      .subscribe((x) => {
        this.downAdNumber();
      }),
      // tslint:disable-next-line:no-unused-expression
      (error) => {};
    this.helpersService.$numOfFavs.next();
  }

  goToAd(event, id: number) {
    if (event.button === 0) {
      this.router.navigate(['/ad', id]);
    }
  }

  onEvent(event) {
    event.stopPropagation();
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
