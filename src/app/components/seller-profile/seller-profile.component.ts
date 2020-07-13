import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/@core/services/user.service';

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
  sellerId;
  seller;


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.active = true;
    this.activatedRoute.params.subscribe(params => {
      this.sellerId = params["id"];
      this.userService.getUserById(this.sellerId).subscribe( seller => {
        this.seller = seller
       })
    });
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
