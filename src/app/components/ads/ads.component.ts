import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../../@core/services/ads.service';
import {Ads} from '../../shared/models/ads.model';
import {UserService} from '../../@core/services/user.service';
import {HelpersService} from '../../@core/services/helpers.service';
import {AuthService} from '../../@core/services/auth.service';
import {UserAddAdsRequest} from '../../shared/models/useraddAdsRequest.model';
import {AuthConst} from '../../@core/consts/auth.const';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  subGroupId: number;
  groupId: number;
  ads: Ads[];
  token;
  userRequest: UserAddAdsRequest;
  userId;
  currentLang;
  subCategoryTitle: string;
  categoryTitle: string;
  favAds: Ads[];
  favoriteAds: Ads[];
  numberOfFavorites: number;
  displaySideNav = true;


  constructor(private activatedRoute: ActivatedRoute,
              private adsService: AdsService,
              private userService: UserService,
              private helpersService: HelpersService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.currentLang = localStorage.getItem(AuthConst.language)
    this.token = localStorage.getItem(AuthConst.token);
    if (this.token) {
      this.userService.getUser().subscribe( user => {
        this.userId = user.id;
      });
    }
    this.activatedRoute.params.subscribe((params) => {
      this.subGroupId = params.subGroupId;
      this.groupId = params.groupId;
      console.log(this.subGroupId);
      this.adsService.getSubBySubGroupId(params.subGroupId).subscribe( x => {
        console.log(x, 'x')
      })
      this.adsService.getAdsBySubGroupParam(params.subGroupId).subscribe((ads) => {
        this.ads = ads;
        if (this.token) {
          this.getFavoriteAds(this.userId)
        } else {
          this.favAds = ads;
        }
        // this.getUserAndFavAd();
        console.log(this.subGroupId, 'subgroupAds');


      });
    });
  }

  displaySideBar() {
    this.helpersService.displaySideBar(this.displaySideNav);
  }


  getFavoriteAds(userId: number) {
    this.userService.getFavourites(userId).subscribe((x) => {
      this.favoriteAds = x
      this.numberOfFavorites = x.length;
      // Replace objects between two arrays.
      this.favAds = this.ads.map(
        (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
      );
    });
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
