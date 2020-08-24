import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { NzCarouselBaseStrategy, NzCarouselComponent } from 'ng-zorro-antd';
import { AdsService } from '../../../@core/services/ads.service';
import { Ads } from '../../../shared/models/ads.model';
import { UserService } from '../../../@core/services/user.service';
import { AuthConst } from '../../../@core/consts/auth.const';
import { HelpersService } from '../../../@core/services/helpers.service';
import { UserAddAdsRequest } from '../../../shared/models/useraddAdsRequest.model';

@Component({
  selector: 'app-ad-single-carousel',
  templateUrl: './ad-single-carousel.component.html',
  styleUrls: ['./ad-single-carousel.component.scss'],
})
export class AdSingleCarouselComponent implements OnInit {
  @Input() userId;
  @Input() favAds: Ads;
  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel: NzCarouselComponent;
  public favoriteAds;
  selected: boolean;
  userRequest: UserAddAdsRequest;
  token;

  constructor(
    private adsService: AdsService,
    private userService: UserService,
    private helpersService: HelpersService
  ) {}

  ngOnInit() {
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
      (error) => {
        console.log('not delete to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }
}
