import {
  Component,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { element } from 'protractor';
import { AuthConst } from '../../@core/consts/auth.const';

interface category {
  id: number;
  groupName: string;
}

interface subcategory {
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
  statusOfProduct = 'NEW';
  categories: Array<adsGroup> = [];
  subcategories: Array<adsSubGroup> = [];
  uploadPhoto: Array<any> = [];
  photos: Array<string> = [];
  picture: Array<string> = [];
  categoryId: number;
  categoryName: string;
  subcategoryName: string;
  subcategoryId: number;
  subscriptionLang: Subscription;
  currentLang: string;
  currentPhotos: Array<any> = [];
  filteredCategory: Array<adsGroup> = [];
  filteredSubcategory: Array<adsSubGroup> = [];
  toggleCategory: boolean = false;
  toggleSubcategory: boolean = false;
  toggleListCategory: boolean = false;
  toggleListSubcategory: boolean = false;
  language: string;
  clickedTags: Array<string> = [];
  clickedTag: string;

  tags = [
    // 'aaaaaaa',
    // 'bbbbbb',
    // 'ccccc',
    // 'ddddddd',
    // 'eeeeeeee',
    // 'fffffff',
    // 'ggggggg',
    // 'hhhhhhhhhh',
    // 'iiiiiii',
    // 'jjjjjjjjj',
    // 'kkkkk',
    // 'lllll',
    // 'mmmmmm',
    // 'nnnnn',
    // 'oooooo',
    // 'pppppppp',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adsService: AdsService,
    private translateBackend: TranslateServiceRest,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.language = localStorage.getItem(AuthConst.language);
    this.currentLang = this.language;
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
        this.lang();
        this.clickedTags = [];
      });
    this.lang();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionLang.unsubscribe();
  }

  chosenTag(tag: string): void {
    this.clickedTag = tag;

    this.clickedTags = [...this.clickedTags];

    if (this.clickedTags.includes(this.clickedTag)) {
      this.clickedTags = this.clickedTags.filter((e) => e !== this.clickedTag);
      return;
    }

    if (this.clickedTags.length < 3) {
      this.clickedTags.push(tag);
    } else {
      this.setLanguage();
    }
  }

  setLanguage() {
    if (this.currentLang === 'en') {
      return this.toastr.warning('You can choose up to 3 tags');
    } else if (this.currentLang === 'fr') {
      return this.toastr.warning("Vous pouvez choisir jusqu'à 3 balises");
    } else if (this.currentLang === 'de') {
      return this.toastr.warning('Sie können bis zu 3 Tags auswählen');
    } else if (this.currentLang === 'it') {
      return this.toastr.warning('Puoi scegliere fino a 3 tag');
    }
  }

  lang() {
    if (this.currentLang === 'de') {
      this.tags = [
        'antik',
        'gebraucht',
        'neu',
        'gut zu gebrauchen',
        'restauriert',
        'defekt',
        'luxuriös',
        'aus holz',
        'sammlerstück',
        'selten',
        'einzigartig',
        'handgemacht',
        'aus erste hand',
        'für kinder & jugendliche',
        'für männer',
        'für frauen',
        'preis verhandelbar',
        'macOS & iOS',
        'android',
        'windows',
      ];
    } else if (this.currentLang === 'en') {
      this.tags = [
        'antique',
        'second hand',
        'new',
        'good to use',
        'restored',
        'malfunction',
        'luxurious',
        'wooden',
        "collector's item",
        'rare',
        'unique',
        'handmade',
        'first-hand',
        'for children & teenagers',
        'for men',
        'for women',
        'price negotiable',
        'macOS & iOS',
        'android',
        'windows',
      ];
    } else if (this.currentLang === 'it') {
      this.tags = [
        'antico',
        'seconda mano',
        'nuovo',
        'buono da usare',
        'restaurato',
        'malfunzionamento',
        'lussuoso',
        'legno',
        'oggetto da collezione',
        'raro',
        'unico',
        'fatto a mano',
        'di prima mano',
        'per bambini & adolescenti',
        'per uomo',
        'per donne',
        'prezzo negoziabile',
        'macOS & iOS',
        'android',
        'windows',
      ];
    } else if (this.currentLang === 'fr') {
      this.tags = [
        'antique',
        "d'occasion",
        'nouveau',
        'bon à utiliser',
        'restaure',
        'mauvais fonctionnement',
        'luxueux',
        'en bois',
        'pièce de collection',
        'rare',
        'unique',
        'fait main',
        'première main',
        'pour les enfants & adolescents',
        'pour hommes',
        'pour femme',
        'prix nègociable',
        'macOS & iOS',
        'android',
        'windows',
      ];
    }
  }

  statusProduct(event: any): void {
    this.statusOfProduct = event.target.value;
  }

  findCategory(selectedCategory: category): void {
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

  findsubcategory(subcategory: subcategory): void {
    this.subcategoryId = subcategory.id;
    this.subcategoryName = subcategory.subGroupName[this.currentLang];
    this.createForm.patchValue({ subcategory: this.subcategoryName });
  }

  onSubmit() {

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'New Ad',
        message: 'Are you sure you want to create your ad?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
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
          Number(
            (Math.round(this.createForm.value.price * 100) / 100).toFixed(2)
          ),
          1
        );
        if (create.price === 0) {
          this.toastr.warning('You have to set a price');
          return;
        }
        create.adsType = this.statusOfProduct;

        this.adsService.newAd(create).subscribe(() => {
          this.router.navigate(['/site']);
          this.toastr.success('Ad successfully created!');
        });
      }
    });

    //   },
    // });
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
