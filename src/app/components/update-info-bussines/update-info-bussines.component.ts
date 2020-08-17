import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../@core/services/user.service';
import { AdsService } from '../../@core/services/ads.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import cantons from '../../shared/cantons.json';
import cities from '../../shared/cities.json';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';

@Component({
  selector: 'app-update-info-bussines',
  templateUrl: './update-info-bussines.component.html',
  styleUrls: ['./update-info-bussines.component.scss'],
})
export class UpdateInfoBussinesComponent implements OnInit {
  formData = new FormData();
  businessForm: FormGroup;
  businessUser: Array<User> = [];
  uploadPhoto: Array<string> = [];
  photos: Array<string> = [];
  companyPhotos: Array<string> = [];
  deletedImage: boolean;
  uploadedImage: Array<string> = [];
  userId: number;
  userName: string;
  bussinesType: string;
  roleName: string;
  cantons = cantons;
  cities = cities;

  constructor(
    private notification: NzNotificationService,
    private userService: UserService,
    private modal: NzModalService,
    private router: Router,
    private fb: FormBuilder,
    private adsService: AdsService
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
      address: [''],
      canton: [''],
      city: [''],
      aboutUs: ['', [Validators.maxLength(2)]],
    });

    this.userService.getUser().subscribe((res) => {
      const user = new User();
      user.aboutUs = res.aboutUs;
      user.address = res.address;
      this.bussinesType = res.bussinesType;
      user.bussinesType = res.bussinesType;
      user.city = res.city;
      user.company = res.company;
      user.companyImage = res.companyImage;
      this.companyPhotos = res.companyImage || [];
      user.credit = res.credit;
      user.dateOfBirth = res.dateOfBirth;
      user.email = res.email;
      user.id = res.id;
      this.userId = user.id;
      user.location = res.location;
      user.mobile = res.mobile;
      user.name = res.name;
      user.phone = res.phone;
      user.region = res.region;
      user.roleName = res.roleName;
      this.roleName = res.roleName;
      user.surname = res.surname;
      user.userName = res.userName;
      this.userName = res.userName;
      user.visible = res.visible;
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
      });
    });
  }

  uploadImage(event: any): void {
    this.uploadPhoto = [];
    if (event.target.files) {
      this.formData = new FormData();
      this.uploadPhoto.push(...event.target.files);
    }
    if (this.uploadPhoto.length > 0) {
      for (const picture of this.uploadPhoto) {
        this.formData.append('file', picture);
      }
      this.adsService.uploadImageInStorage(this.formData).subscribe((res) => {
        this.uploadedImage = res;
        this.photos.push(...this.uploadedImage);
      });
    }
  }

  deleteStoragedPhoto(photo: string, index: number): void {
    this.companyPhotos.splice(index, 1);
    this.adsService.deleteImage(photo).subscribe();
    this.deletedImage = true;
  }

  deletePhoto(index: number): void {
    this.photos.splice(index, 1);
  }

  onSubmit() {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to change your info?',
      nzContent: '',
      nzOnOk: () => {
        const updateBusiness = new User();
        updateBusiness.name = this.businessForm.value.name;
        updateBusiness.surname = this.businessForm.value.surname;
        updateBusiness.email = this.businessForm.value.email;
        updateBusiness.phone = this.businessForm.value.phone;
        updateBusiness.mobile = this.businessForm.value.mobile;
        updateBusiness.address = this.businessForm.value.address;
        updateBusiness.city = this.businessForm.value.city;
        updateBusiness.region = this.businessForm.value.canton;
        updateBusiness.aboutUs = this.businessForm.value.aboutUs;
        updateBusiness.location = '';
        updateBusiness.company = this.businessForm.value.company;
        updateBusiness.companyImage = this.photos.concat(this.companyPhotos);
        updateBusiness.bussinesType = this.bussinesType;
        updateBusiness.roleName = this.roleName;
        updateBusiness.userName = this.userName;
        updateBusiness.visible = true;
        updateBusiness.website = this.businessForm.value.website;
        this.userService.updateUser(updateBusiness).subscribe(
          (user) => {
            this.notification.success('', 'User updated');
            window.scrollTo({ top: 0 });
            this.router.navigate([`/user/${this.userId}`]);
          },
          (error) => {
            this.modal.error({
              nzTitle: 'Ops, something went wrong!',
            });
          }
        );
      },
    });
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }
}
