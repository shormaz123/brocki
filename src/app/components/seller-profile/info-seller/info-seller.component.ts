import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../@core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-seller',
  templateUrl: './info-seller.component.html',
  styleUrls: ['./info-seller.component.scss'],
})
export class InfoSellerComponent implements OnInit {
  infoForm: FormGroup;
  sellerId: number;
  sellerindex: number;
  sellerLocationLong;
  sellerLocationLat;
  sellerAddress;
  company;
  name;
  surname;
  email;
  website;
  phone;
  mobile;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.infoForm = this.fb.group({
      company: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      surname: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      website: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      mobile: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
    });
    this.activatedRoute.params.subscribe((params) => {
      this.sellerId = params.id;
      this.userService.getUserById(this.sellerId).subscribe((seller) => {
        this.company = seller.company;
        this.name = seller.name;
        this.surname = seller.surname;
        this.email = seller.email;
        this.website = seller.website;
        this.phone = seller.phone;
        this.mobile = seller.mobile;
        this.sellerLocationLong = seller.lng;
        this.sellerLocationLat = seller.lat;
        const [street, streetNumber, postalNumber, city] = seller.address.split(',');
        this.sellerAddress =  street + ' ' + streetNumber + ', ' + postalNumber + ' ' + city;
        this.sellerindex = seller.id;
        this.infoForm.patchValue({
          company: seller.company,
          name: seller.name,
          surname: seller.surname,
          email: seller.email,
          website: seller.website,
          phone: seller.phone,
          mobile: seller.mobile,
          address: this.sellerAddress,
          locationAddress: seller.location,
        });
      });
    });
  }
}
