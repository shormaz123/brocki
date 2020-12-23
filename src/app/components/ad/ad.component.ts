import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  OnDestroy,
} from '@angular/core';
import { AdsService } from '../../@core/services/ads.service';
import { UserService } from '../../@core/services/user.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Ads } from '../../shared/models/ads.model';
import { User } from '../../shared/models/user.model';
import { UserAddAdsRequest } from '../../shared/models/useraddAdsRequest.model';
import { AuthConst } from '../../@core/consts/auth.const';
import { HelpersService } from '../../@core/services/helpers.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Subscription, Observable } from 'rxjs';
import { AuthStore } from 'app/@core/services/auth.store';
import { WishlistService } from 'app/@core/services/wishlist.service';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent implements OnInit, AfterViewInit, OnDestroy {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  reviewAdsImages: NgxGalleryImage[] = [];
  @Input() card: Ads;
  reviewUser: User;
  reviewUserId: number;
  reviewUserActiveAds: Ads;
  allOfreviewer: boolean;
  noImage = '../../../assets/images/navigation/noImage.jpg'

  adId: number;
  userSellerId: number;
  ad: Ads;
  userSeller: User;
  adsByUser:any = [];
  allAdsByUser: any = [];
  adGroupId?;
  adsByCategory;
  allAdsByCategory: any = [];
  currentUrl = document.URL;
  defaultImage = '../../../assets/images/myAccount/profile-picture.png';
  userImage: string = this.defaultImage;
  companyImage: string[];
  paginationNumber = 1;
  sellerPhones: boolean;
  sellerEmail;
  adImage;
  adDescription;
  adTitle;
  sellerProfileImage;

  usersImagesAvailabe: boolean;
  categoryImagesAvailable: boolean;

  public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
  public imageUrl =
    'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';

  images;
  userRequest: UserAddAdsRequest;
  token;
  userId?: number;
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
  email = false;
  favoriteAds: any;
  numberOfFavs: Subscription;
  favAds = [];
  address: string;
  navUrl: string;
  typeShareTwitter;
  typeShareFacebook;
  shareUrl = document.URL;
  report: boolean = false;


  @ViewChild('ngx-gallery', { static: false }) gallery: ElementRef;

  mySubscription: any;

  constructor(
    private adsService: AdsService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private router: Router,
    public auth: AuthStore,
    private wishlist: WishlistService,
  ) {

  }

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
    if (this.token) {
      this.getUserAndFavAd();
    }
    this.galleryOptions = [
      {
        width: '700px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
      },
    ];
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url,
        };
      }
    });
    this.enableScrolling();
    if (this.token) {
      this.auth.userProfile$.subscribe((response) => {
        this.userId = Number(localStorage.getItem('brocki_id'));
        // this.getUserAndFavAd();
      });
    }

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
        const [street, streetNumber, postalNumber, city] = res.address.split(
          ','
        );
        this.address =
          street + ' ' + streetNumber + ', ' + postalNumber + ' ' + city;
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
    this.mailBoolean = !this.mailBoolean;
  }

  displaySideBar() {
    this.helpersService.displaySideBar(this.displaySideNav);
  }

  enableScrolling() {
    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = function () {};
  }

  getNewAd(id: number) {
    window.scrollTo({ top: 0 });
    this.galleryImages = [];
    if (id) {
      this.adsService.getAdById(id).subscribe((response) => {
        this.userSellerId = response.userId;
        this.ad = response;
        this.adImage = response.image[0];
        this.adDescription = response.description;
        this.adTitle = response.productName;
        this.adGroupId = response.adsGroupId;
        this.allOfreviewer = true;
        this.adsService
          .getAdsByGroupId(this.adGroupId, this.paginationNumber)
          .subscribe((x) => {
            if (x == null) {
              this.categoryImagesAvailable = false;
            } else {
              if (this.token) {
                for (var i = 0; i < this.favoriteAds.length; i++) {
                  if (this.favoriteAds[i].id === this.ad.id) {
                    this.ad.favourite = true;
                  }
                }
                this.allAdsByCategory = x;
                this.adsByCategory = this.allAdsByCategory
                  .map(
                    (obj) =>
                      this.favoriteAds.find((o) => o.id === obj.id) || obj
                  )
                  .filter((el) => el.id != this.adId);
              } else {
                this.categoryImagesAvailable = true;
                this.allAdsByCategory = x;
                this.adsByCategory = this.allAdsByCategory.filter(
                  (el) => el.id != this.adId
                );
              }
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
          this.sellerProfileImage = x.profileImage
          this.sellerEmail = x.email;
          if (x.roleName === 'bussines') {
            this.private = false;
            this.business = true;
          } else if (x.roleName === 'admin') {
            (this.adminName = x.company), (this.private = false);
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
            const [street, streetNumber, postalNumber, city] = x.address.split(
              ','
            );
            this.address =
              street + ' ' + streetNumber + ', ' + postalNumber + ' ' + city;
          }
        });

        this.adsService.getAllByUserId(this.userSellerId).subscribe((x) => {
          if (x == null) {
            this.usersImagesAvailabe = false;
          } else {
            if (this.token) {
              this.allAdsByUser = x;
              this.adsByUser = this.allAdsByUser
                .map(
                  (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
                )
                .filter((el) => el.id != this.adId);
            } else {
              this.usersImagesAvailabe = true;
              this.allAdsByUser = x;
              this.adsByUser = this.allAdsByUser.filter(
                (el) => el.id != this.adId
              );
            }
          }
        });
      });
    }


  }

  favoriteUserAds() {
    if (this.token) {
      this.adsByUser = this.allAdsByUser.map(
        (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
      );
    } else {
      this.usersImagesAvailabe = true;
    }
  }

  getUserAndFavAd() {
    this.wishlist.ads$.subscribe((x) => {
      this.favoriteAds = x;
      if (this.token) {
        this.adsByUser = this.allAdsByUser.map(
          (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
        ).filter((el) => el.id != this.adId);;
        this.adsByCategory = this.allAdsByCategory.map(
          (obj) => this.favoriteAds.find((o) => o.id === obj.id) || obj
        ).filter((el) => el.id != this.adId);;
        }
    });
  }

  removeFromWishlist(ad: Ads): void {
    this.wishlist.remove(ad).subscribe();
    this.userService
      .deleteUserFavourite(ad.id, Number(localStorage.getItem('brocki_id')))
      .subscribe((x) => {});
  }

  addToWishlist(ad: Ads): void {
    this.wishlist.add(ad).subscribe();
    this.userRequest = {
      adsId: ad.id,
      userId: Number(localStorage.getItem('brocki_id')),
    };
    this.userService.updateUserFavourites(this.userRequest).subscribe();
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

  public share(type: string) {
    let searchParams = new URLSearchParams();
    if (type === 'facebook') {
      searchParams.set('u', this.shareUrl);
      this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
      window.open(this.navUrl, "_blank");

    }
    if (type === 'twitter') {
      searchParams.set('url', this.shareUrl);
      this.navUrl =  'https://twitter.com/share?' + searchParams;
      window.open(this.navUrl, "_blank");
    }
  }

ngOnDestroy() {
}

reportAd() {
  this.report = true;
}

closeReportAd() {
    this.report = false;
}

}
