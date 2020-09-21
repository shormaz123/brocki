import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges, OnDestroy
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { NzCarouselBaseStrategy, NzCarouselComponent } from 'ng-zorro-antd';
import { AdsService } from '../../../@core/services/ads.service';
import { Ads } from '../../../shared/models/ads.model';
import { UserService } from '../../../@core/services/user.service';
import { AuthConst } from '../../../@core/consts/auth.const';
import { HelpersService } from '../../../@core/services/helpers.service';
import { UserAddAdsRequest } from '../../../shared/models/useraddAdsRequest.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ad-single-carousel',
  templateUrl: './ad-single-carousel.component.html',
  styleUrls: ['./ad-single-carousel.component.scss'],
})
export class AdSingleCarouselComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userId;
  @Input() favAds: Ads;
  @Input() favoriteNumber;
  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel: NzCarouselComponent;
  public favoriteAds;
  selected: boolean;
  userRequest: UserAddAdsRequest;
  token;
  numberOfFavorites;
  numberOfFavs: Subscription;

  constructor(
    private adsService: AdsService,
    private userService: UserService,
    private helpersService: HelpersService,
  ) {}

  ngOnInit() {
    this.numberOfFavs = this.helpersService.getNumberOfFavorites().subscribe( number => {
      this.numberOfFavorites = number;
      console.log(this.numberOfFavorites, 'siteNumber')
     });
    this.token = localStorage.getItem(AuthConst.token);
    if (this.userId) {
      this.userService.getUser().subscribe((user) => {
        this.userId = user.id;
      });
    }
  }

  next() {
    this.myCarousel.next();
  }

  pre() {
    this.myCarousel.pre();
  }

  ngOnDestroy() {
    this.numberOfFavs.unsubscribe();

  }

  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: Number(localStorage.getItem(AuthConst.userId))
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe((x) => {
      console.log('add update to favorite', x);
      this.raiseAdNumber()
    }),
      (error) => {
        console.log('not to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number) {
    this.userService.deleteUserFavourite(adId, Number(localStorage.getItem(AuthConst.userId))).subscribe((x) => {
      this.downAdNumber();
      console.log('delete update to favorite', x);
    }),
      (error) => {
        console.log('not delete to favorite');
      };
    this.helpersService.$numOfFavs.next();
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

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.numberOfFavorites = this.favoriteNumber
  }

}
