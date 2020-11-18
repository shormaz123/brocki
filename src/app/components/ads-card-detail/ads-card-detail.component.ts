import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthConst } from 'app/@core/consts/auth.const';
import { UserService } from 'app/@core/services/user.service';
import { WishlistService } from 'app/@core/services/wishlist.service';
import { Ads } from 'app/shared/models/ads.model';
import { UserAddAdsRequest } from 'app/shared/models/useraddAdsRequest.model';

@Component({
  selector: 'app-ads-card-detail',
  templateUrl: './ads-card-detail.component.html',
  styleUrls: ['./ads-card-detail.component.scss'],
})
export class AdsCardDetailComponent implements OnInit {
  userRequest: UserAddAdsRequest;
  token;
  @Input() ads: any;
  favoriteAds?: Ads[];

  constructor(
    private wishlist: WishlistService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
  }

  removeFromWishlist(ad: Ads): void {
    this.wishlist.remove(ad).subscribe();
    this.userService
      .deleteUserFavourite(ad.id, Number(localStorage.getItem('brocki_id')))
      .subscribe((x) => {});
  }

  addToWishlist(ad: Ads): void {
    this.wishlist.add(ad).subscribe();
    this.userRequest = {
      adsId: ad.id,
      userId: Number(localStorage.getItem('brocki_id')),
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe();
  }

  favorite(ad: Ads) {
    console.log(!ad.favourite)
    // if (ad.favourite) {
    //    this.removeFromWishlist(ad)
    // }
    // if (!ad.favourite){
    //    this.addToWishlist(ad)
    // }
  }
}
