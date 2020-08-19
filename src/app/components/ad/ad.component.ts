import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AdsService } from '../../@core/services/ads.service';
import { UserService } from '../../@core/services/user.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Ads } from '../../shared/models/ads.model';
import { User } from '../../shared/models/user.model';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from 'ngx-gallery';
import { UserAddAdsRequest } from '../../shared/models/useraddAdsRequest.model';
import { AuthConst } from '../../@core/consts/auth.const';
import { HelpersService } from '../../@core/services/helpers.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  adId: number;
  userSellerId: number;
  ad: Ads;
  userSeller: User;
  productName;
  adsByUser;
  adGroupId?;
  adsByCategory;
  currentUrl = document.URL;
  defaultImage = '../../../assets/images/myAccount/profile-picture.png';
  userImage: string = this.defaultImage;
  companyImage: string[];

  usersImagesAvailabe: boolean;
  categoryImagesAvailable: boolean;

  public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
  public imageUrl =
    'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';

  images;
  userRequest: UserAddAdsRequest;
  token;
  userId: number;
  public spt: any;
  public spl: any;
  copied = false;

  mySubscription: any;

  constructor(
    private adsService: AdsService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo({ top: 0 });
    this.token = localStorage.getItem(AuthConst.token);
    if (this.token) {
      this.userService.getUser().subscribe((response) => {
        this.userId = response.id;
      });
    }

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.images = [];
    this.activatedRoute.params.subscribe((params) => {
      this.adId = params.id;
      this.getNewAd(this.adId);
    });
  }
  toogleCopied() {}

  getNewAd(id: number) {
    window.scrollTo({ top: 0 });
    this.galleryImages = [];
    this.adsService.getAdById(id).subscribe((response) => {
      this.userSellerId = response.userId;
      this.ad = response;
      this.adGroupId = response.adsGroupId;
      console.log(response);
      this.adsService.getAdsByGroupId(this.adGroupId).subscribe((x) => {
        if (x == null) {
          this.categoryImagesAvailable = false;
        } else {
          this.categoryImagesAvailable = true;
          this.adsByCategory = x;
          console.log(this.adsByCategory);
        }
      });

      for (const picture of response.image) {
        this.galleryImages.push({
          small: picture,
          medium: picture,
          big: picture,
        });
      }
      this.userService.getUserById(this.userSellerId).subscribe((x) => {
        this.companyImage = x.companyImage || [];
        if (this.companyImage.length > 0) {
          this.userImage = x.companyImage[0];
        } else if (this.companyImage === []) {
          this.userImage = this.defaultImage;
        }
        if (x == null) {
          this.usersImagesAvailabe = false;
        } else {
          this.usersImagesAvailabe = true;
          this.userSeller = x;
        }
      });

      this.adsService.getAllByUserId(this.userSellerId).subscribe((x) => {
        if (x == null) {
          this.usersImagesAvailabe = false;
        } else {
          this.usersImagesAvailabe = true;
          this.adsByUser = x;
        }
      });
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
      (error) => {
        console.log('not delete to favorite');
      };
    this.helpersService.$numOfFavs.next();
  }

  goToFaceBook() {
    document
      .getElementById('shareFB')
      .setAttribute(
        'href',
        'https://www.facebook.com/sharer/sharer.php?u=' +
          encodeURIComponent(document.URL)
      );
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.currentUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);
  }
}
