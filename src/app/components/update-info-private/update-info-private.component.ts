import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../@core/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import cantons from '../../shared/cantons.json';
import cities from '../../shared/cities.json';
import { UserStatus } from '../../shared/enums/userStatus';
import {MapboxServiceService} from '../../@core/services/mapbox-service.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-info-private',
  templateUrl: './update-info-private.component.html',
  styleUrls: ['./update-info-private.component.scss'],
})
export class UpdateInfoPrivateComponent implements OnInit {
  privateForm: FormGroup;
  cantons = cantons;
  cities = cities;
  userName: string;
  newUser: Array<User> = [];
  userId: number;
  addresses: string[] = [];
  selectedAddress = null;
  selectedLocation: any;
  responseLocationObject;

  constructor(
    private notification: NzNotificationService,
    private userService: UserService,
    private modal: NzModalService,
    private router: Router,
    private fb: FormBuilder,
    private mapboxService: MapboxServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    window.scrollTo({ top: 0 });
    this.privateForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [{ value: '', disabled: true }],
      phone: [''],
      mobile: [''],
      address: [''],
      canton: [''],
      location: [
        {
          longitude: 0,
          latitude: 0
        }
      ]
    });

    this.userService.getUser().subscribe((res) => {
      this.userId = res.id;
    });

    this.userService.getUser().subscribe((res) => {
      const user = new User();
      this.selectedLocation = res.location;
      user.location = {
        longitude: res.location.longitude,
        latitude: res.location.latitude
      };
      user.aboutUs = res.aboutUs;
      user.address = res.address;
      user.bussinesType = res.bussinesType;
      user.city = res.city;
      user.company = res.company;
      user.companyImage = res.companyImage;
      user.credit = res.credit;
      user.dateOfBirth = res.dateOfBirth;
      user.email = res.email;
      user.id = res.id;
      user.location = res.location;
      user.mobile = res.mobile;
      user.name = res.name;
      user.phone = res.phone;
      user.region = res.region;
      user.roleName = res.roleName;
      user.surname = res.surname;
      user.userName = res.userName;
      this.userName = res.userName;
      user.userStatus = res.userStatus;
      user.website = res.website;
      this.newUser.push(user);

      this.privateForm.patchValue({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        canton: user.region,
        location: user.location,
      });
    });
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: any) => {
          this.addresses = features.map(feat => feat.place_name);
          this.responseLocationObject = features.map(feat => feat.geometry);
          console.log( 'objekat', features);

        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: string, i: number) {
    this.selectedAddress = address;
    this.addresses = [];
    this.selectedLocation = this.responseLocationObject[i];
    console.log( 'koordinate', this.selectedLocation);
    this.privateForm.patchValue( {
      location: {
        longitude: this.selectedLocation.coordinates[0],
        latitude: this.selectedLocation.coordinates[1],
      },
    });
  }

  onSubmit() {
    // this.modal.confirm({
    //   nzTitle: 'Are you sure you want to change your info?',
    //   nzContent: '',
    //   nzOnOk: () => {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: 'Update user',
          message: 'Are you sure you want to change your info?'
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
        const updateUserInfo = new User();
        updateUserInfo.name = this.privateForm.value.name;
        updateUserInfo.surname = this.privateForm.value.surname;
        updateUserInfo.email = this.privateForm.value.email;
        updateUserInfo.phone = this.privateForm.value.phone;
        updateUserInfo.mobile = this.privateForm.value.mobile;
        updateUserInfo.address = this.privateForm.value.address;
        updateUserInfo.city = this.privateForm.value.city;
        updateUserInfo.region = this.privateForm.value.canton;
        updateUserInfo.aboutUs = '';
        updateUserInfo.location = this.privateForm.value.location;
        // updateUserInfo.location = '';
        updateUserInfo.company = '';
        updateUserInfo.companyImage = [];
        updateUserInfo.bussinesType = 'PRIVATE';
        updateUserInfo.roleName = 'private';
        updateUserInfo.userName = this.userName;
        updateUserInfo.userStatus = UserStatus.APPROVED;
        updateUserInfo.website = '';
        this.userService.updateUser(updateUserInfo).subscribe(
          (user) => {
            this.notification.success('', 'User updated');
            this.router.navigate([`/user/${this.userId}`]);
          },
          (error) => {
            this.modal.error({
              nzTitle: 'Ops, something went wrong!',
            });
          }
        );
      }
    });
  }

  changePassword() {
    this.router.navigateByUrl('/change-password', { state: this.newUser });
  }
}
