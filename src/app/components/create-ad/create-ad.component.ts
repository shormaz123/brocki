import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAd } from '../../shared/models/create-ad.model';
import { adsGroup } from '../../shared/models/adsGroup.model';
import { adsSubGroup } from '../../shared/models/adsSubGroup.model';
import { AdsService } from '../../@core/services/ads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss'],
})
export class CreateAdComponent implements OnInit {
  createForm: FormGroup;
  formData = new FormData();
  statusOfProduct: string = 'NEW';
  categories: Array<adsGroup> = [];
  subcategories: Array<adsSubGroup> = [];
  uploadPhoto: Array<any> = [];
  photos: Array<string> = [];
  picture: Array<string> = [];
  categoryId: number;
  subcategoryId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adsService: AdsService
  ) {}

  ngOnInit() {
    this.createForm = this.fb.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required, , Validators.maxLength(600)]],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      image: [undefined, [Validators.required]],
      fixedPrice: [''],
      freeDelivery: [''],
      productWarranty: [''],
      urgentSales: [''],
      price: ['', [Validators.required]],
    });

    this.adsService.getAllAdsGroups().subscribe((res) => {
      for (const element of res) {
        const category = new adsGroup();
        category.groupName = element.groupName;
        category.id = element.id;
        this.categories.push(category);
      }
    });
  }
  statusProduct(event: any): void {
    this.statusOfProduct = event.target.value;
  }

  findCategory(event: any): void {
    this.subcategories = [];
    this.categoryId = Number(event.target.value);
    this.adsService.getAllAdsSubGroup(this.categoryId).subscribe((res) => {
      for (const element of res) {
        const subCategory = new adsSubGroup();
        subCategory.adsgroup = element.adsgroup;
        subCategory.id = element.id;
        subCategory.subGroupName = element.subGroupName;
        this.subcategories.push(subCategory);
      }
    });
  }

  uploadImage(event: any): void {
    this.uploadPhoto = [];
    if (event.target.files || event.target.files.length) {
      this.formData = new FormData();
      this.uploadPhoto.push(...event.target.files);
    }
    if (this.uploadPhoto.length > 0) {
      for (const picture of this.uploadPhoto) {
        this.formData.append('file', picture);
      }
      this.adsService.uploadImageInStorage(this.formData).subscribe((res) => {
        this.picture = res;
        this.photos.push(...this.picture);
      });
    }
  }

  deletePhoto(index: number): void {
    this.photos.splice(index, 1);
  }

  findsubcategory(event: any): void {
    this.subcategoryId = Number(event.target.value);
  }

  onSubmit() {
    const create = new CreateAd();
    create.productName = this.createForm.value.productName;
    create.description = this.createForm.value.description;
    create.fixedPrice = this.createForm.value.fixedPrice;
    if (this.createForm.value.fixedPrice === '') {
      create.fixedPrice = false;
    }
    create.freeDelivery = this.createForm.value.freeDelivery;
    if (this.createForm.value.freeDelivery === '') {
      create.freeDelivery = false;
    }
    create.adsGroupId = this.categoryId;
    create.adsSubGroupId = this.subcategoryId;
    create.image = this.photos;
    create.productWarranty = this.createForm.value.productWarranty;
    if (this.createForm.value.productWarranty === '') {
      create.productWarranty = false;
    }
    create.urgentSales = this.createForm.value.urgentSales;
    if (this.createForm.value.urgentSales === '') {
      create.urgentSales = false;
    }
    create.price = Number(this.createForm.value.price);
    create.adsType = this.statusOfProduct;
    this.adsService.newAd(create).subscribe(() => {
      this.router.navigate(['/site']);
    });
  }
}
