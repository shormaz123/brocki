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

@Component({
  selector: "app-ad-single-carousel",
  templateUrl: "./ad-single-carousel.component.html",
  styleUrls: ["./ad-single-carousel.component.scss"],
})
export class AdSingleCarouselComponent implements OnInit, OnChanges {
  private _response: Ads[];

  selected: boolean;


  @Input() ads: Ads[];
  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel: NzCarouselComponent;

  constructor(private adsService: AdsService, private userService: UserService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
  }

  toggleSelected(ad: Ads) {
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
