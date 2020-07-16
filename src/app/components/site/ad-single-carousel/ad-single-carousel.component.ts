import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { NguCarouselConfig } from "@ngu/carousel";
import { NzCarouselBaseStrategy, NzCarouselComponent } from "ng-zorro-antd";
import { AdsService } from "src/app/@core/services/ads.service";
import { Ads } from "src/app/shared/models/ads.model";

@Component({
  selector: "app-ad-single-carousel",
  templateUrl: "./ad-single-carousel.component.html",
  styleUrls: ["./ad-single-carousel.component.scss"],
})
<<<<<<< HEAD
export class AdSingleCarouselComponent implements OnInit, OnChanges {
  private _response: Ads[];
=======
export class AdSingleCarouselComponent implements OnInit,OnChanges {

  selected: boolean;

>>>>>>> Favorites(Site-Component)

  @Input() ads: Ads[];
  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel: NzCarouselComponent;

  cars = [
    {
      number: 1,
    },
    {
      number: 2,
    },
  ];

  constructor(private adsService: AdsService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
  }

<<<<<<< HEAD
=======
  toggleSelected() {
  this.selected = !this.selected;
  }

>>>>>>> Favorites(Site-Component)
  next() {
    // console.log(this.myCarousel.activeIndex)
    this.myCarousel.next();
  }

  pre() {
    this.myCarousel.pre();
  }
}
