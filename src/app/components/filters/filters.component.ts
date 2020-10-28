import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { FilterAds } from '../../shared/models/filterAds.model';
import { Ads } from '../../shared/models/ads.model';
import cantons from '../../shared/cantons.json';
import { AdsService } from '../../@core/services/ads.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { HelpersService } from '../../@core/services/helpers.service';
import { TranslateServiceRest } from '../../@core/services/translateREST.service';
import { Subscription } from 'rxjs';
import { response } from 'express';
import { adsSubGroup } from '../../shared/models/adsSubGroup.model';
import { Options, LabelType } from 'ng5-slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthConst } from '../../@core/consts/auth.const';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;

  fromPrice: number = 0;
  toPrice: number = 1000000;
  options: Options = {
    floor: 0,
    ceil: 1000000,
    step: 1,

    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min:</b> CHF ' + value;
        case LabelType.High:
          return '<b>Max:</b> CHF ' + value;
        default:
          return 'CHF ' + value;
      }
    },
  };



  fixedPrice = false;
  hasImage = false;
  freeDelivery = false;
  productWarranty = false;
  urgentSales = false;
  region: string;
  error = false;
  errorMessage;

  all: boolean;
  used: boolean;
  new: boolean;
  public filterAd: FilterAds;

  ads: any;
  hideFilter: boolean = false;

  fillAds: any;

  cantons = cantons;
  formattedAmount;
  amount;
  categoriesGroup;
  subCategoriesGroup;
  category = {
    id: undefined,
    groupName: '',
  };
  subCategory = {
    id: undefined,
    subGroupName: '',
  };

  currentLang = 'de';
  subscriptionLang: Subscription;
  nullValue = null;
  pageNumber: number = 1;
  pageSize: number = 12;

  language: string;

  constructor(
    private adsService: AdsService,
    private router: Router,
    private translateBackend: TranslateServiceRest,
    private translateService: TranslateService,
    private fb: FormBuilder,
  ) {
    this.subscriptionLang = this.translateBackend
      .getLanguage()
      .subscribe((message) => {
        this.currentLang = message;
      });
  }

  ngOnInit() {
    this.language = localStorage.getItem(AuthConst.language);
    this.adsService.getAllAdsGroups().subscribe((x) => {
      this.categoriesGroup = x;
    });
    this.all = true;

    this.subscriptionLang = this.translateBackend
      .getLanguage()
      .subscribe((message) => {
        this.currentLang = message;
      });

      this.filterForm = this.fb.group({
        minPrice: ['', [Validators.required]],
        maxPrice: ['', [Validators.required]],
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionLang.unsubscribe();
  }

  getLanguage() {}

  allButton() {
    this.all = true;
    this.new = false;
    this.used = false;
  }

  newButton() {
    this.all = false;
    this.new = true;
    this.used = false;
  }

  usedButton() {
    this.all = false;
    this.new = false;
    this.used = true;
  }

  findCategory(event: any): void {
    this.subCategoriesGroup = [];
    this.category.id = Number(event.target.value);

    let index = event.target.options.selectedIndex;

    this.category.groupName = event.target.options[index].label;

    // tslint:disable-next-line:no-shadowed-variable
    this.adsService
      .getAllAdsSubGroup(this.category.id)
      .subscribe((response) => {
        this.subCategoriesGroup = response;
      });
  }

  findSubCategory(event: any): void {
    this.subCategory.id = Number(event.target.value);

    let index = event.target.options.selectedIndex;

    this.subCategory.subGroupName = event.target.options[index].label;
  }

  getCanton(event: any): void {
    this.region = event.target.value;
  }

  minPrice(min:string){
    this.fromPrice = Number(min);
    if(this.fromPrice > this.toPrice){
      this.toPrice = 1000000;
      this.filterForm.controls.maxPrice.patchValue(this.toPrice);
    }else if(this.fromPrice < this.toPrice){
      this.fromPrice;
    }
  }

  maxPrice(max:string){
    this.toPrice = Number(max);
    if(this.toPrice < this.fromPrice){
      return this.toPrice = 1000000;
    }else if(this.fromPrice < this.toPrice){
      return this.fromPrice;
    }
  }

  confirmButton() {
    if (this.toPrice < this.fromPrice) {
      this.errorMessage = 'Max price cannot be bigger than minimum price';
      this.error = true;
      setTimeout(() => (this.error = false), 5000);
    } else {
      this.filterAd = {
        region: this.region,
        fromPrice: this.fromPrice,
        toPrice: this.toPrice,
        fixedPrice: this.fixedPrice,
        hasImage: this.hasImage,
        freeDelivery: this.freeDelivery,
        productWarranty: this.productWarranty,
        urgentSales: this.urgentSales,
        adsGroupId: this.category.id,
        subCategory: this.subCategory.id,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      };

      this.adsService.getAdsByParamToFilter(this.filterAd).subscribe((res) => {
        this.ads = res;
        if (Object.keys(this.ads).length === 0) {
          this.error = true;
          setTimeout(() => (this.error = false), 5000);
          this.errorMessage = this.translateService.instant('translate.noAvailableAds');
        } else {
          this.fillAds = res;
          this.hideFilter = true;

        }
      });
    }
  }
}
