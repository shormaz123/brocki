import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/services/user.service';
import { Ads } from '../../shared/models/ads.model';
import { HelpersService } from '../../@core/services/helpers.service';
import { WishlistService } from 'app/@core/services/wishlist.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoriteAds: Ads[];
  userRequest;
  userId: number;

  constructor(
    public wishlist: WishlistService
  ) {}

  ngOnInit() {
    this.getUserAndFavAd();
  }

  getUserAndFavAd() {
    this.wishlist.ads$.subscribe( x => {
      this.favoriteAds = x;
    });
  }
}
