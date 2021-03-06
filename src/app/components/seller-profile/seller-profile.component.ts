import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../@core/services/user.service';
import { AdsService } from '../../@core/services/ads.service';
import { AdsParam } from '../../shared/models/adParams.model';
import { Comment } from '../../shared/models/createComment.model';
import { UserStatus } from '../../shared/enums/userStatus';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss'],
})
export class SellerProfileComponent implements OnInit {
  active: boolean;
  sold: boolean;
  about: boolean;
  info: boolean;
  guest: boolean;
  email = false;
  sellerPhones: boolean;
  sellerId;
  sellerCompany: string;
  sellerName: string;
  sellerPhone: string;
  sellerMobile: string;
  sellerEmail: string;
  defaultImage = '../../../assets/images/myAccount/profile-picture.png';
  sellerImage: string = this.defaultImage;
  noImage = '../../../assets/images/navigation/noImage.jpg';
  sellerindex: number;
  activeProducts: Array<any> = [];
  adsActive: boolean;
  soldProducts: Array<any> = [];
  adsSold: boolean;
  CommentsOfUser: Array<Comment> = [];
  private: boolean;
  business: boolean;
  address: string;
  checked: boolean = true;
  pageSize: number = 8;
  sellerStatus: string;
  sellerProfileImage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private adsService: AdsService
  ) {}

  ngOnInit() {
    this.active = true;
    this.activatedRoute.params.subscribe((params) => {
      this.sellerId = params.id;
      this.userService.getUserById(this.sellerId).subscribe((seller) => {
        this.sellerProfileImage = seller.profileImage;
        this.sellerStatus = seller.userStatus;
        const [street, streetNumber, postalNumber, city] = seller.address.split(
          ','
        );
        this.address =
          street + ' ' + streetNumber + ', ' + postalNumber + ' ' + city;
        if (seller.roleName === 'bussines' || 'admin') {
          this.sellerCompany = seller.company;
          this.private = false;
          this.business = true;
        } else {
          this.private = true;
          this.business = false;
        }

        if (seller.roleName === 'admin' && seller.company === '') {
          this.sellerName = seller.userName;
          this.private = true;
          this.business = false;
        }

        if (seller.roleName === 'bussines' && seller.company === '') {
          this.sellerName = seller.userName;
          this.private = true;
          this.business = false;
        }
        this.sellerindex = seller.id;
        this.sellerName = seller.userName;
        this.sellerPhone = seller.phone;
        this.sellerMobile = seller.mobile;
        this.sellerEmail = seller.email;
        if (seller.companyImage) {
          this.sellerImage = seller.companyImage[0];
        } else {
          this.sellerImage = this.defaultImage;
        }
      });
    });

    this.adsService.getAllByUserId(this.sellerId).subscribe((res) => {
      this.activeProducts.push(res);
      if (this.activeProducts[0].length === 0) {
        this.adsActive = false;
      } else {
        this.adsActive = true;
      }
    });
  }

  activeButton() {
    this.sold = false;
    this.about = false;
    this.info = false;
    this.guest = false;
    this.active = true;
    this.scroll();
  }

  soldButton() {
    this.scroll();
    if (!this.sold) {
      const soldAds = new AdsParam();
      soldAds.status = UserStatus.SOLD;
      soldAds.userId = this.sellerindex;
      soldAds.pageNumber = 0;
      soldAds.pageNumber += 1;
      soldAds.pageSize = this.pageSize;
      this.adsService.getSoldAds(soldAds).subscribe((res) => {
        this.soldProducts = [];
        this.soldProducts.push(res);
        if (this.soldProducts[0].length === 0) {
          this.adsSold = false;
        } else {
          this.adsSold = true;
        }
      });
    }
    this.about = false;
    this.info = false;
    this.guest = false;
    this.active = false;
    this.sold = true;
  }

  aboutButton() {
    this.info = false;
    this.guest = false;
    this.active = false;
    this.sold = false;
    this.about = true;
    this.scroll();
  }

  infoButton() {
    this.guest = false;
    this.active = false;
    this.sold = false;
    this.about = false;
    this.info = true;
    this.scroll();
  }

  guestButton() {
    this.scroll();
    if (!this.guest) {
      this.adsService.getCommentByUser(this.sellerId).subscribe((res) => {
        this.CommentsOfUser = [];
        this.CommentsOfUser.push(res);
      });
    }
    this.active = false;
    this.sold = false;
    this.about = false;
    this.info = false;
    this.guest = true;
  }

  sendEmail(): void {
    this.email = true;
  }

  closeEmail(): void {
    this.email = false;
  }

  guestBook(): void {
    this.guest = false;
    this.active = true;
  }

  phonesOfSeller(): void {
    this.sellerPhones = !this.sellerPhones;
  }

  scroll(): void {
    window.scrollTo({ top: 0 });
  }
}
