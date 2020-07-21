import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { NzCarouselBaseStrategy, NzCarouselComponent } from 'ng-zorro-antd';
import { AdsService } from 'src/app/@core/services/ads.service';
import { Ads } from 'src/app/shared/models/ads.model';
import { UserService } from 'src/app/@core/services/user.service';
import { AuthConst } from 'src/app/@core/consts/auth.const';
import { HelpersService } from 'src/app/@core/services/helpers.service';
import { UserAddAdsRequest } from 'src/app/shared/models/useraddAdsRequest.model';

@Component({
  selector: 'app-ad-single-carousel',
  templateUrl: './ad-single-carousel.component.html',
  styleUrls: ['./ad-single-carousel.component.scss'],
})
export class AdSingleCarouselComponent implements OnInit {


  @Input() userId;
  @Input() favAds: Ads;
  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel: NzCarouselComponent;
  public favoriteAds;
  selected: boolean;
  receivedAds = this.favAds;
  numberOfFavorites?: number;
  userRequest: UserAddAdsRequest;

  constructor(private adsService: AdsService, private userService: UserService, private helpersService: HelpersService) {}

  ngOnInit() {

    if (this.userId) {
      this.userService.getUser().subscribe( user => {
        this.userId = user.id;
      });
    }
    console.log('favAds', this.favAds)
    console.log(this.userId);
  }

  toggleSelected(adId: number) {
    this.userRequest = {
      adsId: adId,
      userId: this.userId
    };

    if (!this.selected) {
    this.userService.updateUserFavourites(this.userRequest).subscribe(
      _x => {
        console.log('add update to favorite', _x);
      }
    ),
      // tslint:disable-next-line: no-unused-expression
      _error => {
        console.log('not to favorite');
    };

  } else {
    this.userService.deleteUserFavourite(adId, this.userId).subscribe(
      _x => {
        console.log('delete update to favorite', _x);
      }
    ),
      _error => {
        console.log('not delete to favorite');
    };
  }
    this.helpersService.$numOfFavs.next();
    console.log(adId);
    this.selected = !this.selected;
  }

  next() {
    // console.log(this.myCarousel.activeIndex)
    this.myCarousel.next();

  }

  pre() {
    this.myCarousel.pre();
  }

}
