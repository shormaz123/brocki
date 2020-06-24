import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-active',
  templateUrl: './account-active.component.html',
  styleUrls: ['./account-active.component.scss']
})
export class AccountActiveComponent implements OnInit {

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
