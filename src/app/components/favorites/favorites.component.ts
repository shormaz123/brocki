import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/@core/services/user.service';
import { Ads } from 'src/app/shared/models/ads.model';
import { HelpersService } from 'src/app/@core/services/helpers.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteAds: Ads[];
  userRequest;
  userId: number;

  constructor(private userService: UserService, private helpersService: HelpersService) {

  }

  ngOnInit() {
    this.getUserAndFavAd();
  }

  getUserAndFavAd() {
    this.userService.getUser().subscribe(response => {
      this.userId = response.id;
      this.userService.getFavourites(response.id).subscribe(x => {
        this.favoriteAds = x;
      }
      );
    });
  }

  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: this.userId
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe(
      _x => {
        console.log('add update to favorite', _x);
      }
    ),
      _error => {
        console.log('not to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number, i: any) {
    this.userService.deleteUserFavourite(adId, this.userId).subscribe(
      _x => {
        console.log('delete update to favorite', _x);

      }
    ),
      _error => {
        console.log('not delete to favorite');
      };
      this.favoriteAds.splice(i, 1);
    this.helpersService.$numOfFavs.next();

  }

}
