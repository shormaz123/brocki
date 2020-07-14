import { Component, OnInit } from "@angular/core";
import { AdsService } from "src/app/@core/services/ads.service";
import { UserService } from "src/app/@core/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { Ads } from "src/app/shared/models/ads.model";
import { User } from "src/app/shared/models/user.model";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "ngx-gallery";

@Component({
  selector: "app-ad",
  templateUrl: "./ad.component.html",
  styleUrls: ["./ad.component.scss"],
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
  adGroupId;
  adsByCategory;

  usersImagesAvailabe: boolean;
  categoryImagesAvailable: boolean;

  cards = [
    {
      title: "Smart Sizzling BBQ",
      descriptiopn:
        "This is description about product of this seller yipi yo yipi yo, This is description about product of this seller yipi yo yipi yo, This is description about product of this seller yipi yo yipi yo",
      price: 49000.0,
      date: "6 days ago",
    },
    {
      title: "Smart Sizzling BBQ 2",
      descriptiopn: "",
      price: 49.0,
      date: "6 days ago",
    },
    {
      title: "Smart Sizzling BBQ 3",
      descriptiopn: "",
      price: 49.0,
      date: "6 days ago",
    },
    {
      title: "Smart Sizzling BBQ 4",
      descriptiopn: "",
      price: 49.0,
      date: "6 days ago",
    },
    {
      title: "Smart Sizzling BBQ 5",
      descriptiopn: "",
      price: 49.0,
      date: "6 days ago",
    },
    {
      title: "Smart Sizzling BBQ 6",
      descriptiopn: "",
      price: 49.0,
      date: "6 days ago",
    },
  ];

  images;

  constructor(
    private adsService: AdsService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.galleryOptions = [
      {
        width: "600px",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
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
      this.adId = params["id"];
      this.getNewAd(this.adId)
    });


  }

  getNewAd(id: number) {
    this.galleryImages = [];
    this.adsService.getAdById(id).subscribe((response) => {
      this.userSellerId = response.userId;
      this.ad = response;
      this.adGroupId = response.adsgroupId;
      console.log(this.userSellerId);
      window.scrollTo(0, 0)

      for (let i = 0; i < response.image.length; i++)
        this.galleryImages.push({
          small: response.image[i],
          medium: response.image[i],
          big: response.image[i],
        });

      console.log(this.galleryImages);

      this.userService.getUserById(this.userSellerId).subscribe((x) => {
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

    this.adsService.getAdsByParam(this.adGroupId).subscribe((x) => {
      if (x == null) {
        this.categoryImagesAvailable = false;
      } else {
        this.categoryImagesAvailable = true;
        this.adsByCategory = x;
      }
    });

  }


}
