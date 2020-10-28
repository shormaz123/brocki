import {Component, Input, OnInit} from '@angular/core';
import {Ads} from '../../shared/models/ads.model';
import {AdsService} from '../../@core/services/ads.service';
import {UserService} from '../../@core/services/user.service';
import {HelpersService} from '../../@core/services/helpers.service';

@Component({
  selector: 'app-ads-carousel',
  templateUrl: './ads-carousel.component.html',
  styleUrls: ['./ads-carousel.component.scss']
})
export class AdsCarouselComponent implements OnInit {

  @Input() ads: Ads[];
  @Input() userId?: number;
  @Input() token?: any;
  adsFor;
  userRequest;

  constructor( private adsService: AdsService,
               private userService: UserService,
               private helpersService: HelpersService) { }

  ngOnInit() {
    this.adsFor = this.ads;
  }

  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: this.userId,
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe((x) => {
    }),
      (error) => {
      };
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number) {
    this.userService.deleteUserFavourite(adId, this.userId).subscribe((x) => {
    }),
      (error) => {
      };
    this.helpersService.$numOfFavs.next();
  }

}
