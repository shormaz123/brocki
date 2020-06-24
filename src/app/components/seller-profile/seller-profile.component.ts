import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {


  active:boolean;
  sold:boolean;
  about:boolean;
  info:boolean;
  guest:boolean;


  constructor() { }

  ngOnInit() {
    this.active = true;
  }

  activeButton() {
    this.sold = false
    this.about = false
    this.info = false
    this.guest = false
    this.active = true

  }

  soldButton() {

    this.about = false
    this.info = false
    this.guest = false
    this.active = false
    this.sold = true
  }

  aboutButton() {

    this.info = false
    this.guest = false
    this.active = false
    this.sold = false
    this.about = true
  }

  infoButton() {

    this.guest = false
    this.active = false
    this.sold = false
    this.about = false
    this.info = true

  }

  guestButton() {

    this.active = false
    this.sold = false
    this.about = false
    this.info = false
    this.guest = true

  }

}
