import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../@core/services/user.service';
import { AdsService } from '../../@core/services/ads.service';
import { AuthService } from '../../@core/services/auth.service';
import { Ads } from '../../shared/models/ads.model';
import { AuthConst } from '../../@core/consts/auth.const';
import { AdsParam } from '../../shared/models/adParams.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
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
  defaultImage = '../../../assets/images/myAccount/profile-picture.png';
  userImage: string = this.defaultImage;
  activeProducts: Array<any> = [];
  expiredProducts: Array<any> = [];
  soldProducts: Array<any> = [];
  adsActive: boolean;
  adsExpired: boolean;
  adsSold: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adsService: AdsService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((res) => {
      this.path = res.bussinesType;
      res.companyImage[0]
        ? (this.userImage = res.companyImage[0])
        : (this.userImage = this.defaultImage);
    });
    this.guest = true;
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.user = user;
      });
    });
  }

  activeButton() {
    this.active = true;
    this.expired = false;
    this.sold = false;
    this.guest = false;
    this.adsService.getAllByUserId(this.userId).subscribe((res) => {
      this.activeProducts.push(res);
      if (this.activeProducts[0].length === 0) {
        this.adsActive = false;
      } else {
        this.adsActive = true;
      }
    });
  }

  expiredButton() {
    this.active = false;
    this.expired = true;
    this.sold = false;
    this.guest = false;
    this.adsService.getExpiredAds().subscribe((res) => {
      this.expiredProducts.push(res);
      if (this.expiredProducts[0].length === 0) {
        this.adsExpired = true;
      } else {
        this.adsExpired = false;
      }
    });
  }

  soldButton() {
    this.active = false;
    this.expired = false;
    this.sold = true;
    this.guest = false;
    const soldAds = new AdsParam();
    soldAds.status = 'SOLD';
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

  guestButton() {
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
}
