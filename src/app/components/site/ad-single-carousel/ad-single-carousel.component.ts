import { Component, OnInit, Input } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { Ads } from '../../../shared/models/ads.model';
import { AuthConst } from '../../../@core/consts/auth.const';

@Component({
  selector: 'app-ad-single-carousel',
  templateUrl: './ad-single-carousel.component.html',
  styleUrls: ['./ad-single-carousel.component.scss'],
})
export class AdSingleCarouselComponent implements OnInit {
  @Input() userId;
  @Input() favAds: Ads;
  @Input() favoriteNumber;
  myCarousel: NzCarouselComponent;
  token;

  constructor() {}

  ngOnInit() {
    this.token = localStorage.getItem(AuthConst.token);
  }

  next() {
    this.myCarousel.next();
  }

  pre() {
    this.myCarousel.pre();
  }
}
