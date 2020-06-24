import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-expired',
  templateUrl: './account-expired.component.html',
  styleUrls: ['./account-expired.component.scss']
})
export class AccountExpiredComponent implements OnInit {

  ads = [{
    title: 'Toyota',
    text: 'Lores lopsum in textarea , text for example.',
    price: '2900 chf',
    days: '5 days ago'
  },
{
    title: 'Jewelery set',
    text: 'Another text description',
    price: '144 chf',
    days: '14 days ago'
}]

  constructor() { }

  ngOnInit() {
  }

}
