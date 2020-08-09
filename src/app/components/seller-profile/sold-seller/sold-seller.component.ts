import { Component, OnChanges, Input } from "@angular/core";
import { Ads } from "../../../shared/models/ads.model";

@Component({
  selector: "app-sold-seller",
  templateUrl: "./sold-seller.component.html",
  styleUrls: ["./sold-seller.component.scss"],
})
export class SoldSellerComponent implements OnChanges {
  @Input() soldProducts: Ads;
  @Input() ads: boolean;
  constructor() {}

  ngOnChanges() {}
}
