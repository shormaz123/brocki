import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../@core/services/user.service';
import { AdsService } from '../../@core/services/ads.service';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import cantons from '../../shared/cantons.json';
import cities from '../../shared/cities.json';
import { UserStatus } from '../../shared/enums/userStatus';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-info-bussines',
  templateUrl: './update-info-bussines.component.html',
  styleUrls: ['./update-info-bussines.component.scss'],
})
export class UpdateInfoBussinesComponent implements OnInit {
  businessForm: FormGroup;
  businessUser: Array<User> = [];
  photos: Array<string> = [];
  companyPhotos: Array<string> = [];
  deletedImage: boolean;
  userId: number;
  userName: string;
  bussinesType: string;
  roleName: string;
  cantons = cantons;
  cities = cities;
  companyPhoto: string;
  photoValue: number;
  photo: string;
  currentPhotos: Array<any> = [];
  uploadPhotos: Array<string> = [];
  addresses: string[] = [];
  selectedAddress = null;
  selectedLocation: any;
  responseLocationObject;
  updateBusiness = new User();
  allImages: Array<any> = [];

  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private router: Router,
    private fb: FormBuilder,
    private adsService: AdsService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    window.scrollTo({ top: 0 });
    this.businessForm = this.fb.group({
      company: [''],
      name: [''],
      surname: [''],
      email: [{ value: '', disabled: true }],
      website: [''],
      phone: [''],
      mobile: [''],
      aboutUs: ['', [Validators.maxLength(2)]],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      postalNumber: ['', [Validators.required]],
      city: ['', [Validators.required]]

    });

    this.userService.getUser().subscribe((res) => {
      const user = new User();
      user.aboutUs = res.aboutUs;
      user.address = res.address;
      const [street, streetNumber, postalNumber, city] = res.address.split(',');
      console.log(street, streetNumber, postalNumber, city) ;
      user.street = street;
      user.houseNumber = streetNumber;
      user.postalNumber = postalNumber;
      user.city = city;
      this.bussinesType = res.bussinesType;
      user.bussinesType = res.bussinesType;
      user.company = res.company;
      user.companyImage = res.companyImage;
      this.allImages = res.companyImage || [];
      this.companyPhoto = this.allImages[0];
      if (res.companyImage) {
        this.photoValue = res.companyImage.length;
      } else {
        this.photoValue = 0;
      }
      user.credit = res.credit;
      user.dateOfBirth = res.dateOfBirth;
      user.email = res.email;
      user.id = res.id;
      this.userId = user.id;
      user.mobile = res.mobile;
      user.name = res.name;
      user.phone = res.phone;
      user.region = res.region;
      user.roleName = res.roleName;
      this.roleName = res.roleName;
      user.surname = res.surname;
      user.userName = res.userName;
      this.userName = res.userName;
      user.userStatus = res.userStatus;
      user.website = res.website;
      this.businessUser.push(user);

      this.businessForm.patchValue({
        company: user.company,
        name: user.name,
        surname: user.surname,
        email: user.email,
        website: user.website,
        phone: user.phone,
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        canton: user.region,
        aboutUs: user.aboutUs,
        street: user.street,
        postalNumber: user.postalNumber,
        houseNumber: user.houseNumber
      });
    });
  }

  uploadImage(event: any): void {
    event.preventDefault();

    if (event.target.files.length < 1) {
      return;
    }

    const formData = new FormData();
    const newPhotos = Object.values(event.target.files);
    if (newPhotos.length > 6) {
      this.toastr.warning('You can add up to 6 images');
    }

    this.currentPhotos = [...this.allImages, ...newPhotos].slice(0, 6);

    this.uploadPhotos = this.currentPhotos.slice(0, 6);
    this.uploadPhotos.forEach((photo) => formData.append('file', photo));
    this.adsService.uploadImageInStorage(formData).subscribe((res) => {
      this.allImages = [...this.allImages.concat(res)];
    });
  }

  // Drag and drop
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allImages, event.previousIndex, event.currentIndex);
  }

  deleteImage(index: number): void {
    this.allImages.splice(index, 1);
    this.deletedImage = true;
    this.photoValue = this.photoValue - 1;
  }

  onSubmit() {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: this.translateService.instant('translate.updateUser'),
          message: this.translateService.instant('translate.changeInfoConfirmation')
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
        this.updateBusiness.name = this.businessForm.value.name;
        this.updateBusiness.surname = this.businessForm.value.surname;
        this.updateBusiness.email = this.businessForm.value.email;
        this.updateBusiness.phone = this.businessForm.value.phone;
        this.updateBusiness.mobile = this.businessForm.value.mobile;
        this.updateBusiness.address = this.businessForm.value.address;
        this.updateBusiness.aboutUs = this.businessForm.value.aboutUs;
        this.updateBusiness.company = this.businessForm.value.company;
        this.updateBusiness.mobile = this.businessForm.value.mobile;
        this.updateBusiness.aboutUs = this.businessForm.value.aboutUs;
        this.updateBusiness.company = this.businessForm.value.company;
        this.updateBusiness.street = this.businessForm.value.street;
        this.updateBusiness.postalNumber = this.businessForm.value.postalNumber;
        this.updateBusiness.houseNumber = this.businessForm.value.houseNumber;
        this.updateBusiness.city = this.businessForm.value.city;
        this.updateBusiness.companyImage = this.allImages;
        this.updateBusiness.bussinesType = this.bussinesType;
        this.updateBusiness.roleName = this.roleName;
        this.updateBusiness.userName = this.userName;
        this.updateBusiness.userStatus = UserStatus.APPROVED;
        this.updateBusiness.website = this.businessForm.value.website;
        this.userService.updateUser(this.updateBusiness).subscribe(
          (user) => {
            this.toastr.success('', this.translateService.instant('translate.userUpdated'));
            window.scrollTo({ top: 0 });
            this.router.navigate([`/user/${this.userId}`]);
          },
          (error) => {
            this.toastr.error(this.translateService.instant('translate.wentWrong'));
          });
      }
    });
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }
}
