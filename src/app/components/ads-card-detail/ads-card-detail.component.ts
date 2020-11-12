import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdsParam } from '../../shared/models/adParams.model';

@Component({
  selector: 'app-ads-card-detail',
  templateUrl: './ads-card-detail.component.html',
  styleUrls: ['./ads-card-detail.component.scss'],
})
export class AdsCardDetailComponent implements OnInit {
  @Input() ads: AdsParam;
  @Output() readonly addWishlist = new EventEmitter<number>();
  @Output() readonly removeWishlist = new EventEmitter<{
    adId: number;
    index: number;
  }>();

  constructor() {}

  ngOnInit() {}

  removeFromWishlist(adId: number, index: number): void {
    this.removeWishlist.emit({ adId, index });
  }

  addToWishlist(adId: number): void {
    this.addWishlist.emit(adId);
  }
}
