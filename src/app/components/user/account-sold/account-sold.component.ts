import { Component, OnChanges, Input } from "@angular/core";

@Component({
  selector: "app-account-sold",
  templateUrl: "./account-sold.component.html",
  styleUrls: ["./account-sold.component.scss"],
})
export class AccountSoldComponent implements OnChanges {
  @Input() ads: boolean;
  @Input() soldProducts: Array<any> = [];

  constructor() {}

  ngOnChanges() {
    console.log(this.soldProducts);
  }
}
