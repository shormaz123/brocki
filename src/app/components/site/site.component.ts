import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AdsService } from '../../@core/services/ads.service';
import { Ads } from '../../shared/models/ads.model';
import { AuthConst } from '../../@core/consts/auth.const';
import { UserService } from '../../@core/services/user.service';
import { User } from '../../shared/models/user.model';
import { HelpersService } from '../..//@core/services/helpers.service';
import { Subscription, Observable } from 'rxjs';
import { AdsParam } from '../../shared/models/adParams.model';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { UserAddAdsRequest } from '../../shared/models/useraddAdsRequest.model';
import { TranslateServiceRest } from '../../@core/services/translateREST.service';

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
  userId;
  displaySideNav = true;
  categoriesGroup: any;
  subCategories: any;
  categortGroupId: number;
  favAds;
  adParams: AdsParam;
  filteredAds = [];
  showItems = 16;
  userRequest: UserAddAdsRequest;
  searchProductName: string;
  adsByParams;
  randomAdsA;
  randomAdsB;
  paginationAds: Ads[];
  deselectAll: boolean;

  @ViewChild('panel', { read: ElementRef, static: false })
  public panel: ElementRef<any>;

  state;
  selected: boolean;

  numberOfFavs: Subscription;

  subscriptionLang: Subscription;
  myRefreshSubscription: Subscription;
  currentLang = 'de';
  startPage: number;
  paginationNumber = 1;
  refresh?;

  constructor(
    private adsService: AdsService,
    private translateBackend: TranslateServiceRest,
    private helpersService: HelpersService
  ) {}

  ngOnInit() {
    this.deselectAll = true;
    this.token = localStorage.getItem(AuthConst.token);
    this.numberOfFavs = this.helpersService
      .getNumberOfFavorites()
      .subscribe((number) => {
        this.numberOfFavorites = number;
        console.log(this.numberOfFavorites, 'siteNumber');
      });
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
      this.adsService.getAdsdBySearch(this.searchProductName).subscribe(
        (x) => {
          if (this.token) {
            this.favAds = x.map(
              (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
            );
          } else {
            this.favAds = x;
          }
        },
        (error) => {
          console.log('error');
        }
      );
    }
  }

  ngOnDestroy() {
    this.numberOfFavs.unsubscribe();
    this.subscriptionLang.unsubscribe();
  }

  enableScrolling() {
    window.onscroll = function () {};
  }
}
