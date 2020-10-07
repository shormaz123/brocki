import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  Input,
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
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent implements OnInit, AfterViewInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  reviewAdsImages: NgxGalleryImage[] = [];
  @Input() card: Ads;
  reviewUser: User;
  reviewUserId: number;
  reviewUserActiveAds: Ads;
  allOfreviewer: boolean;

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
  paginationNumber = 1;
  sellerPhones: boolean;
  sellerEmail;

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
  role: string;
  private: boolean;
  business: boolean;
  companyName: string;
  adminName: string;
  adminBoolean: boolean;
  displaySideNav = true;
  mailBoolean = false;
  email: boolean = false;
useKeyborad = true;

  @ViewChild('ngx-gallery', { static: false }) gallery: ElementRef;

  mySubscription: any;

  constructor(
    private adsService: AdsService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private gtmService: GoogleTagManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url
        };
        this.gtmService.pushTag(gtmTag);
        console.log(gtmTag)
      }
    });
    this.enableScrolling();
    this.token = localStorage.getItem(AuthConst.token);
    if (this.token) {
      this.userService.getUser().subscribe((response) => {
        this.userId = response.id;
      });
    }

    this.galleryOptions = [
      {
        width: '700px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true
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
        previewKeyboardNavigation: true
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
        previewKeyboardNavigation: true
      },
    ];

    this.images = [];
    this.activatedRoute.params.subscribe((params) => {
      this.adId = params.id;
      this.getNewAd(this.adId);
    });

    /**
     * Get user for review Ad
     *
     **/
    if (this.card) {
      this.userService.getUserById(this.card.userId).subscribe((res) => {

        this.reviewUser = res;
        this.reviewUserId = res.id;
        this.adsService.getAllByUserId(this.reviewUserId).subscribe((res) => {
          this.reviewUserActiveAds = res;
          for (const picture of this.card.image) {
            this.reviewAdsImages.push({
              small: picture,
              medium: picture,
              big: picture,
            });
          }
        });
      });
    }
  }
  ngAfterViewInit() {}

  toogleMail() {
    this.mailBoolean = !this.mailBoolean
  }

  displaySideBar() {
    this.helpersService.displaySideBar(this.displaySideNav);
  }

  enableScrolling() {
    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = function() {};
  }

  getNewAd(id: number) {
    window.scrollTo({ top: 0 });
    this.galleryImages = [];
    if (id) {
      this.adsService.getAdById(id).subscribe((response) => {
        this.userSellerId = response.userId;
        this.ad = response;
        this.adGroupId = response.adsGroupId;
        console.log(response);
        this.allOfreviewer = true;
        this.adsService.getAdsByGroupId(this.adGroupId, this.paginationNumber).subscribe((x) => {
          if (x == null) {
            this.categoryImagesAvailable = false;
          } else {
            this.categoryImagesAvailable = true;
            this.adsByCategory = x;
            console.log('adsByCat',this.adsByCategory);
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
          this.companyName = x.company;
          this.sellerEmail = x.email;
          console.log(x.roleName);
          if ( x.roleName === 'bussines') {
            this.private = false;
            this.business = true;
          } else if (x.roleName === 'admin') {
            this.adminName = x.company,
            this.private = false;
            this.business = false;
            this.adminBoolean = true;
          } else {
            this.private = true;
            this.business = false;
          }
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
            console.log('adsByUser', this.adsByUser)
          }
        });
      });
    }
  }

  addToWishlist(adId: number) {
    console.log(adId);
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

  phonesOfSeller(): void {
    this.sellerPhones = !this.sellerPhones;
  }

  sendEmail(): void {
    this.email = true;
  }

  closeEmail(): void {
    this.email = false;
  }
}
