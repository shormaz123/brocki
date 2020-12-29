import { Component, OnInit } from '@angular/core';
import { Ads } from '../../shared/models/ads.model';
import { WishlistService } from 'app/@core/services/wishlist.service';
import { UserService } from 'app/@core/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoriteAds: Ads[];
  favoriteGroups$: Observable<any>;
  constructor(
    public wishlist: WishlistService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.getUserAndFavAd();
    this.favoriteGroups$ = this.userService.getFavourites();
    console.log(this.favoriteGroups$);
  }

  getUserAndFavAd() {
    this.wishlist.ads$.subscribe((x) => {
      this.favoriteAds = x;
    });
  }
}
