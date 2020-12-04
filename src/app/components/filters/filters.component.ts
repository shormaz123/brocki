import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterAds } from '../../shared/models/filterAds.model';
import { AdsService } from '../../@core/services/ads.service';
import { TranslateServiceRest } from '../../@core/services/translateREST.service';
import { Subscription } from 'rxjs';
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
  filterForm: FormGroup = this.fb.group({
    minPrice: ['0', [Validators.required]],
    maxPrice: ['1000000', [Validators.required]],
  });

  region: string;
  error = false;
  errorMessage;
  public filterAd: FilterAds;
  ads: any;
  hideFilter: boolean = false;
  currentLang = 'de';
  subscriptionLang: Subscription;
  pageNumber: number = 1;
  pageSize: number = 16;
  language: string;
  location: string;
  fillAds: any;
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

  fromPrice: number = 0;
  toPrice: number = 1000000;
  options: Options = {
    floor: this.filterForm.value.minPrice,
    ceil: this.filterForm.value.maxPrice,
    step: 1,

    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.filterForm.patchValue({
            minPrice: value,
          });
          return '<b>Min:</b> CHF ' + value;
        case LabelType.High:
          this.filterForm.patchValue({
            maxPrice: value,
          });
          return '<b>Max:</b> CHF ' + value;
        default:
          return 'CHF ' + value;
      }
    },
  };

  constructor(
    private adsService: AdsService,
    private translateBackend: TranslateServiceRest,
    private translateService: TranslateService,
    private fb: FormBuilder
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

  minPrice(min: string) {
    this.fromPrice = Number(min);
    if (this.fromPrice > this.toPrice) {
      this.toPrice = 1000000;
      this.filterForm.controls.maxPrice.patchValue(this.toPrice);
    } else if (this.fromPrice < this.toPrice) {
      this.fromPrice;
    }
  }

  maxPrice(max: string) {
    this.toPrice = Number(max);
    if (this.toPrice < this.fromPrice) {
      return (this.toPrice = 1000000);
    } else if (this.fromPrice < this.toPrice) {
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
        location: this.location,
        fromPrice: this.fromPrice,
        toPrice: this.toPrice,
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
          this.errorMessage = this.translateService.instant(
            'translate.noAvailableAds'
          );
        } else {
          this.fillAds = res;
          this.hideFilter = true;
        }
      });
    }
  }
}
