import {AfterViewInit, Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../@core/services/user.service';
import {UserAddAdsRequest} from '../../shared/models/useraddAdsRequest.model';
import {Ads} from '../../shared/models/ads.model';
import {AuthConst} from '../../@core/consts/auth.const';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import { Subscription } from 'rxjs';
import { WishlistService } from 'app/@core/services/wishlist.service';



@Component({
  selector: 'app-ads-card-carousel',
  templateUrl: './ads-card-carousel.component.html',
  styleUrls: ['./ads-card-carousel.component.scss']
})
export class AdsCardCarouselComponent implements OnInit, OnChanges, AfterViewInit {

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

  constructor(private userService: UserService,
              private router: Router,
              private wishlist: WishlistService) { }

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 3, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      easing: 'ease'
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

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.preloadImages();
  }

  preloadImages() {
    this.ads = this.randomAds;
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

 goToAd(event, id: number) {
  if(event.button === 0) {
    this.router.navigate(['/ad', id]);
  }
 }

 onEvent(event) {
  event.stopPropagation();
}
}


