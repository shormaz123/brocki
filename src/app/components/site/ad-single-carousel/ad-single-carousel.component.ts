import {
  Component,
  OnInit,
  ViewChild,
  Input,
} from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { AdsService } from '../../../@core/services/ads.service';
import { Ads } from '../../../shared/models/ads.model';
import { UserService } from '../../../@core/services/user.service';
import { AuthConst } from '../../../@core/consts/auth.const';
import { HelpersService } from '../../../@core/services/helpers.service';
import { UserAddAdsRequest } from '../../../shared/models/useraddAdsRequest.model';
import { Subscription } from 'rxjs';
import { WishlistService } from 'app/@core/services/wishlist.service';

@Component({
  selector: 'app-ad-single-carousel',
  templateUrl: './ad-single-carousel.component.html',
  styleUrls: ['./ad-single-carousel.component.scss'],
})
export class AdSingleCarouselComponent implements OnInit {

  @Input() userId;
  @Input() favAds: Ads;
  @Input() favoriteNumber;

  @ViewChild(NzCarouselComponent, { static: false })

  myCarousel: NzCarouselComponent;
  favoriteAds;
  selected: boolean;
  userRequest: UserAddAdsRequest;
  token;
  numberOfFavorites;
  numberOfFavs: Subscription;

  constructor( private wishlist: WishlistService, private userService: UserService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
  }

  next() {
    this.myCarousel.next();
  }

  pre() {
    this.myCarousel.pre();
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
