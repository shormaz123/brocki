import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/services/user.service';
import { Ads } from '../../shared/models/ads.model';
import { HelpersService } from '../../@core/services/helpers.service';

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
    private userService: UserService,
    private helpersService: HelpersService
  ) {}

  ngOnInit() {
    this.getUserAndFavAd();
  }

  getUserAndFavAd() {
    this.userService.getUser().subscribe((response) => {
      this.userId = response.id;
      this.userService.getFavourites(response.id).subscribe((x) => {
        this.favoriteAds = x;
      });
    });
  }

  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: this.userId,
    };
    this.userService
      .updateUserFavourites(this.userRequest)
      .subscribe((x) => {}),
      (error) => {};
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(event: any) {
    this.userService
      .deleteUserFavourite(event.adId, this.userId)
      .subscribe((x) => {}),
      (error) => {};
    this.favoriteAds.splice(event.index, 1);
    this.helpersService.$numOfFavs.next();
  }
}
