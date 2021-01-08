import {Component, OnInit, Input} from '@angular/core';
import { AuthConst } from 'app/@core/consts/auth.const';
import { UserService } from 'app/@core/services/user.service';
import { WishlistService } from 'app/@core/services/wishlist.service';
import { Ads } from 'app/shared/models/ads.model';
import { UserAddAdsRequest } from 'app/shared/models/useraddAdsRequest.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-ads-card-detail',
  templateUrl: './ads-card-detail.component.html',
  styleUrls: ['./ads-card-detail.component.scss'],
})
export class AdsCardDetailComponent implements OnInit {
  userRequest: UserAddAdsRequest;
  token;
  @Input() ads: any;
  @Input() selectedGroup: any;
  favoriteAds?: Ads[];
  showModal = false;
  favoriteList;
  clickedAd: Ads;
  adFavorite = false;

  constructor(
    private wishlist: WishlistService,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
  }

  removeFromWishlist(ad: Ads): void {
    this.showModal = false;
    if (this.selectedGroup) {
    this.wishlist.remove(ad, this.selectedGroup.id).subscribe();
    } else {
    this.wishlist.remove(ad).subscribe();
    }
    setTimeout(() => {
        this.userService
          .deleteUserFavourite(ad.id)
          .subscribe(() => {});
      }, 100 );
  }

  addToWishlist(ad: Ads): void {
    this.adFavorite = false;
    this.clickedAd = ad;
    this.userService.getFavourites().subscribe((x) => {
      if (x) {
        this.favoriteList = x;
        this.showModal = true;
      }
    });
  }

  createGroup(event: any): void {
    this.clickedAd.favourite = true;
    this.adFavorite = this.clickedAd.favourite;
    const favorite = {
        favouriteName: event,
      };
    this.wishlist.add(this.clickedAd).subscribe();
    this.userService.createFavoriteGroup(favorite).subscribe(
      group => {
        const adToGroup = {
          adsId: this.clickedAd.id,
          favId: group.id,
        };
        this.userService.addFavoriteAdToGroup(adToGroup).subscribe(() => {
          this.wishlist.load();
        });
        this.route.navigate(['/favorite']);
      });
  }

  addAdToGroup(event: any): void {
    this.clickedAd.favourite = true;
    this.adFavorite = this.clickedAd.favourite;
    const adToGroup = {
      adsId: this.clickedAd.id,
      favId: event,
    };
    this.wishlist.add(this.clickedAd).subscribe();
    this.userService.addFavoriteAdToGroup(adToGroup).subscribe();
    this.route.navigate(['/favorite']);
  }

  closeModal(): void {
    this.showModal = false;
  }
}
