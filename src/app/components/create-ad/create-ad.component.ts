import { Component, OnInit, ErrorHandler } from '@angular/core';
import { CreateAd } from 'src/app/shared/models/create-ad.model';
import { AdsService } from 'src/app/@core/services/ads.service';
import { UploadChangeParam, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {



  fileList: string[] = [

  ];

  used: boolean;
  new: boolean;
  fixedPrice: boolean;
  freeDelivery: boolean;
  productWarranty: boolean;
  urgentSales: boolean;
  adsDate = new Date;
  public newAd = <CreateAd>{};
  errorMessage: string;

  previewImage: string | undefined = '';
  previewVisible = false;



  constructor(private adsService: AdsService) { }

  ngOnInit() {
    this.newButton();
  }



  usedButton() {
    this.new = false;
    this.used = true;
    this.newAd.adsType = "NEW"

  }

  newButton() {
    this.new = true;
    this.used = false;
    this.newAd.adsType = "USED"
  }

  saveChanges() {
    this.newAd.image = this.fileList
    // this.adsService.newAd(this.newAd).subscribe( x=> {
    //   console.log(this.newAd)
    // })
    // error => this.errorMessage = error;
    // console.log(this.errorMessage);
    console.log(this.newAd.image)
    console.log(this.newAd.freeDelivery)
  }


}
