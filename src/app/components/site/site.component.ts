import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
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
import { de } from 'assets/i18n/de';

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

  state;
  selected: boolean;
  currentLang = 'de';

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
      title: 'Antiquities & Art',
      image: '../../../assets/images/navigation/Antiquities & Art.png',
      selectedImage:
        '../../../assets/images/navigation/red/Antiquities & Art.png',
      imageTo: '',
    },
    {
      id: 15,
      title: 'Books',
      image: '../../../assets/images/navigation/Books.png',
      selectedImage: '../../../assets/images/navigation/red/Books.png',
      imageTo: '',
    },
    {
      id: 9,
      title: 'CD',
      image: '../../../assets/images/navigation/CD.png',
      selectedImage: '../../../assets/images/navigation/red/CD.png',
      imageTo: '',
    },
    {
      id: 28,
      title: 'Collection',
      image: '../../../assets/images/navigation/Collection.png',
      selectedImage: '../../../assets/images/navigation/red/Collection.png',
      imageTo: '',
    },
    {
      id: 3,
      title: 'Trade & Craftrcial',
      image: '../../../assets/images/navigation/Commercial.png',
      selectedImage: '../../../assets/images/navigation/red/Commercial.png',
      imageTo: '',
    },
    {
      id: 6,
      title: 'Fashion',
      image: '../../../assets/images/navigation/Fashion.png',
      selectedImage: '../../../assets/images/navigation/red/Fashion.png',
      imageTo: '',
    },
    {
      id: 4,
      title: 'Garden',
      image: '../../../assets/images/navigation/Garden.png',
      selectedImage: '../../../assets/images/navigation/red/Garden.png',
      imageTo: '',
    },
    {
      id: 20,
      title: 'Handmade',
      image: '../../../assets/images/navigation/Handcrafted.png',
      selectedImage: '../../../assets/images/navigation/red/Handcrafted.png',
      imageTo: '',
    },
    {
      id: 5,
      title: 'Household & Living',
      image: '../../../assets/images/navigation/Household.png',
      selectedImage: '../../../assets/images/navigation/red/Household.png',
      imageTo: '',
    },
    {
      id: 18,
      title: 'Instruments & studio',
      image: '../../../assets/images/navigation/Instruments.png',
      selectedImage: '../../../assets/images/navigation/red/Instruments.png',
      imageTo: '',
    },
    {
      id: 27,
      title: 'Good to use & Lifehacks',
      image: '../../../assets/images/navigation/Lifehacks.png',
      selectedImage: '../../../assets/images/navigation/red/Lifehacks.png',
      imageTo: '',
    },
    {
      id: 23,
      title: 'Luxurious',
      image: '../../../assets/images/navigation/Luxury.png',
      selectedImage: '../../../assets/images/navigation/red/Luxury.png',
      imageTo: '',
    },
    {
      id: 19,
      title: 'Motors & Wheels',
      image: '../../../assets/images/navigation/Motors & Wheels.png',
      selectedImage:
        '../../../assets/images/navigation/red/Motors & Wheels.png',
      imageTo: '',
    },
    {
      id: 16,
      title: 'Office Supplies and Stationery',
      image: '../../../assets/images/navigation/Office.png',
      selectedImage: '../../../assets/images/navigation/red/Office.png',
      imageTo: '',
    },
    {
      id: 17,
      title: 'Pet Supplies',
      image: '../../../assets/images/navigation/Pets.png',
      selectedImage: '../../../assets/images/navigation/red/Pets.png',
      imageTo: '',
    },
    {
      id: 13,
      title: 'Sport, Hobby and Leisure',
      image: '../../../assets/images/navigation/Sport.png',
      selectedImage: '../../../assets/images/navigation/red/Sport.png',
      imageTo: '',
    },
    {
      id: 24,
      title: 'Toys',
      image: '../../../assets/images/navigation/Toys.png',
      selectedImage: '../../../assets/images/navigation/red/Toys.png',
      imageTo: '',
    },
    {
      id: 20,
      title: 'Handmade',
      image: '../../../assets/images/navigation/traditionally.png',
      selectedImage: '../../../assets/images/navigation/red/traditionally.png',
      imageTo: '',
    },
    {
      id: 25,
      title: 'Unique',
      image: '../../../assets/images/navigation/Unique.png',
      selectedImage: '../../../assets/images/navigation/red/Unique.png',
      imageTo: '',
    },
    {
      id: 12,
      title: 'Watches & Jewlery',
      image: '../../../assets/images/navigation/Watches & Jewlery.png',
      selectedImage:
        '../../../assets/images/navigation/red/Watches & Jewlery.png',
      imageTo: '',
    },
    {
      id: 26,
      title: 'Wooden',
      image: '../../../assets/images/navigation/Wooden.png',
      selectedImage: '../../../assets/images/navigation/red/Wooden.png',
      imageTo: '',
    },
    {
      id: 11,
      title: 'Batteries & Chargers',
      image: '../../../assets/images/navigation/batteries & chargers 2.png',
      selectedImage: '../../../assets/images/navigation/red/batteries & chargers.png',
      imageTo: '',
    },
    {
      id: 2,
      title: 'Knives & Tools',
      image: '../../../assets/images/navigation/knives & tools.png',
      selectedImage: '../../../assets/images/navigation/red/knives & tools 2.png',
      imageTo: '',
    },
    {
      id: 10,
      title: 'Lamps & Illuminants',
      image: '../../../assets/images/navigation/lamps & illuminants.png',
      selectedImage: '../../../assets/images/navigation/red/lamps & illuminants 2.png',
      imageTo: '',
    },
    {
      id: 14,
      title: 'Modelling',
      image: '../../../assets/images/navigation/rc toy - modelling.png',
      selectedImage: '../../../assets/images/navigation/red/rc toy - modelling 2.png',
      imageTo: '',
    },
    {
      id: 22,
      title: 'Sold by kg',
      image: '../../../assets/images/navigation/sold by the kg.png',
      selectedImage: '../../../assets/images/navigation/red/sold by the kg 2.png',
      imageTo: '',
    },
    {
      id: 21,
      title: 'Sold by meter',
      image: '../../../assets/images/navigation/sold by the meter 2.png',
      selectedImage: '../../../assets/images/navigation/red/sold by the meter.png',
      imageTo: '',
    },
    {
      id: 8,
      title: 'IT',
      image: '../../../assets/images/navigation/IT.png',
      selectedImage: '../../../assets/images/navigation/red/IT.png',
      imageTo: '',
    },
  ];




  constructor(private cdr: ChangeDetectorRef,
    private adsService: AdsService,
    private userService: UserService,
    private helpersService: HelpersService,
    private router: Router,
  ) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.filteredAds = this.router.getCurrentNavigation().extras.state.data;
      console.log('filteredads', this.filteredAds)
    }
  }

  ngOnInit() {
    this.adsService.getAllAdsGroups().subscribe(x => {
      this.categoriesGroup = x;
      console.log(this.categoriesGroup)
    });
    this.token = localStorage.getItem(AuthConst.token);
    this.selectCategory(1);
    if (this.filteredAds.length > 0) {
      this.ads = this.filteredAds
      this.randomAds = this.shuffle(this.filteredAds);
      if (this.token) {
        this.getUserAndFavAd();
      } else {
        this.favAds = this.ads;

      }
    } else {
      this.adsService.getAdsByActiveStatus().subscribe((response) => {
        this.ads = response;
        console.log('ads', this.ads)
        this.randomAds = this.shuffle(response);
        if (this.token) {
          this.getUserAndFavAd();
        } else {
          this.favAds = this.ads;
        }
      });
    }
    this.numberOfFavs = this.helpersService.$numOfFavs.subscribe(response => {
      this.getNumOfFavs();
    });

  }

  receiveNotification(notification: any) {
    this.currentLang = notification;
  }


  getAdsBySearch() {
    if (this.searchProductName == undefined) {
      return
    } else {

    this.adsService.getAdsdBySearch(this.searchProductName).subscribe( x=> {


      if (this.token) {
        this.favAds = x.map(obj => this.favoriteAds.find(o => o.id === obj.id) || obj);
      } else {
        this.favAds = x;
      }
    },
    error => {
      console.log('error')
    })
  }

  }


  getUserAndFavAd() {
    this.userService.getUser().subscribe(response => {
      this.userId = response.id;
      this.userService.getFavourites(response.id).subscribe(x => {
        if (this.token) {
          this.favoriteAds = x;
          this.numberOfFavorites = x.length;

          // Replace objects between two arrays.
          this.favAds = this.ads.map(obj => this.favoriteAds.find(o => o.id === obj.id) || obj);
        };
      }
      );
    });
  }

  getNumOfFavs() {
    this.userService.getUser().subscribe(response => {
      this.userId = response.id;
      this.userService.getFavourites(response.id).subscribe(x => {
        if (this.token) {
          this.numberOfFavorites = x.length;
        };
      }
      );
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
  }

  displaySide() {
    this.displaySideNav = true;
  }

  hideSide() {
    this.displaySideNav = false;
  }

  selectDropDown(id: number) {
    this.adsService.getAllAdsSubGroup(id).subscribe(response => {
      this.subCategories = response;
    });
  }

  getAdsByParams(adssubgroup: number) {
    this.adsService.getAdsBySubGroupParam(adssubgroup).subscribe(response => {
      this.ads = response;
      this.randomAds = this.shuffle(response);
      this.getUserAndFavAd();
    });
  }

  increaseShow() {
    this.showItems += 16;
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

removeFromWishlist(adId: number) {
    this.userService.deleteUserFavourite(adId, this.userId).subscribe(
      _x => {
        console.log('delete update to favorite', _x);
      }
    ),
      _error => {
        console.log('not delete to favorite');
      };
      this.helpersService.$numOfFavs.next();
  }
}
