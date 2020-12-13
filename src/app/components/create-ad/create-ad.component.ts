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
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthConst } from '../../@core/consts/auth.const';
import { Tags } from '../../shared/models/tags.model';
import { Observable } from 'rxjs';

interface Category {
  id: number;
  groupName: string;
}

interface SubCategory {
  adsGroup: number;
  id: number;
  subGroupName: string;
}

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss'],
})
export class CreateAdComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  categories: Array<adsGroup> = [];
  subcategories: Array<adsSubGroup> = [];
  photos: Array<string> = [];
  categoryId: number;
  categoryName: string;
  subcategoryName: string;
  subcategoryId: number;
  subscriptionLang: Subscription;
  currentLang: string;
  currentPhotos: Array<any> = [];
  filteredCategory: Array<adsGroup> = [];
  filteredSubcategory: Array<adsSubGroup> = [];
  toggleCategory: boolean;
  toggleSubcategory: boolean;
  toggleListCategory: boolean;
  toggleListSubcategory: boolean;
  language: string;
  clickedTags: Array<any> = [];
  clickedTag: any;
  tags$: Observable<Tags[]>;
  asd: any;
  decimal: boolean;
  decimalNumber: number;

  // snackbar properties

  message = this.translateService.instant('translate.confirmAccountText');
  actionButtonLabel = this.translateService.instant('translate.ok');
  action = true;
  setAutoHide = true;
  autoHide = 5000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass: boolean;

  //

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adsService: AdsService,
    private translateBackend: TranslateServiceRest,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.language = localStorage.getItem(AuthConst.language);
    this.currentLang = this.language;
    this.createForm = this.fb.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required, , Validators.maxLength(600)]],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      tags: [[], [Validators.required]],
      image: [undefined, [Validators.required]],
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

    this.tags$ = this.adsService.getAllTags();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionLang.unsubscribe();
  }

  chosenTag(tag: Tags): void {
    this.clickedTag = tag;

    this.clickedTags = [...this.clickedTags];

    if (this.clickedTags.includes(this.clickedTag)) {
      this.clickedTags = this.clickedTags.filter((e) => e !== this.clickedTag);
      return;
    }

    if (this.clickedTags.length < 3) {
      this.clickedTags.push(this.clickedTag);
    } else {
      this.toastr.warning(
        this.translateService.instant('translate.maxNumberOfTags')
      );
    }
  }

  findCategory(selectedCategory: Category): void {
    this.subcategories = [];
    this.filteredSubcategory = [];
    this.categoryId = selectedCategory.id;
    this.categoryName = selectedCategory.groupName[this.currentLang];
    this.createForm.patchValue({ category: this.categoryName });
    this.adsService.getAllAdsSubGroup(this.categoryId).subscribe((res) => {
      for (const element of res) {
        const subCategory = new adsSubGroup();
        subCategory.adsGroup = element.adsGroup;
        subCategory.id = element.id;
        subCategory.subGroupName = element.subGroupName;
        this.subcategories.push(subCategory);
      }
    });
  }

  searchCategory(query: string): void {
    this.filteredCategory = query
      ? this.categories.filter((ad) =>
          ad.groupName[this.currentLang]
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : this.categories;
  }

  searchSubcategory(query: string): void {
    this.filteredSubcategory = [];
    this.filteredSubcategory = query
      ? this.subcategories.filter((ad) =>
          ad.subGroupName[this.currentLang]
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : this.subcategories;
  }

  /**
   *
   *  Category by search
   */
  categorySearch(selectedCategory: string): void {
    this.subcategories = [];
    this.filteredSubcategory = [];
    this.categories.forEach((categoryName) => {
      if (categoryName.groupName[this.currentLang] === selectedCategory) {
        const category = categoryName;
        this.categoryId = category.id;

        this.adsService.getAllAdsSubGroup(this.categoryId).subscribe((res) => {
          for (const element of res) {
            const subCategory = new adsSubGroup();
            subCategory.adsGroup = element.adsGroup;
            subCategory.id = element.id;
            subCategory.subGroupName = element.subGroupName;
            this.subcategories.push(subCategory);
          }
        });
      }
    });
    this.createForm.patchValue({ category: selectedCategory });
    this.toggleCategory = !this.toggleCategory;
  }

  /**
   *
   * Subcategory by search
   */
  subcategorySearch(selectedSubcategory: string): void {
    this.subcategories.forEach((subcategoryName) => {
      if (
        subcategoryName.subGroupName[this.currentLang] === selectedSubcategory
      ) {
        const subcategory = subcategoryName;
        this.subcategoryId = subcategory.id;
      }
    });
    this.createForm.patchValue({ subcategory: selectedSubcategory });
  }

  toggleCategoryDropdown(): void {
    this.toggleCategory = !this.toggleCategory;
  }

  toggleSubcategoryDropdown(): void {
    this.toggleSubcategory = !this.toggleSubcategory;
  }

  listCategory(): void {
    this.toggleListCategory = !this.toggleListCategory;
  }

  listSubcategory(): void {
    this.toggleListSubcategory = !this.toggleListSubcategory;
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

  findsubcategory(subcategory: SubCategory): void {
    this.subcategoryId = subcategory.id;
    this.subcategoryName = subcategory.subGroupName[this.currentLang];
    this.createForm.patchValue({ subcategory: this.subcategoryName });
  }

  isPriceValid = (price: number) => {
    const priceString = price.toString();

    const [amount, decimals] = priceString.split('.');
    if (amount && amount.length > 12) {
      return false;
    }

    return decimals && decimals.length <= 2;
  }

  onSubmit() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: this.translateService.instant(
          'translate.createAdConfirmation'
        ),
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        const create = new CreateAd();
        create.productName = this.createForm.value.productName;
        if (!create.productName.length) {
          this.toastr.warning(
            this.translateService.instant('translate.mustAddName')
          );
        }
        create.description = this.createForm.value.description;
        if (!create.description.length) {
          this.toastr.warning(
            this.translateService.instant('translate.mustAddDescription')
          );
          return;
        }
        create.adsGroupId = this.categoryId;
        if (create.adsGroupId === undefined) {
          this.toastr.warning(
            this.translateService.instant('translate.mustAddCategory')
          );
          return;
        }
        create.adsSubGroupId = this.subcategoryId;
        if (create.adsSubGroupId === undefined) {
          this.toastr.warning(
            this.translateService.instant('translate.mustAddSubcategory')
          );
          return;
        }
        create.tags = this.clickedTags;
        create.image = this.photos;
        if (create.image.length === 0) {
          this.toastr.warning(
            this.translateService.instant('translate.mustAddImage')
          );
          return;
        }

        create.price = this.createForm.value.price;

        if (!create.price) {
          this.toastr.warning(
            this.translateService.instant('translate.setPrice')
          );
          return;
        }

        const isPriceValid = this.isPriceValid(create.price);

        if (!isPriceValid) {
          this.toastr.warning(
            this.translateService.instant('translate.invalidPrice')
          );
          return;
        }

        this.adsService.newAd(create).subscribe(
          (res) => {
            if (res) {
              this.router.navigate(['/site']);
              this.toastr.success(
                this.translateService.instant('translate.adSuccessfullyCreated')
              );
            }
          },
          (error) => {
            if (error.status === 403) {
              this.openSnackbar();
            }
          }
        );
      }
    });
  }

  // roundUp(num, precision) {
  //   precision = Math.pow(20, precision);
  //   return Math.ceil(num * precision) / precision;
  // }

  // checkDec(el) {
  //   const ex = /^[0-9]+\.?[0-9]*$/;
  //   if (ex.test(el.value) === false) {
  //     el.value = el.value.substring(0, el.value.length - 1);
  //   }
  // }

  log() {
    this.onSubmit();
  }

  openSnackbar() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(
      this.message,
      this.action ? this.actionButtonLabel : undefined,
      config
    );
  }
}
