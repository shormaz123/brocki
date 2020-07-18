import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { NguCarouselConfig } from "@ngu/carousel";
import { NzCarouselBaseStrategy, NzCarouselComponent } from "ng-zorro-antd";
import { AdsService } from "src/app/@core/services/ads.service";
import { Ads } from "src/app/shared/models/ads.model";
import { UserService } from 'src/app/@core/services/user.service';
import { AuthConst } from 'src/app/@core/consts/auth.const';

@Component({
  selector: "app-ad-single-carousel",
  templateUrl: "./ad-single-carousel.component.html",
  styleUrls: ["./ad-single-carousel.component.scss"],
})
export class AdSingleCarouselComponent implements OnInit, OnChanges {
  private _response: Ads[];

  favourite: boolean;
  newArray:Ads[] = [];

  @Input() userId;
  @Input() ads;
  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel: NzCarouselComponent;
  public favoriteAds;
  selected: boolean;
  receivedAds = this.ads;
  equalAds;
  numberOfFavorites?: number;

  constructor(private adsService: AdsService, private userService: UserService) {}

  ngOnInit() {

    if (this.userId) {
      this.userService.getUser().subscribe( user => {
        this.userId = user.id

      });
    }
    console.log(this.userId)
  }



  ngOnChanges(changes: SimpleChanges) {
  }

  toggleSelected(adId: number) {
  this.selected = !this.selected;

  if (this.selected) {
    this.userService.updateUserFavourites(adId, this.userId).subscribe(
      x => {
        console.log("add update to favorite")
      }
    ),
      error => {
        console.log("not to favorite")
    }

  }

  if (!this.selected) {
    this.userService.deleteUserFavourite(adId, this.userId).subscribe(
      x => {
        console.log("delete update to favorite")
      }
    ),
      error => {
        console.log("not delete to favorite")
    }
  }

  console.log(adId)
  }

  next() {
    // console.log(this.myCarousel.activeIndex)
    this.myCarousel.next();

  }

  pre() {
    this.myCarousel.pre();
  }

}
