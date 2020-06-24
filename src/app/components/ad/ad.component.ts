import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {


  cards = [{
    title: 'Smart Sizzling BBQ',
    descriptiopn: 'This is description about product of this seller yipi yo yipi yo, This is description about product of this seller yipi yo yipi yo, This is description about product of this seller yipi yo yipi yo',
    price: 49000.00 ,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 2',
    descriptiopn: '',
    price: 49.00 ,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 3',
    descriptiopn: '',
    price: 49.00,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 4',
    descriptiopn: '',
    price: 49.00 ,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 5',
    descriptiopn: '',
    price: 49.00 ,
    date: '6 days ago'
  },
  {
    title: 'Smart Sizzling BBQ 6',
    descriptiopn: '',
    price: 49.00,
    date: '6 days ago'
  }]

  images;

  constructor() { }

  ngOnInit() {

    this.images = [];
    this.images.push({source:'../../../../assets/images/myAccount/Image car _ delete.png'});
    this.images.push({source:'../../../../assets/images/myAccount/Image car _ delete.png'});
    this.images.push({source:'../../../../assets/images/myAccount/Image car _ delete.png'});
    this.images.push({source:'../../../../assets/images/myAccount/Image car _ delete.png'});

  }

}
