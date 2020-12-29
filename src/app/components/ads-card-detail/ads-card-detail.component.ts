import { Component, OnInit, Input} from '@angular/core';
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
  showModal = false;

  constructor(
    private wishlist: WishlistService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
  }

  removeFromWishlist(ad: Ads): void {
    this.showModal = false;
    this.wishlist.remove(ad).subscribe();
    this.userService
      .deleteUserFavourite(ad.id, Number(localStorage.getItem('brocki_id')))
      .subscribe(() => {});
  }

  addToWishlist(ad: Ads): void {
    this.showModal = true;
    this.userService.getFavourites().subscribe((x) => {
      console.log('getGroups');
      console.log(x);
    });
    // this.wishlist.add(ad).subscribe();
    // this.userRequest = {
    //   adsId: ad.id,
    //   userId: Number(localStorage.getItem('brocki_id')),
    // };
    // this.userService.updateUserFavourites(this.userRequest).subscribe();
  }

  closeModal(): void {
    this.showModal = false;
  }
}
