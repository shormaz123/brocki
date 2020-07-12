import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/@core/services/ads.service';
import { UserService } from 'src/app/@core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Ads } from 'src/app/shared/models/ads.model';
import { User } from 'src/app/shared/models/user.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[] = [];


adId: number;
userSellerId: number;
ad: Ads;
userSeller: User;
productName;




  cards = [{
    title: 'Smart Sizzling BBQ',
    descriptiopn: 'This is description about product of this seller yipi yo yipi yo, This is description about product of this seller yipi yo yipi yo, This is description about product of this seller yipi yo yipi yo',
    price: 49000.00 ,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 2',
    descriptiopn: '',
    price: 49.00 ,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 3',
    descriptiopn: '',
    price: 49.00,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 4',
    descriptiopn: '',
    price: 49.00 ,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 5',
    descriptiopn: '',
    price: 49.00 ,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 6',
    descriptiopn: '',
    price: 49.00,
    date: '6 days ago'
  }]

  images;

  constructor(private adsService: AdsService, private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {


    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];


    this.images = [];



    this.activatedRoute.params.subscribe(params => {
      this.adId = params["id"];
    });

    this.adsService.getAdById(this.adId).subscribe( response => {
      this.userSellerId = response.userId
      this.ad = response
      console.log(this.ad)


      for (let i = 0; i < response.image.length; i++)
      this.galleryImages.push( {
        small: response.image[i], medium: response.image[i], big: response.image[i],
      });

      // response.image.forEach(element =>
      //   { this.galleryImages = [
      //         {
      //           small: element, medium: element, big: element,
      //         }
      //       ];
      //      },
      //   )
        console.log(this.galleryImages)

      this.userService.getUserById(this.userSellerId).subscribe( x=> {
        this.userSeller = x
      })
    })
  }


}
