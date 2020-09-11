import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../@core/services/user.service';
import {HelpersService} from '../../@core/services/helpers.service';
import {UserAddAdsRequest} from '../../shared/models/useraddAdsRequest.model';
import {Ads} from '../../shared/models/ads.model';
import {AuthConst} from '../../@core/consts/auth.const';

@Component({
  selector: 'app-ads-card-carousel',
  templateUrl: './ads-card-carousel.component.html',
  styleUrls: ['./ads-card-carousel.component.scss']
})
export class AdsCardCarouselComponent implements OnInit, OnChanges {

  userRequest: UserAddAdsRequest;
  @Input() userId;
  @Input() randomAds: Ads[];
  ads: Ads[];

  token;

  title = 'ngSlick';



  constructor(private userService: UserService, private helpersService: HelpersService) { }

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.preloadImages();
  }

  preloadImages() {
    this.ads = this.randomAds;
    console.log(this.ads, 'carousel ads');
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




}
