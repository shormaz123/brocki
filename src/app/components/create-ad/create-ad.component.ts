import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAd } from '../../shared/models/create-ad.model';
import { adsGroup } from '../../shared/models/adsGroup.model';
import { adsSubGroup } from '../../shared/models/adsSubGroup.model';
import { AdsService } from '../../@core/services/ads.service';
import { Router } from '@angular/router';
import { TranslateServiceRest } from '../../@core/services/translateREST.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss'],
})
export class CreateAdComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  statusOfProduct = 'NEW';
  categories: Array<adsGroup> = [];
  subcategories: Array<adsSubGroup> = [];
  uploadPhoto: Array<any> = [];
  photos: Array<string> = [];
  picture: Array<string> = [];
  categoryId: number;
  subcategoryId: number;
  subscriptionLang: Subscription;
  currentLang = 'de';
  currentPhotos: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adsService: AdsService,
    private translateBackend: TranslateServiceRest,
    private toastr: ToastrService
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
    this.subscriptionLang = this.translateBackend
      .getLanguage()
      .subscribe((message) => {
        this.currentLang = message;
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionLang.unsubscribe();
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
    event.preventDefault();

    if (event.target.files.length < 1) {
      return;
    }

    const formData = new FormData();

    const newPhotos = Object.values(event.target.files);

    this.currentPhotos = [...this.currentPhotos, ...newPhotos].slice(0, 6);

    this.currentPhotos.forEach((photo) => formData.append('file', photo));

    this.adsService.uploadImageInStorage(formData).subscribe((res) => {
      this.photos = res;
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.photos, event.previousIndex, event.currentIndex);
  }

  deletePhoto(index: number): void {
    this.photos.splice(index, 1);
    this.currentPhotos.splice(index, 1);
  }

  findsubcategory(event: any): void {
    this.subcategoryId = Number(event.target.value);
  }

  onSubmit() {
    const create = new CreateAd();
    create.productName = this.createForm.value.productName;
    if (create.productName.length === 0) {
      this.toastr.warning('You must add an ad name');
    }
    create.description = this.createForm.value.description;
    if (create.description.length === 0) {
      this.toastr.warning('You must add an ad description');
      return;
    }
    create.fixedPrice = this.createForm.value.fixedPrice;
    if (this.createForm.value.fixedPrice === '') {
      create.fixedPrice = false;
    }
    create.freeDelivery = this.createForm.value.freeDelivery;
    if (this.createForm.value.freeDelivery === '') {
      create.freeDelivery = false;
    }
    create.adsGroupId = this.categoryId;
    if (create.adsGroupId === undefined) {
      this.toastr.warning('You must select a category');
      return;
    }
    create.adsSubGroupId = this.subcategoryId;
    if (create.adsSubGroupId === undefined) {
      this.toastr.warning('You must select a subcategory');
      return;
    }
    create.image = this.photos;
    if (create.image.length === 0) {
      this.toastr.warning('You must add an image');
      return;
    }
    create.productWarranty = this.createForm.value.productWarranty;
    if (this.createForm.value.productWarranty === '') {
      create.productWarranty = false;
    }
    create.urgentSales = this.createForm.value.urgentSales;
    if (this.createForm.value.urgentSales === '') {
      create.urgentSales = false;
    }
    create.price = this.roundUp(
      Number((Math.round(this.createForm.value.price * 100) / 100).toFixed(2)),
      1
    );
    if (create.price === 0) {
      this.toastr.warning('You have to set a price');
      return;
    }
    create.adsType = this.statusOfProduct;

    this.adsService.newAd(create).subscribe(() => {
      this.router.navigate(['/site']);
    });
  }

  roundUp(num, precision) {
    precision = Math.pow(20, precision);
    return Math.ceil(num * precision) / precision;
  }

  checkDec(el) {
    const ex = /^[0-9]+\.?[0-9]*$/;
    if (ex.test(el.value) === false) {
      el.value = el.value.substring(0, el.value.length - 1);
    }
  }
}
