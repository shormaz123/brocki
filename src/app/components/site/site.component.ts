import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  OnChanges,
  OnDestroy, ViewChild, ElementRef,
} from '@angular/core';
import { AdsService } from '../../@core/services/ads.service';
import { Ads } from '../../shared/models/ads.model';
import { AuthConst } from '../../@core/consts/auth.const';
import { UserService } from '../../@core/services/user.service';
import { User } from '../../shared/models/user.model';
import { HelpersService } from '../..//@core/services/helpers.service';
import { Subscription, Observable } from 'rxjs';
import { AdsParam } from '../../shared/models/adParams.model';
import { Router } from '@angular/router';
import { UserAddAdsRequest } from '../../shared/models/useraddAdsRequest.model';
import { en } from 'assets/i18n/en';
import { de } from 'assets/i18n/de';
import { fr } from 'assets/i18n/fr';
import { it } from 'assets/i18n/it';
import {TranslateServiceRest} from '../../@core/services/translateREST.service';

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
  displaySideNav: boolean;
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

  @ViewChild('panel', { read: ElementRef, static: false }) public panel: ElementRef<any>;


  state;
  selected: boolean;

  private numberOfFavs: Subscription;

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1,
    },
  ];

  public categories = [
    {
      id: 1,
      title:  {
        de: 'Antiquitäten & Kunst',
        en: 'Antiques & Art',
        fr: 'Antiquités et Art',
        it: 'Antiquariato e arte',
      },
      image: '../../../assets/images/navigation/Antiquities & Art.png',
      selectedImage:
        '../../../assets/images/navigation/red/Antiquities & Art.png',
      imageTo: '',
    },
    {
      id: 15,
      title:  {
        de: 'Bücher und Zeitschriften',
        en: 'Books and Magazines',
        fr: 'Livres et magazines',
        it: 'Libri e riviste',
      },
      image: '../../../assets/images/navigation/Books.png',
      selectedImage: '../../../assets/images/navigation/red/Books.png',
      imageTo: '',
    },
    {
      id: 9,
      title:  {
        de: 'CDs',
        en: 'CDs',
        fr: 'CDs',
        it: 'CDs',
      },
      image: '../../../assets/images/navigation/CD.png',
      selectedImage: '../../../assets/images/navigation/red/CD.png',
      imageTo: '',
    },
    {
      id: 28,
      title:  {
        de: 'Sammlung',
        en: 'Collection',
        fr: 'Collection',
        it: 'Collezione',
      },
      image: '../../../assets/images/navigation/Collection.png',
      selectedImage: '../../../assets/images/navigation/red/Collection.png',
      imageTo: '',
    },
    {
      id: 3,
      title:  {
        de: 'Gewerbe & Handwerk',
        en: 'Trade & Craft',
        fr: 'Commerce et artisanat',
        it: 'Commercio e artigianato',
      },
      image: '../../../assets/images/navigation/Commercial.png',
      selectedImage: '../../../assets/images/navigation/red/Commercial.png',
      imageTo: '',
    },
    {
      id: 6,
      title: {
        de: 'Mode & Accessoires',
        en: 'Fashion & Accessories',
        fr: 'Accessoires de mode',
        it: 'Accessori alla moda',
      },
      image: '../../../assets/images/navigation/Fashion.png',
      selectedImage: '../../../assets/images/navigation/red/Fashion.png',
      imageTo: '',
    },
    {
      id: 4,
      title: {
        de: 'Garten & Zubehör',
        en: 'Garden & Accessories',
        fr: 'Jardin & Accessoires',
        it: 'Giardino e accessori',
      },
      image: '../../../assets/images/navigation/Garden.png',
      selectedImage: '../../../assets/images/navigation/red/Garden.png',
      imageTo: '',
    },
    {
      id: 20,
      title: {
        de: 'Handgemacht',
        en: 'Handmade',
        fr: 'Fait main',
        it: 'Fatto a mano',
      },
      image: '../../../assets/images/navigation/Handcrafted.png',
      selectedImage: '../../../assets/images/navigation/red/Handcrafted.png',
      imageTo: '',
    },
    {
      id: 5,
      title: {
        de: 'Haushalt & Wohnen',
        en: 'Household & Living',
        fr: 'Ménage et vie',
        it: 'Famiglia e vita',
      },
      image: '../../../assets/images/navigation/Household.png',
      selectedImage: '../../../assets/images/navigation/red/Household.png',
      imageTo: '',
    },
    {
      id: 18,
      title: {
        de: 'Instrumente & Studio',
        en: 'Instruments & studio',
        fr: 'Instruments et studio',
        it: 'Strumenti e studio',
      },
      image: '../../../assets/images/navigation/Instruments.png',
      selectedImage: '../../../assets/images/navigation/red/Instruments.png',
      imageTo: '',
    },
    {
      id: 27,
      title: {
        de: 'Gut zu gebrauchen & Lifehacks',
        en: 'Good to use & lifehacks',
        fr: 'Bon à utiliser et lifehacks',
        it: 'Buono da usare e salvagenti',
      },
      image: '../../../assets/images/navigation/Lifehacks.png',
      selectedImage: '../../../assets/images/navigation/red/Lifehacks.png',
      imageTo: '',
    },
    {
      id: 23,
      title: {
        de: 'Luxuriös',
        en: 'Luxurious',
        fr: 'Luxueux',
        it: 'Lussuoso',
      },
      image: '../../../assets/images/navigation/Luxury.png',
      selectedImage: '../../../assets/images/navigation/red/Luxury.png',
      imageTo: '',
    },
    {
      id: 19,
      title: {
        de: 'Motoren & Räder',
        en: 'Motors & Wheels',
        fr: 'Moteurs et roues',
        it: 'Motori e ruote',
      },
      image: '../../../assets/images/navigation/Motors & Wheels.png',
      selectedImage:
        '../../../assets/images/navigation/red/Motors & Wheels.png',
      imageTo: '',
    },
    {
      id: 16,
      title: {
        de: 'Bürobedarf & Schreibwaren',
        en: 'Office Supplies and Stationery',
        fr: 'Fournitures de bureau et papeterie',
        it: 'Forniture per ufficio e cancelleria',
      },
      image: '../../../assets/images/navigation/Office.png',
      selectedImage: '../../../assets/images/navigation/red/Office.png',
      imageTo: '',
    },
    {
      id: 17,
      title: {
        de: 'Tierbedarf',
        en: 'Pet Supplies',
        fr: 'Fournitures pour animaux',
        it: 'Prodotti per animali',
      },
      image: '../../../assets/images/navigation/Pets.png',
      selectedImage: '../../../assets/images/navigation/red/Pets.png',
      imageTo: '',
    },
    {
      id: 13,
      title: {
        de: 'Sport, Hobby & Freizeit',
        en: 'Sport, Hobby & Leisure',
        fr: 'Sport, passe-temps et loisirs',
        it: 'Sport, hobby e tempo libero',
      },
      image: '../../../assets/images/navigation/Sport.png',
      selectedImage: '../../../assets/images/navigation/red/Sport.png',
      imageTo: '',
    },
    {
      id: 24,
      title: {
        de: 'Spielzeug',
        en: 'Toy',
        fr: 'Jouet',
        it: 'Giocattolo',
      },
      image: '../../../assets/images/navigation/Toys.png',
      selectedImage: '../../../assets/images/navigation/red/Toys.png',
      imageTo: '',
    },
    {
      id: 20,
      title: {
        de: 'Handgemacht',
        en: 'Handmade',
        fr: 'Fait main',
        it: 'fatto a mano',
      },
      image: '../../../assets/images/navigation/traditionally.png',
      selectedImage: 'src/assets/images/navigation/red/traditionally.png',
      imageTo: '',
    },
    {
      id: 25,
      title: {
        de: 'Einzigartig',
        en: 'Unique',
        fr: 'Unique',
        it: 'Unico',
      },
      image: '../../../assets/images/navigation/Unique.png',
      selectedImage: '../../../assets/images/navigation/red/Unique.png',
      imageTo: '',
    },
    {
      id: 12,
      title: {
        de: 'Uhren & Schmuck',
        en: 'Watches & Jewellery',
        fr: 'Montres & Bijoux',
        it: 'Orologi e gioielli',
      },
      image: '../../../assets/images/navigation/Watches & Jewlery.png',
      selectedImage:
        '../../../assets/images/navigation/red/Watches & Jewlery.png',
      imageTo: '',
    },
    {
      id: 26,
      title: {
        de: 'Aus Holz',
        en: 'Wooden',
        fr: 'En bois',
        it: 'Di legno',
      },
      image: '../../../assets/images/navigation/Wooden.png',
      selectedImage: '../../../assets/images/navigation/red/Wooden.png',
      imageTo: '',
    },
    {
      id: 11,
      title: {
        de: 'Batterien und Ladegeräte',
        en: 'Batteries & chargers',
        fr: 'Batteries et chargeurs',
        it: 'Batterie e caricabatterie',
      },
      image: '../../../assets/images/navigation/batteries & chargers 2.png',
      selectedImage:
        '../../../assets/images/navigation/red/batteries & chargers.png',
      imageTo: '',
    },
    {
      id: 2,
      title: {
        de: 'Messer & Werkzeuge',
        en: 'Knives & Tools',
        fr: 'Couteaux et outils',
        it: 'Coltelli e strumenti',
      },
      image: '../../../assets/images/navigation/knives & tools.png',
      selectedImage:
        '../../../assets/images/navigation/red/knives & tools 2.png',
      imageTo: '',
    },
    {
      id: 10,
      title: {
        de: 'Lampen & Leuchtmittel',
        en: 'Lamps & Illuminants',
        fr: 'Lampes et illuminants',
        it: 'Lampade e illuminanti',
      },
      image: '../../../assets/images/navigation/lamps & illuminants.png',
      selectedImage:
        '../../../assets/images/navigation/red/lamps & illuminants 2.png',
      imageTo: '',
    },
    {
      id: 14,
      title: {
        de: 'Modellbau',
        en: 'Modelling',
        fr: 'La modélisation',
        it: 'Modellismo',
      },
      image: '../../../assets/images/navigation/rc toy - modelling.png',
      selectedImage:
        '../../../assets/images/navigation/red/rc toy - modelling 2.png',
      imageTo: '',
    },
    {
      id: 22,
      title: {
        de: 'Kilo Ware',
        en: 'Sold by the Kilo',
        fr: 'Vendu au kilo',
        it: 'Venduto da Kilo',
      },
      image: '../../../assets/images/navigation/sold by the kg.png',
      selectedImage:
        '../../../assets/images/navigation/red/sold by the kg 2.png',
      imageTo: '',
    },
    {
      id: 21,
      title: {
        de: 'Meter Ware',
        en: 'Sold by the Meter',
        fr: 'Vendu au mètre',
        it: 'Venduto al metro',
      },
      image: '../../../assets/images/navigation/sold by the meter 2.png',
      selectedImage:
        '../../../assets/images/navigation/red/sold by the meter.png',
      imageTo: '',
    },
    {
      id: 8,
      title: {
        de: 'Computer & Software',
        en: 'Computer & Software',
        fr: 'Logiciel',
        it: 'Software per il computer',
      },
      image: '../../../assets/images/navigation/IT.png',
      selectedImage: '../../../assets/images/navigation/red/IT.png',
      imageTo: '',
    },
  ];
  subscriptionLang: Subscription;
  currentLang = 'de';
  startPage: number;
  paginationLimit: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private adsService: AdsService,
    private userService: UserService,
    private helpersService: HelpersService,
    private router: Router,
    private translateBackend: TranslateServiceRest
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.filteredAds = this.router.getCurrentNavigation().extras.state.data;
      console.log('filteredads', this.filteredAds);
    }
  }

  ngOnInit() {
    this.startPage = 0;
    this.paginationLimit = 3;
    this.adsService.getAllAdsGroups().subscribe((x) => {
      this.categoriesGroup = x;
      console.log(this.categoriesGroup);
    });
    this.token = localStorage.getItem(AuthConst.token);
    this.selectCategory(1);
    if (this.filteredAds.length > 0) {
      this.ads = this.filteredAds;
      this.randomAds = this.shuffle(this.filteredAds);
      if (this.token) {
        this.getUserAndFavAd();
      } else {
        this.favAds = this.ads;
      }
    } else {
      this.adsService.getAdsByActiveStatus().subscribe((response) => {
        this.ads = response;
        console.log('ads', this.ads);
        this.randomAds = this.shuffle(response);
        if (this.token) {
          this.getUserAndFavAd();
        } else {
          this.favAds = this.ads;
          console.log('favAds', this.favAds);
        }
      });
    }
    this.numberOfFavs = this.helpersService.$numOfFavs.subscribe((response) => {
      this.getNumOfFavs();
    });
    this.subscriptionLang = this.translateBackend
      .getLanguage()
      .subscribe((message) => {
        this.currentLang = message;
      });
  }

  receiveNotification(notification: any) {
    this.currentLang = notification;
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

  getUserAndFavAd() {
    this.userService.getUser().subscribe( response => {
      this.userId = response.id;
      console.log(this.userId)
      this.userService.getFavourites(response.id).subscribe((x) => {
        this.favoriteAds = x;
        this.numberOfFavorites = x.length;

        // Replace objects between two arrays.
        this.favAds = this.ads.map(
          (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
        );
      });
    });

  }

  getNumOfFavs() {
    this.userService.getUser().subscribe((response) => {
      this.userId = response.id;
      this.userService.getFavourites(response.id).subscribe((x) => {
        if (this.token) {
          this.numberOfFavorites = x.length;
        }
      });
    });
  }

  deselectAll() {
    this.categories.forEach((item) => {
      item.imageTo = item.image;
    });
  }

  selectCategory(id: number): void {
    this.deselectAll();
    const imageToShow = this.categories.find((image) => {
      return image.id === id;
    });

    if (imageToShow) {
      imageToShow.imageTo = imageToShow.selectedImage;
    }
  }

  shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      const index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  ngOnDestroy() {
    this.numberOfFavs.unsubscribe();
    this.subscriptionLang.unsubscribe();
  }

  displaySide() {
    this.displaySideNav = true;
  }

  hideSide() {
    this.displaySideNav = false;
  }

  selectDropDown(id: number) {
    this.adsService.getAllAdsSubGroup(id).subscribe((response) => {
      this.subCategories = response;
    });
  }

  goToAd(id: number) {
    this.router.navigate(['/ad', id], { fragment: 'header' });
  }


  getAdsByParams(adssubgroup: number) {
    this.adsService.getAdsBySubGroupParam(adssubgroup).subscribe((response) => {
      this.ads = response;
      this.randomAds = this.shuffle(response);
      // this.getUserAndFavAd();
      console.log(response, 'ads with params')
    });

  }

  increaseShow() {
    this.showItems += 16;
    this.panel.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
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
