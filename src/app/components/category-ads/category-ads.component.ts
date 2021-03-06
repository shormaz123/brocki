import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthConst } from 'app/@core/consts/auth.const';
import { HelpersService } from 'app/@core/services/helpers.service';
import { UserService } from 'app/@core/services/user.service';
import { Ads } from 'app/shared/models/ads.model';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from 'app/@core/services/ads.service';
import { TranslateServiceRest } from 'app/@core/services/translateREST.service';
import { UserAddAdsRequest } from 'app/shared/models/useraddAdsRequest.model';

@Component({
  selector: 'app-category-ads',
  templateUrl: './category-ads.component.html',
  styleUrls: ['./category-ads.component.scss'],
})
export class CategoryAdsComponent implements OnInit, OnDestroy {
  selectedImage: string;
  displaySideNav: boolean;
  subscriptionLang: Subscription;
  categoryName: string;
  currentLang = 'de';
  favoriteAds: Ads[];
  numberOfFavorites;
  favAds: Ads[] = [];
  ads: Ads[];
  token;
  groupId;
  userRequest: UserAddAdsRequest;
  pageNumber = 1;
  numberOfFavs: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adsService: AdsService,
    private userService: UserService,
    private helpersService: HelpersService,
    private translateBackend: TranslateServiceRest,
    private location: Location
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.groupId = params.groupId;
      this.adsService
        .getCategoryById(params.groupId)
        .subscribe((categoryTitle) => {
          this.categoryName = categoryTitle.groupName[this.currentLang];
        });
      this.adsService
        .getAdsByGroupId(params.groupId, this.pageNumber)
        .subscribe((response) => {
          this.ads = response;
          this.token = localStorage.getItem(AuthConst.token);
          if (this.token) {
            this.getFavoriteAds(Number(localStorage.getItem(AuthConst.userId)));
          } else {
            this.favAds = this.ads;
          }
        });
      this.currentLang = localStorage.getItem(AuthConst.language);
      this.subscriptionLang = this.translateBackend
        .getLanguage()
        .subscribe((message) => {
          this.currentLang = message;
          this.adsService
            .getCategoryById(this.groupId)
            .subscribe((categoryTitle) => {
              this.categoryName = categoryTitle.groupName[this.currentLang];
              this.getImage(this.groupId);
            });
        });
    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  displaySideBar() {
    this.helpersService.displaySideBar(this.displaySideNav);
  }

  getImage(groupId) {
    switch (groupId) {
      case '1':
        this.selectedImage =
          '../../../assets/images/navigation/red/Antiquities & Art.svg';
        break;
      case '2':
        this.selectedImage =
          '../../../assets/images/navigation/red/knives & tools 2.svg';
        break;
      case '3':
        this.selectedImage =
          '../../../assets/images/navigation/red/Commercial.svg';
        break;
      case '4':
        this.selectedImage = '../../../assets/images/navigation/red/Garden.svg';
        break;
      case '5':
        this.selectedImage =
          '../../../assets/images/navigation/red/Household.svg';
        break;
      case '6':
        this.selectedImage =
          '../../../assets/images/navigation/red/Fashion.svg';
        break;
      case '7':
        this.selectedImage =
          '../../../assets/images/navigation/red/outdoor & survival v1.svg';
        break;
      case '8':
        this.selectedImage = '../../../assets/images/navigation/red/IT.svg';
        break;
      case '9':
        this.selectedImage = '../../../assets/images/navigation/red/CD.svg';
        break;
      case '10':
        this.selectedImage =
          '../../../assets/images/navigation/red/lamps & illuminants 2.svg';
        break;
      case '11':
        this.selectedImage =
          '../../../assets/images/navigation/red/batteries & chargers.svg';
        break;
      case '12':
        this.selectedImage =
          '../../../assets/images/navigation/red/Watches & Jewlery.svg';
        break;
      case '13':
        this.selectedImage = '../../../assets/images/navigation/red/Sport.svg';
        break;
      case '14':
        this.selectedImage =
          '../../../assets/images/navigation/red/rc toy - modelling 2.svg';
        break;
      case '15':
        this.selectedImage = '../../../assets/images/navigation/red/Books.svg';
        break;
      case '16':
        this.selectedImage = '../../../assets/images/navigation/red/Office.svg';
        break;
      case '17':
        this.selectedImage = '../../../assets/images/navigation/red/Pets.svg';
        break;
      case '18':
        this.selectedImage =
          '../../../assets/images/navigation/red/Instruments.svg';
        break;
      case '19':
        this.selectedImage =
          '../../../assets/images/navigation/red/Motors & Wheels.svg';
        break;
      case '20':
        this.selectedImage =
          '../../../assets/images/navigation/red/Handcrafted.svg';
        break;
      case '21':
        this.selectedImage =
          '../../../assets/images/navigation/red/sold by the meter.svg';
        break;
      case '22':
        this.selectedImage =
          '../../../assets/images/navigation/red/sold by the kg 2.svg';
        break;
      case '23':
        this.selectedImage = '../../../assets/images/navigation/red/Luxury.svg';
        break;
      case '24':
        this.selectedImage = '../../../assets/images/navigation/red/Toys.svg';
        break;
      case '25':
        this.selectedImage = '../../../assets/images/navigation/red/Unique.svg';
        break;
      case '26':
        this.selectedImage = '../../../assets/images/navigation/red/Wooden.svg';
        break;
      case '27':
        this.selectedImage =
          '../../../assets/images/navigation/red/Lifehacks.svg';
        break;
      case '28':
        this.selectedImage =
          '../../../assets/images/navigation/red/drinks (2).svg';
        break;
      case '29':
        this.selectedImage =
          '../../../assets/images/navigation/red/Collection.svg';
        break;
    }
  }

  getFavoriteAds(userId: number) {
    this.userService.getFavourites().subscribe((x) => {
      this.favoriteAds = x;
      // Replace objects between two arrays.
      this.favAds = this.ads.map(
        (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
      );
    });
    return this.favAds;
  }

  backClicked() {
    this.location.back();
  }
}
