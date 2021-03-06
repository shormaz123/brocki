import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../@core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aboutus-seller',
  templateUrl: './aboutus-seller.component.html',
  styleUrls: ['./aboutus-seller.component.scss'],
})
export class AboutusSellerComponent implements OnInit {
  noImages: boolean;
  sellerParamId: number;
  sellerId: number;
  aboutUs: string;
  sellersImages: Array<string> = [];
  chosenImage: any = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.sellerParamId = params.id;
      this.userService.getUserById(this.sellerParamId).subscribe((seller) => {
        this.sellerId = seller.id;
        this.sellersImages = seller.companyImage;
        this.aboutUs = seller.aboutUs;
        if (this.sellersImages) {
          this.noImages = true;
        } else {
          this.noImages = false;
        }
      });
    });
  }

  showImage(image: string) {
    this.chosenImage = image;
  }

  closeImage() {
    this.chosenImage = false;
  }
}
