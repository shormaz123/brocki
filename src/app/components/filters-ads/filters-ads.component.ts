import { Component, OnInit } from '@angular/core';
import {Ads} from '../../shared/models/ads.model';
import {Router} from '@angular/router';
import {HelpersService} from '../../@core/services/helpers.service';
import {UserService} from '../../@core/services/user.service';
import {UserAddAdsRequest} from '../../shared/models/useraddAdsRequest.model';
import {AuthConst} from '../../@core/consts/auth.const';

@Component({
  selector: 'app-filters-ads',
  templateUrl: './filters-ads.component.html',
  styleUrls: ['./filters-ads.component.scss']
})
export class FiltersAdsComponent implements OnInit {

  filteredAds: Ads[];
  userRequest: UserAddAdsRequest;
  token;
  userId: number;

  constructor(private router: Router, private helpersService: HelpersService, private userService: UserService) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.filteredAds = this.router.getCurrentNavigation().extras.state.data;
      console.log('filteredads', this.filteredAds);
    }
  }

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token)
    if (this.token) {
      this.userService.getUser().subscribe( user => {
        this.userId = user.id
      });
    }
  }

  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: this.userId,
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe((x) => {
      console.log('add update to favorite', x);
    }),
      (error) => {
        console.log('not to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number) {
    this.userService.deleteUserFavourite(adId, this.userId).subscribe((x) => {
      console.log('delete update to favorite', x);
    }),
      // tslint:disable-next-line:no-unused-expression
      (error) => {
        console.log('not delete to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }


}
