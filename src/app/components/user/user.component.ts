import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../@core/services/user.service';
import { AdsService } from '../../@core/services/ads.service';
import { AuthService } from '../../@core/services/auth.service';
import { Ads } from '../../shared/models/ads.model';
import { AdsParam } from '../../shared/models/adParams.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStatus } from '../../shared/enums/userStatus';
import { HelpersService } from '../../@core/services/helpers.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthStore } from 'app/@core/services/auth.store';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  active: boolean;
  expired: boolean;
  sold: boolean;
  guest: boolean;
  user: User;
  path: string;
  userId: number;
  userName: string;
  defaultImage = '../../../assets/images/myAccount/profile-picture.png';
  noImage = '../../../assets/images/nonProfileImage.png'
  userImage: string = this.defaultImage;
  activeProducts?: Array<any> = [];
  expiredProducts?: Array<any> = [];
  soldProducts?: Array<any> = [];
  guestBook?: Array<any> = [];
  companyImage?: string[];
  adsActive?: boolean;
  adsExpired: boolean;
  adsSold: boolean;
  comment: boolean;
  admin: string;
  roleName: string;
  private: boolean;
  business: boolean;
  companyName?: string;
  credit: number;
  totalAds?: Array<Ads> = [];
  totalAdsLength?: number;
  activeAds?: Array<Ads> = [];
  activeAdsLength?: number;
  pageSize: number = 8;
  profileImage: string;
  currentPhotos: Array<any> = [];
  profileImageSpinner = false;
  profileImageBoolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adsService: AdsService,
    private helpersService: HelpersService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private auth: AuthStore
  ) {}

  ngOnInit() {
    const admin = this.authService.getAdmin();
    if (admin === 'admin') {
      this.admin = admin;
      this.adsService.getAllAds().subscribe((res) => {
        const total = res;
        total.forEach(
          (ad) => {
            if (
              ad.status === 'ACTIVE' ||
              ad.status === 'SOLD' ||
              ad.status === 'READYFORREVIEW' ||
              ad.status === 'EXPIRED'
            ) {
              const ads = new Ads();
              this.totalAds.push(ads);
              this.totalAdsLength = this.totalAds.length;
            }
          },

          total.forEach((ad) => {
            if (ad.status === 'ACTIVE') {
              const ads = new Ads();
              this.activeAds.push(ads);
              this.activeAdsLength = this.activeAds.length;
            }
          })
        );
      });
    }
    this.scroll();
    this.userService.getUser().subscribe((res) => {
      this.profileImageBoolean = true;
      this.roleName = res.roleName;
      this.profileImage = res.profileImage;
      if (res.roleName === 'bussines' || 'admin') {
        this.companyName = res.company;

        this.private = false;
        this.business = true;
      } else {
        this.private = true;
        this.business = false;
      }

      if (res.company != null && res.company.length < 1) {
        if (res.roleName === 'admin' && res.company === '') {
          this.userName = res.userName;
          this.private = true;
          this.business = false;
        }

        if (res.roleName === 'bussines' && res.company === '') {
          this.userName = res.userName;
          this.private = true;
          this.business = false;
        }
      }

      this.path = res.bussinesType;
      this.credit = res.credit;

      this.companyImage = res.companyImage || [];
      if (this.companyImage.length > 0) {
        this.userImage = res.companyImage[0];
      } else if (this.companyImage === []) {
        this.userImage = this.defaultImage;
      }
    });
    this.active = true;
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params.id;
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.user = user;
      });
    });

    this.adsService.getAllVisibleAds().subscribe((res) => {
      this.activeProducts.push(res);
      if (this.activeProducts[0].length === 0) {
        this.adsActive = false;
      } else {
        this.adsActive = true;
      }
    });
  }

  activeButton() {
    this.activeProducts = [];
    this.scroll();
    this.active = true;
    this.expired = false;
    this.sold = false;
    this.guest = false;
    this.adsService.getAllVisibleAds().subscribe((res) => {
      this.activeProducts.push(res);
      if (this.activeProducts[0].length === 0) {
        this.adsActive = false;
      } else {
        this.adsActive = true;
      }
    });
  }

  expiredButton() {
    this.expiredProducts = [];
    this.scroll();
    if (!this.expired) {
      this.adsService.getExpiredAds().subscribe((res) => {
        this.expiredProducts.push(res);
        if (this.expiredProducts[0].length === 0) {
          this.adsExpired = true;
        } else {
          this.adsExpired = false;
        }
      });
    }
    this.active = false;
    this.expired = true;
    this.sold = false;
    this.guest = false;
  }

  soldButton() {
    this.scroll();
    if (!this.sold) {
      const soldAds = new AdsParam();
      soldAds.status = UserStatus.SOLD;
      soldAds.userId = this.userId;
      soldAds.pageNumber = 0;
      soldAds.pageNumber += 1;
      soldAds.pageSize = this.pageSize;
      this.adsService.getSoldAds(soldAds).subscribe((res) => {
        this.soldProducts = [];
        this.soldProducts.push(res);
        if (this.soldProducts[0].length === 0) {
          this.adsSold = true;
        } else {
          this.adsSold = false;
        }
      });
    }
    this.active = false;
    this.expired = false;
    this.sold = true;
    this.guest = false;
  }

  guestButton() {
    this.scroll();
    if (!this.guest) {
      this.adsService.getCommentByUser(this.userId).subscribe((res) => {
        this.guestBook = [];
        this.guestBook.push(res);
        if (this.guestBook[0].length === 0) {
          this.comment = true;
        } else {
          this.comment = false;
        }
      });
    }
    this.active = false;
    this.expired = false;
    this.sold = false;
    this.guest = true;
  }

  updateInfo() {
    if (this.path === 'PRIVATE') {
      this.router.navigate(['/update-info-private']);
    } else {
      this.router.navigate(['/update-info-bussines']);
    }
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: this.translateService.instant('translate.logoutConfirmation'),
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.auth.logout();
        this.router.navigate(['/site']);
      }
    });
  }

  scroll(): void {
    window.scrollTo({ top: 0 });
  }

  soldAds(event: any) {
    this.activeAdsLength = this.activeAdsLength - Number(event);
  }

  deleteAds(event: any) {
    this.activeAdsLength = this.activeAdsLength - Number(event);
  }

  getImage(ev) {
    // ev.preventDefault();
    this.profileImageSpinner = true;
    this.profileImageBoolean = false;
    this.profileImage = ''
    const formData = new FormData();

    const newPhotos = Object.values(ev.target.files);
    this.currentPhotos = [...newPhotos];
    this.currentPhotos.forEach((photo) => formData.append('file', photo));
    this.adsService.uploadImageInStorage(formData).subscribe((res) => {
      this.profileImageSpinner = true;
      this.user.profileImage = res[0];
      // this.profileImage = res[0];
      this.currentPhotos = [];
      this.userService.updateUser(this.user).subscribe( x => {
        this.profileImageSpinner = false;
        this.profileImageBoolean = true;
        this.profileImage = x.profileImage
    });
    });
 }
}
