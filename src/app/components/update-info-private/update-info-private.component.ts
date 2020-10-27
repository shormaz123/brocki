import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../@core/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import cantons from '../../shared/cantons.json';
import cities from '../../shared/cities.json';
import { UserStatus } from '../../shared/enums/userStatus';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

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
    private dialog: MatDialog,
    private translateService: TranslateService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    window.scrollTo({ top: 0 });
    this.privateForm = this.fb.group({
      userName: [''],
      name: [''],
      surname: [''],
      email: [{ value: '', disabled: true }],
      phone: [''],
      mobile: [''],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      postalNumber: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });

    this.userService.getUser().subscribe((res) => {
      this.userId = res.id;
      const user = new User();
      const [street, streetNumber, postalNumber, city] = res.address.split(',');
      user.street = street;
      user.houseNumber = streetNumber;
      user.postalNumber = postalNumber;
      user.city = city;
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
      user.mobile = res.mobile;
      user.name = res.name;
      user.phone = res.phone;
      user.region = res.region;
      user.roleName = res.roleName;
      user.surname = res.surname;
      user.userName = res.userName;
      user.userStatus = res.userStatus;
      user.website = res.website;
      this.newUser.push(user);

      this.privateForm.patchValue({
        userName: user.userName,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        canton: user.region,
        street: user.street,
        postalNumber: user.postalNumber,
        houseNumber: user.houseNumber
      });
    });
  }


  onSubmit() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: this.translateService.instant('translate.updateUser'),
        message: this.translateService.instant(
          'translate.changeInfoConfirmation'
        ),
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
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
        updateUserInfo.company = '';
        updateUserInfo.street = this.privateForm.value.street;
        updateUserInfo.postalNumber = this.privateForm.value.postalNumber;
        updateUserInfo.houseNumber = this.privateForm.value.houseNumber;
        updateUserInfo.city = this.privateForm.value.city;
        updateUserInfo.companyImage = [];
        updateUserInfo.bussinesType = 'PRIVATE';
        updateUserInfo.roleName = 'private';
        updateUserInfo.userName = this.privateForm.value.userName;
        updateUserInfo.userStatus = UserStatus.APPROVED;
        updateUserInfo.website = '';
        this.userService.updateUser(updateUserInfo).subscribe(
          (user) => {
            this.toastr.success(
              '',
              this.translateService.instant('translate.userUpdated')
            );
            this.router.navigate([`/user/${this.userId}`]);
          },
          (error) => {
            this.toastr.error(
              this.translateService.instant('translate.wentWrong')
            );
          }
        );
      }
    });
  }

  changePassword() {
    this.router.navigateByUrl('/change-password', { state: this.newUser });
  }
}
