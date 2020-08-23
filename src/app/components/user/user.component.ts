import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../@core/services/user.service';
import { AdsService } from '../../@core/services/ads.service';
import { AuthService } from '../../@core/services/auth.service';
import { Ads } from '../../shared/models/ads.model';
import { AuthConst } from '../../@core/consts/auth.const';
import { AdsParam } from '../../shared/models/adParams.model';
import { Comment } from '../../shared/models/createComment.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { UserStatus } from '../../shared/enums/userStatus';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  getLang: string;
  expression: boolean;
  active: boolean;
  expired: boolean;
  sold: boolean;
  guest: boolean;
  user: User;
  currentUserId: number;
  path: string;
  uploadingUrl: string;
  userId: number;
  userName: string;
  defaultImage = '../../../assets/images/myAccount/profile-picture.png';
  userImage: string = this.defaultImage;
  activeProducts: Array<any> = [];
  expiredProducts: Array<any> = [];
  soldProducts: Array<any> = [];
  guestBook: Array<any> = [];
  companyImage: string[];
  adsActive: boolean;
  adsExpired: boolean;
  adsSold: boolean;
  comment: boolean;
  admin: string;
  language: string;
  private: boolean;
  business: boolean;
  companyName: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adsService: AdsService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    const admin = this.authService.getAdmin();
    if (admin === 'admin') {
      this.admin = admin;
    }
    this.scroll();
    this.userService.getUser().subscribe((res) => {
      this.companyName = res.company;
      if (res.roleName === 'business') {
        this.private = false;
        this.business = true;
      } else {
        this.private = true;
        this.business = false;
      }

      this.path = res.bussinesType;
      this.userName = res.userName;

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

  getLanguage(event: any): void {
    this.getLang = event;
  }

  activeButton() {
    this.active = true;
    this.expired = false;
    this.sold = false;
    this.guest = false;
    this.scroll();
  }

  expiredButton() {
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
    this.modal.confirm({
      nzTitle: 'Are you sure you want to logout?',
      nzContent: '',
      nzOnOk: () => {
        this.authService.logout();
        this.router.navigate(['/site']);
      },
    });
  }

  scroll(): void {
    window.scrollTo({ top: 0 });
  }
}
