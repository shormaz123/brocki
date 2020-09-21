import { Component, OnInit } from '@angular/core';
import { AuthConst } from 'app/@core/consts/auth.const';
import { HelpersService } from 'app/@core/services/helpers.service';
import { UserService } from 'app/@core/services/user.service';
import { Ads } from 'app/shared/models/ads.model';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from 'app/@core/services/ads.service';
import { TranslateServiceRest } from 'app/@core/services/translateREST.service';
import { UserAddAdsRequest } from 'app/shared/models/useraddAdsRequest.model';

@Component({
  selector: 'app-category-ads',
  templateUrl: './category-ads.component.html',
  styleUrls: ['./category-ads.component.scss']
})
export class CategoryAdsComponent implements OnInit {
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
  userId;
  pageNumber = 1;
  numberOfFavs: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private adsService: AdsService,
              private userService: UserService,
              private helpersService: HelpersService,
              private translateBackend: TranslateServiceRest,
              private location: Location) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.groupId  = params.groupId;
      this.adsService.getCategoryById(params.groupId).subscribe( categoryTitle => {
        this.categoryName = categoryTitle.groupName[this.currentLang];
      });
      this.adsService.getAdsByGroupId(params.groupId, this.pageNumber).subscribe(
        response => {
          this.ads = response;
          console.log(response, 'category ads');
          this.token = localStorage.getItem(AuthConst.token);
          if (this.token) {
            this.getFavoriteAds(Number(localStorage.getItem(AuthConst.userId)));
          } else {
            this.favAds = this.ads
          }
    });
      this.currentLang = localStorage.getItem(AuthConst.language);
      this.subscriptionLang = this.translateBackend
      .getLanguage()
      .subscribe((message) => {
        this.currentLang = message;
        this.adsService.getCategoryById(this.groupId).subscribe( categoryTitle => {
          this.categoryName = categoryTitle.groupName[this.currentLang];
          this.getImage(this.groupId);
        });
      });
  });
  this.numberOfFavs = this.helpersService.getNumberOfFavorites().subscribe( number => {
    this.numberOfFavorites = number;
   });
}

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
    this.numberOfFavs.unsubscribe();
  }

  displaySideBar() {
    this.helpersService.displaySideBar(this.displaySideNav);
  }

  getImage(groupId) {
    switch (groupId) {
      case '1':
          this.selectedImage = '../../../assets/images/navigation/red/Antiquities & Art.png';
          break;
      case '2':
        this.selectedImage =
        '../../../assets/images/navigation/red/knives & tools 2.png';
        break;
      case '3':
        this.selectedImage = '../../../assets/images/navigation/red/Commercial.png';
        break;
          case '4':
            this.selectedImage = '../../../assets/images/navigation/red/Garden.png';
            break;
        case '5':
          this.selectedImage = '../../../assets/images/navigation/red/Household.png';
          break;
        case '6':
          this.selectedImage = '../../../assets/images/navigation/red/Fashion.png';
          break;
            case '27':
              this.selectedImage = '../../../assets/images/navigation/red/Lifehacks.png';
              break;
          case '7':
              this.selectedImage = '';
              break;
          case '8':
            this.selectedImage = '../../../assets/images/navigation/red/IT.png';
            break;
              case '9':
                this.selectedImage = '../../../assets/images/navigation/red/CD.png';
                break;
            case '10':
              this.selectedImage = '../../../assets/images/navigation/red/lamps & illuminants 2.png';
              break;
            case '11':
              this.selectedImage = '../../../assets/images/navigation/red/batteries & chargers.png';
              break;
                case '12':
                  this.selectedImage = '../../../assets/images/navigation/red/Watches & Jewlery.png';
                  break;
              case '13':
                this.selectedImage = '../../../assets/images/navigation/red/Sport.png';
                break;
              case '14':
                this.selectedImage = '../../../assets/images/navigation/red/rc toy - modelling 2.png';
                break;
                  case '15':
                    this.selectedImage = '../../../assets/images/navigation/red/Books.png';
                    break;
                case '16':
                  this.selectedImage = '../../../assets/images/navigation/red/Office.png';
                  break;
                case '17':
                  this.selectedImage = '../../../assets/images/navigation/red/Pets.png';
                  break;
                    case '18':
                      this.selectedImage = '../../../assets/images/navigation/red/Instruments.png';
                      break;
                  case '19':
                    this.selectedImage = '../../../assets/images/navigation/red/Motors & Wheels.png';
                    break;
                  case '20':
                    this.selectedImage = '../../../assets/images/navigation/red/Handcrafted.png';
                    break;
                      case '21':
                        this.selectedImage = '../../../assets/images/navigation/red/sold by the meter.png';
                        break;
                    case '22':
                      this.selectedImage = '../../../assets/images/navigation/red/sold by the kg 2.png';
                      break;
                    case '23':
                      this.selectedImage = '../../../assets/images/navigation/red/Luxury.png';
                      break;
                        case '24':
                          this.selectedImage = '../../../assets/images/navigation/red/Toys.png';
                          break;
                      case '25':
                        this.selectedImage = '../../../assets/images/navigation/red/Unique.png';
                        break;
                      case '26':
                        this.selectedImage = '../../../assets/images/navigation/red/Wooden.png';
                        break;
  }

  }

  getFavoriteAds(userId: number) {
    this.userService.getFavourites(userId).subscribe((x) => {
      this.favoriteAds = x;
      this.numberOfFavorites = x.length;
      console.log(this.numberOfFavorites, ' numberonClick')
      // Replace objects between two arrays.
      this.favAds = this.ads.map(
        (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
      );
    });
    return this.favAds;
  }

  addToWishlist(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: Number(localStorage.getItem(AuthConst.userId))
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe((x) => {
      console.log('add update to favorite', x);
      this.raiseAdNumber();
    }),
      (error) => {
        console.log('not to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }

  removeFromWishlist(adId: number) {
    this.userService.deleteUserFavourite(adId, Number(localStorage.getItem(AuthConst.userId))).subscribe((x) => {
      console.log('delete update to favorite', x);
      this.downAdNumber();
    }),
      // tslint:disable-next-line:no-unused-expression
      (error) => {
        console.log('not delete to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }

  backClicked() {
    this.location.back();
  }

  sendNumberOfFavorites(number: number) {
    this.helpersService.sendNumberOfFavorites(number);
  }

  raiseAdNumber() {
    this.numberOfFavorites = this.numberOfFavorites + 1;
    this.sendNumberOfFavorites(this.numberOfFavorites);
  }

  downAdNumber() {

    this.numberOfFavorites = this.numberOfFavorites - 1;
    this.sendNumberOfFavorites(this.numberOfFavorites);
  }



}
