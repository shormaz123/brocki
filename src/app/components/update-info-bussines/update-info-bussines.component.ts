import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../@core/services/user.service';
import { AdsService } from '../../@core/services/ads.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import cantons from '../../shared/cantons.json';
import cities from '../../shared/cities.json';
import { UserStatus } from '../../shared/enums/userStatus';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import {
  Feature,
  MapboxServiceService,
} from '../../@core/services/mapbox-service.service';

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
    private notification: NzNotificationService,
    private userService: UserService,
    private modal: NzModalService,
    private router: Router,
    private fb: FormBuilder,
    private adsService: AdsService,
    private toastr: ToastrService,
    private mapboxService: MapboxServiceService
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
      location: [
        {
          longitude: 0,
          latitude: 0,
        },
      ],
    });

    this.userService.getUser().subscribe((res) => {
      this.selectedLocation = res.location;
      const user = new User();
      user.aboutUs = res.aboutUs;
      user.address = res.address;
      this.bussinesType = res.bussinesType;
      user.bussinesType = res.bussinesType;
      user.city = res.city;
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
      user.location = {
        longitude: res.location.longitude,
        latitude: res.location.latitude,
      };

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
        location: user.location,
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

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService.search_word(searchTerm).subscribe((features: any) => {
        this.addresses = features.map((feat) => feat.place_name);
        this.responseLocationObject = features.map((feat) => feat.geometry);
        console.log('objekat', features);
      });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: string, i: number) {
    this.selectedAddress = address;
    this.addresses = [];
    this.selectedLocation = this.responseLocationObject[i];
    console.log('koordinate', this.selectedLocation);
    this.businessForm.patchValue({
      location: {
        longitude: this.selectedLocation.coordinates[0],
        latitude: this.selectedLocation.coordinates[1],
      },
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
    this.modal.confirm({
      nzTitle: 'Are you sure you want to change your info?',
      nzContent: '',
      nzOnOk: () => {
        this.updateBusiness.name = this.businessForm.value.name;
        this.updateBusiness.surname = this.businessForm.value.surname;
        this.updateBusiness.email = this.businessForm.value.email;
        this.updateBusiness.phone = this.businessForm.value.phone;
        this.updateBusiness.mobile = this.businessForm.value.mobile;
        this.updateBusiness.address = this.businessForm.value.address;
        this.updateBusiness.city = this.businessForm.value.city;
        this.updateBusiness.region = this.businessForm.value.canton;
        this.updateBusiness.aboutUs = this.businessForm.value.aboutUs;
        this.updateBusiness.location = this.businessForm.value.location;
        this.updateBusiness.company = this.businessForm.value.company;
        this.updateBusiness.companyImage = this.allImages;
        this.updateBusiness.bussinesType = this.bussinesType;
        this.updateBusiness.roleName = this.roleName;
        this.updateBusiness.userName = this.userName;
        this.updateBusiness.userStatus = UserStatus.APPROVED;
        this.updateBusiness.website = this.businessForm.value.website;
        this.userService.updateUser(this.updateBusiness).subscribe(
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
