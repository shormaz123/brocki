import {Component, Input, OnInit} from '@angular/core';
import {Ads} from '../../shared/models/ads.model';
import {AdsService} from '../../@core/services/ads.service';
import {UserService} from '../../@core/services/user.service';
import {HelpersService} from '../../@core/services/helpers.service';
import { WishlistService } from 'app/@core/services/wishlist.service';
import { AuthConst } from 'app/@core/consts/auth.const';

@Component({
  selector: 'app-ads-carousel',
  templateUrl: './ads-carousel.component.html',
  styleUrls: ['./ads-carousel.component.scss']
})
export class AdsCarouselComponent implements OnInit {

  @Input() ads: Ads[];
  @Input() userId?: number;
  token;
  adsFor;
userRequest;

  constructor(
               private userService: UserService,
               private wishlist: WishlistService) { }

  ngOnInit() {
    this.adsFor = this.ads;
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
