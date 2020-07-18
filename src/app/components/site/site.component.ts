import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
} from "@angular/core";
import { MatCarousel, MatCarouselComponent } from "@ngmodule/material-carousel";
import { AdsService } from "src/app/@core/services/ads.service";
import { Ads } from "src/app/shared/models/ads.model";
import { AuthConst } from "src/app/@core/consts/auth.const";
import { UserService } from 'src/app/@core/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: "app-site",
  templateUrl: "./site.component.html",
  styleUrls: ["./site.component.scss"],
})
export class SiteComponent implements OnInit {
  encapsulation: ViewEncapsulation.None;

  searchText;
  items: Array<any> = [];
  categoryImage: any;
  public ads: Ads[] = [];
  public randomAds: Ads[];
  public login: string;
  isLoggedIn: boolean;
  user?: User;
  public favoriteAds;
  numberOfFavorites: number;
  token;
  userId;
  displaySideNav: boolean;
  categoriesGroup:any;
  subCategories:any;
  categortGroupId: number;
  adssubgroup:string;

  responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 4,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 2,
      numScroll: 1,
    },
  ];

  public categories = [
    {
      id: 1,
      title: "Antiquities & Art.png",
      image: "../../../assets/images/navigation/Antiquities & Art.png",
      selectedImage:
        "../../../assets/images/navigation/red/Antiquities & Art.png",
      imageTo: "",
    },
    {
      id: 2,
      title: "Books",
      image: "../../../assets/images/navigation/Books.png",
      selectedImage: "../../../assets/images/navigation/red/Books.png",
      imageTo: "",
    },
    {
      id: 3,
      title: "CD",
      image: "../../../assets/images/navigation/CD.png",
      selectedImage: "../../../assets/images/navigation/red/CD.png",
      imageTo: "",
    },
    {
      id: 4,
      title: "Collection",
      image: "../../../assets/images/navigation/Collection.png",
      selectedImage: "../../../assets/images/navigation/red/Collection.png",
      imageTo: "",
    },
    {
      id: 5,
      title: "Commercial",
      image: "../../../assets/images/navigation/Commercial.png",
      selectedImage: "../../../assets/images/navigation/red/Commercial.png",
      imageTo: "",
    },
    {
      id: 6,
      title: "Fashion",
      image: "../../../assets/images/navigation/Fashion.png",
      selectedImage: "../../../assets/images/navigation/red/Fashion.png",
      imageTo: "",
    },
    {
      id: 7,
      title: "Garden",
      image: "../../../assets/images/navigation/Garden.png",
      selectedImage: "../../../assets/images/navigation/red/Garden.png",
      imageTo: "",
    },
    {
      id: 8,
      title: "Handcrafted",
      image: "../../../assets/images/navigation/Handcrafted.png",
      selectedImage: "../../../assets/images/navigation/red/Handcrafted.png",
      imageTo: "",
    },
    {
      id: 9,
      title: "Household",
      image: "../../../assets/images/navigation/Household.png",
      selectedImage: "../../../assets/images/navigation/red/Household.png",
      imageTo: "",
    },
    {
      id: 10,
      title: "Instruments",
      image: "../../../assets/images/navigation/Instruments.png",
      selectedImage: "../../../assets/images/navigation/red/Instruments.png",
      imageTo: "",
    },
    {
      id: 11,
      title: "Lifehacks",
      image: "../../../assets/images/navigation/Lifehacks.png",
      selectedImage: "../../../assets/images/navigation/red/Lifehacks.png",
      imageTo: "",
    },
    {
      id: 12,
      title: "Luxury",
      image: "../../../assets/images/navigation/Luxury.png",
      selectedImage: "../../../assets/images/navigation/red/Luxury.png",
      imageTo: "",
    },
    {
      id: 13,
      title: "Motors & Wheels",
      image: "../../../assets/images/navigation/Motors & Wheels.png",
      selectedImage:
        "../../../assets/images/navigation/red/Motors & Wheels.png",
      imageTo: "",
    },
    {
      id: 14,
      title: "Office",
      image: "../../../assets/images/navigation/Office.png",
      selectedImage: "../../../assets/images/navigation/red/Office.png",
      imageTo: "",
    },
    {
      id: 15,
      title: "Pets",
      image: "../../../assets/images/navigation/Pets.png",
      selectedImage: "../../../assets/images/navigation/red/Pets.png",
      imageTo: "",
    },
    {
      id: 16,
      title: "Sport",
      image: "../../../assets/images/navigation/Sport.png",
      selectedImage: "../../../assets/images/navigation/red/Sport.png",
      imageTo: "",
    },
    {
      id: 17,
      title: "Toys",
      image: "../../../assets/images/navigation/Toys.png",
      selectedImage: "../../../assets/images/navigation/red/Toys.png",
      imageTo: "",
    },
    {
      id: 18,
      title: "Traditionally",
      image: "../../../assets/images/navigation/traditionally.png",
      selectedImage: "../../../assets/images/navigation/red/traditionally.png",
      imageTo: "",
    },
    {
      id: 19,
      title: "Unique",
      image: "../../../assets/images/navigation/Unique.png",
      selectedImage: "../../../assets/images/navigation/red/Unique.png",
      imageTo: "",
    },
    {
      id: 20,
      title: "Watches & Jewlery",
      image: "../../../assets/images/navigation/Watches & Jewlery.png",
      selectedImage:
        "../../../assets/images/navigation/red/Watches & Jewlery.png",
      imageTo: "",
    },
    {
      id: 21,
      title: "Wooden",
      image: "../../../assets/images/navigation/Wooden.png",
      selectedImage: "../../../assets/images/navigation/red/Wooden.png",
      imageTo: "",
    },
  ];


  constructor(private cdr: ChangeDetectorRef, private adsService: AdsService, private userService: UserService) {
    this.token =localStorage.getItem(AuthConst.token)

  }

  ngOnInit() {
    this.selectCategory(1);
    this.adsService.getAllVisibleAds().subscribe((response) => {
      this.ads = response;
      this.randomAds = this.shuffle(response);
      console.log(response);
    });
    this.adsService.getAllAdsGroups().subscribe( x => {
      this.categoriesGroup = x
      console.log(this.categoriesGroup)

    })

    if (this.token) {
      this.userService.getUser().subscribe( response => {
        this.userId = response.id
        this.userService.getFavourites(response.id).subscribe( x => {
          this.favoriteAds = x
          this.numberOfFavorites = x.length
          console.log('Favorite ads number', this.numberOfFavorites)
        },
        )
      })
      }
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
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  displaySide() {
    this.displaySideNav = true;
  }

  hideSide() {
    this.displaySideNav = false;
  }

  selectDropDown(id:number) {
    this.adsService.getAllAdsSubGroup(id).subscribe( response => {
      this.subCategories = response
      console.log(this.subCategories)
    })
  }

  getAdsByParams(adssubgroup: any) {
    this.adssubgroup = adssubgroup
    this.adsService.getAdsByParam(this.adssubgroup).subscribe( response => {
      this.ads = response
      this.randomAds = this.shuffle(response)
      console.log(response)
    })
  }
}
