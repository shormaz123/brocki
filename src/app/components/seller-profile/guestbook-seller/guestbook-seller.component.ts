import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guestbook-seller',
  templateUrl: './guestbook-seller.component.html',
  styleUrls: ['./guestbook-seller.component.scss']
})
export class GuestbookSellerComponent implements OnInit {

  guests = [{
    useraName: 'Aleksandar',
    ratioStar: '2,5',
    comment: 'This is comment about product,This is comment about product,This is comment about product,This is comment about product,This is comment about product,This is comment about product,This is comment about product,This is comment about product,This is comment about product,This is comment about product,This is comment about product,'
  },
  {
    useraName: 'Milan',
    ratioStar: '3,5',
    comment: 'This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,This is comment about another product,'
  }
]

  constructor() { }

  ngOnInit() {
  }

}
