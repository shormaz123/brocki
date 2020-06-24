import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  styleUrls: ['./guest-book.component.scss']
})
export class GuestBookComponent implements OnInit {

  guests = [{
    useraName: 'Aleksandar',
    ratioStar: '2,5',
    comment: 'This is comment about product'
  },
  {
    useraName: 'Milan',
    ratioStar: '3,5',
    comment: 'This is comment about another product'
  }
]

  constructor() { }

  ngOnInit() {
  }

}
