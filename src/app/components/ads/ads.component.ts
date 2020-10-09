import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../../@core/services/ads.service';
import {Ads} from '../../shared/models/ads.model';
import {UserService} from '../../@core/services/user.service';
import {HelpersService} from '../../@core/services/helpers.service';
import {AuthService} from '../../@core/services/auth.service';
import {UserAddAdsRequest} from '../../shared/models/useraddAdsRequest.model';
import {AuthConst} from '../../@core/consts/auth.const';
import {TranslateServiceRest} from '../../@core/services/translateREST.service';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit, OnDestroy {
  subGroupId: number;
  groupId: number;
  ads: Ads[];
  token;
  userRequest: UserAddAdsRequest;
  userId;
  currentLang;
  favAds: Ads[];
  favoriteAds: Ads[];
  numberOfFavorites: number;
  displaySideNav = true;
  categoryName: string;
  subCategoryName: string;
  subscriptionLang: Subscription;
  selectedImage: string;
  pageNumber = 1;
  clickedTags: Array<string> = [];
  clickedTag: string;
  tags = [];



  constructor(private activatedRoute: ActivatedRoute,
              private adsService: AdsService,
              private userService: UserService,
              private helpersService: HelpersService,
              private translateBackend: TranslateServiceRest,
              private location: Location,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.currentLang = localStorage.getItem(AuthConst.language)
    this.token = localStorage.getItem(AuthConst.token);
    // if (this.token) {
    //   this.userService.getUser().subscribe( user => {
    //     this.userId = user.id;
    //   });
    // }
    this.activatedRoute.params.subscribe((params) => {
      this.subGroupId = params.subGroupId;
      this.groupId = params.groupId;
      console.log(this.subGroupId);
      this.adsService.getSubCategoryById(params.subGroupId).subscribe( subTitle => {
        this.subCategoryName = subTitle.subGroupName[this.currentLang]
      });
      this.adsService.getCategoryById(params.groupId).subscribe( categoryTitle => {
        this.categoryName = categoryTitle.groupName[this.currentLang]
        this.getImage(params.groupId)
      });
      this.adsService.getSubBySubGroupId(params.subGroupId).subscribe( x => {
        console.log(x, 'x')
      })
      this.adsService.getAdsBySubGroupParam(params.subGroupId, this.pageNumber).subscribe((ads) => {
        this.ads = ads;
        if (this.token) {
          this.getFavoriteAds(Number(localStorage.getItem(AuthConst.userId)));
        } else {
          this.favAds = ads;
        }
        // this.getUserAndFavAd();
        console.log(this.subGroupId, 'subgroupAds');
      });
    });
    this.subscriptionLang = this.translateBackend
      .getLanguage()
      .subscribe((message) => {
        this.currentLang = message;
        this.lang();
        this.adsService.getSubCategoryById(this.subGroupId).subscribe( subTitle => {
          this.subCategoryName = subTitle.subGroupName[this.currentLang]
        });
        this.adsService.getCategoryById(this.groupId).subscribe( categoryTitle => {
          this.categoryName = categoryTitle.groupName[this.currentLang]
          this.getImage(this.groupId);
        });
      });
      this.lang();
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
          this.selectedImage = '../../../assets/images/navigation/red/Antiquities & Art.svg'
          break;
      case '2':
        this.selectedImage =
        '../../../assets/images/navigation/red/knives & tools 2.svg'
          break;
      case '3':
        this.selectedImage = '../../../assets/images/navigation/red/Commercial.svg'
          break;
          case '4':
            this.selectedImage = '../../../assets/images/navigation/red/Garden.svg'
            break;
        case '5':
          this.selectedImage = '../../../assets/images/navigation/red/Household.svg'
            break;
        case '6':
          this.selectedImage = '../../../assets/images/navigation/red/Fashion.svg'
            break;
            case '27':
              this.selectedImage = '../../../assets/images/navigation/red/Lifehacks.svg'
              break;
          case '7':
              this.selectedImage = ''
              break;
          case '8':
            this.selectedImage = '../../../assets/images/navigation/red/IT.svg'
              break;
              case '9':
                this.selectedImage = '../../../assets/images/navigation/red/CD.svg'
                break;
            case '10':
              this.selectedImage = '../../../assets/images/navigation/red/lamps & illuminants 2.svg'
                break;
            case '11':
              this.selectedImage = '../../../assets/images/navigation/red/batteries & chargers.svg'
                break;
                case '12':
                  this.selectedImage = '../../../assets/images/navigation/red/Watches & Jewlery.svg'
                  break;
              case '13':
                this.selectedImage = '../../../assets/images/navigation/red/Sport.svg'
                  break;
              case '14':
                this.selectedImage = '../../../assets/images/navigation/red/rc toy - modelling 2.svg'
                  break;
                  case '15':
                    this.selectedImage = '../../../assets/images/navigation/red/Books.svg'
                    break;
                case '16':
                  this.selectedImage = '../../../assets/images/navigation/red/Office.svg'
                    break;
                case '17':
                  this.selectedImage = '../../../assets/images/navigation/red/Pets.svg'
                    break;
                    case '18':
                      this.selectedImage = '../../../assets/images/navigation/red/Instruments.svg'
                      break;
                  case '19':
                    this.selectedImage = '../../../assets/images/navigation/red/Motors & Wheels.svg'
                      break;
                  case '20':
                    this.selectedImage = '../../../assets/images/navigation/red/Handcrafted.svg'
                      break;
                      case '21':
                        this.selectedImage = '../../../assets/images/navigation/red/sold by the meter.svg'
                        break;
                    case '22':
                      this.selectedImage = '../../../assets/images/navigation/red/sold by the kg 2.svg'
                        break;
                    case '23':
                      this.selectedImage = '../../../assets/images/navigation/red/Luxury.svg'
                        break;
                        case '24':
                          this.selectedImage = '../../../assets/images/navigation/red/Toys.svg'
                          break;
                      case '25':
                        this.selectedImage = '../../../assets/images/navigation/red/Unique.svg'
                          break;
                      case '26':
                        this.selectedImage = '../../../assets/images/navigation/red/Wooden.svg'
                          break;
                          case '29':
                        this.selectedImage = '../../../assets/images/navigation/red/drinks.svg';
                        break;
  }

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

  lang() {
    if (this.currentLang === 'de') {
      this.tags = [
        'antik',
        'gebraucht',
        'neu',
        'gut zu gebrauchen',
        'restauriert',
        'defekt',
        'luxuriös',
        'aus holz',
        'sammlerstück',
        'selten',
        'einzigartig',
        'handgemacht',
        'aus erste hand',
        'für kinder & jugendliche',
        'für männer',
        'für frauen',
        'preis verhandelbar',
        'macOS & iOS',
        'android',
        'windows',
      ];
    } else if (this.currentLang === 'en') {
      this.tags = [
        'antique',
        'second hand',
        'new',
        'good to use',
        'restored',
        'malfunction',
        'luxurious',
        'wooden',
        "collector's item",
        'rare',
        'unique',
        'handmade',
        'first-hand',
        'for children & teenagers',
        'for men',
        'for women',
        'price negotiable',
        'macOS & iOS',
        'android',
        'windows',
      ];
    } else if (this.currentLang === 'it') {
      this.tags = [
        'antico',
        'seconda mano',
        'nuovo',
        'buono da usare',
        'restaurato',
        'malfunzionamento',
        'lussuoso',
        'legno',
        'oggetto da collezione',
        'raro',
        'unico',
        'fatto a mano',
        'di prima mano',
        'per bambini & adolescenti',
        'per uomo',
        'per donne',
        'prezzo negoziabile',
        'macOS & iOS',
        'android',
        'windows',
      ];
    } else if (this.currentLang === 'fr') {
      this.tags = [
        'antique',
        "d'occasion",
        'nouveau',
        'bon à utiliser',
        'restaure',
        'mauvais fonctionnement',
        'luxueux',
        'en bois',
        'pièce de collection',
        'rare',
        'unique',
        'fait main',
        'première main',
        'pour les enfants & adolescents',
        'pour hommes',
        'pour femme',
        'prix nègociable',
        'macOS & iOS',
        'android',
        'windows',
      ];
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

  backClicked() {
    this.location.back();
  }

  chosenTag(tag: string): void {
    this.clickedTag = tag;

    this.clickedTags = [...this.clickedTags];

    if (this.clickedTags.includes(this.clickedTag)) {
      this.clickedTags = this.clickedTags.filter((e) => e !== this.clickedTag);
      return;
    }

    if (this.clickedTags.length < 4) {
      this.clickedTags.push(tag);
    } else {
      this.setLanguage();
    }
  }

  setLanguage() {
    if (this.currentLang === 'en') {
      return this.toastr.warning('You can choose up to 3 tags');
    } else if (this.currentLang === 'fr') {
      return this.toastr.warning("Vous pouvez choisir jusqu'à 3 balises");
    } else if (this.currentLang === 'de') {
      return this.toastr.warning('Sie können bis zu 3 Tags auswählen');
    } else if (this.currentLang === 'it') {
      return this.toastr.warning('Puoi scegliere fino a 3 tag');
    }
  }


}
