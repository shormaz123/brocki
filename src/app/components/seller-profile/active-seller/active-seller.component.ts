import { Component, OnChanges, Input } from '@angular/core';
import { Ads } from '../../../shared/models/ads.model';

@Component({
  selector: 'app-active-seller',
  templateUrl: './active-seller.component.html',
  styleUrls: ['./active-seller.component.scss'],
})
export class ActiveSellerComponent implements OnChanges {
  email: boolean = false;
  @Input() activeProducts: Ads;
  @Input() ads: boolean;
  @Input() sellerEmail: string;
  adForEmail: Ads;
  hide = true;
  constructor() {}

  ngOnChanges() {}

  getAd(ad: Ads): void {
    this.adForEmail = ad;
  }

  sendEmail(): void {
    this.email = true;
  }

  closeEmail(): void {
    this.email = false;
  }
}
