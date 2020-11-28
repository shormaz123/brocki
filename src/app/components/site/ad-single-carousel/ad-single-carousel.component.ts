import { Component, OnInit, Input } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { Ads } from '../../../shared/models/ads.model';
import { AuthConst } from '../../../@core/consts/auth.const';
import { UserAddAdsRequest } from '../../../shared/models/useraddAdsRequest.model';
import { WishlistService } from 'app/@core/services/wishlist.service';
import { UserService } from 'app/@core/services/user.service';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-ad-single-carousel',
  templateUrl: './ad-single-carousel.component.html',
  styleUrls: ['./ad-single-carousel.component.scss'],
})
export class AdSingleCarouselComponent implements OnInit {
  @Input() userId;
  @Input() favAds: Ads[];
  ads: Ads[];
  @Input() favoriteNumber;
  myCarousel: NzCarouselComponent;
  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
  token;
  userRequest: UserAddAdsRequest
  public carouselOne: NgxCarousel;

  constructor( private wishlist: WishlistService, private userService: UserService
  ) {}

  ngOnInit() {
    this.carouselTile = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 5000,
      point: {
        visible: false
      },
      load: 2,
      loop: true,
      custom: 'banner',
      touch: true
    };
    this.ads = this.favAds
    this.token = localStorage.getItem(AuthConst.token);
  }

  removeFromWishlist(ad: Ads): void {
    this.wishlist.remove(ad).subscribe();
    this.userService.deleteUserFavourite(ad.id, Number(localStorage.getItem('brocki_id'))).subscribe((x) => {
    });
  }

  addToWishlist(ad: Ads): void {
    this.wishlist.add(ad).subscribe();
    this.userRequest = {
      adsId: ad.id,
      userId: Number(localStorage.getItem('brocki_id'))
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe();
  }


}
