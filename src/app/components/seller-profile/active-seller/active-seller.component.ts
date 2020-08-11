import { Component, OnChanges, Input } from '@angular/core';
import { Ads } from '../../../shared/models/ads.model';

@Component({
  selector: 'app-active-seller',
  templateUrl: './active-seller.component.html',
  styleUrls: ['./active-seller.component.scss'],
})
export class ActiveSellerComponent implements OnChanges {
  @Input() activeProducts: Ads;
  @Input() ads: boolean;
  constructor() {}

  ngOnChanges() {}
}
