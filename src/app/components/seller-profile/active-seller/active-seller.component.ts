import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-seller',
  templateUrl: './active-seller.component.html',
  styleUrls: ['./active-seller.component.scss']
})
export class ActiveSellerComponent implements OnInit {

  ads = [{
    title: 'Toyota',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
