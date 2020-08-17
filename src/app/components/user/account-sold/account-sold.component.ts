import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-account-sold',
  templateUrl: './account-sold.component.html',
  styleUrls: ['./account-sold.component.scss'],
})
export class AccountSoldComponent implements OnChanges {
  @Input() ads: boolean;
  @Input() soldProducts: Array<any> = [];

  constructor() {}

  ngOnChanges() {}

  style() {
    if (this.soldProducts[0] > 0) {
      return { height: '0px' };
    } else {
      return { height: '100' };
    }
  }
}
