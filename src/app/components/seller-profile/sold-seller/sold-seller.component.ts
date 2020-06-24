import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sold-seller',
  templateUrl: './sold-seller.component.html',
  styleUrls: ['./sold-seller.component.scss']
})
export class SoldSellerComponent implements OnInit {

  ads = [{
    title: 'Toyota',
    text: 'Lores locum in textarea , text for example.',
    price: '2900 chf',
    days: '5 days ago'
  },
{
    title: 'Jewelry set',
    text: 'Another text description',
    price: '144 chf',
    days: '14 days ago'
}]

  constructor() { }

  ngOnInit() {
  }

}
