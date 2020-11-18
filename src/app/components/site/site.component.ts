import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AuthConst } from '../../@core/consts/auth.const';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateServiceRest } from '../../@core/services/translateREST.service';
import { WishlistService } from 'app/@core/services/wishlist.service';
import { getTestBed } from '@angular/core/testing';
import { Ads } from 'app/shared/models/ads.model';
import { User } from 'app/shared/models/user.model';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})
export class SiteComponent implements OnInit, OnDestroy {
  encapsulation: ViewEncapsulation.None;


  searchText;
  items: Array<any> = [];
  categoryImage: any;
  public ads = [];
  public randomAds: Ads[];
  public login: string;
  isLoggedIn: boolean;
  user?: User;
  public favoriteAds;
  numberOfFavorites: number;
  token;
  filteredAds = [];
  showItems = 16;
  searchProductName: string;
  deselectAll: boolean;
  subscriptionLang: Subscription;
  myRefreshSubscription: Subscription;
  currentLang = 'de';
  startPage: number;
  paginationNumber = 1;

  constructor(
    private translateBackend: TranslateServiceRest,
    private router: Router,
    public wishlist: WishlistService
  ) {


  }

  ngOnInit() {
    this.deselectAll = true;
    this.token = localStorage.getItem(AuthConst.token);
    this.subscriptionLang = this.translateBackend
      .getLanguage()
      .subscribe((message) => {
        this.currentLang = message;
      });
  }
  onMouseWheel(e) {
    this.enableScrolling();
  }
  getAdsBySearch() {
    if (this.searchProductName === undefined) {
      return;
    } else {
      this.router.navigate(['/searched-ads', { data: this.searchProductName }]);
    }
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  enableScrolling() {
    window.onscroll = function () {};
  }
}
