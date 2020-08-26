import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../@core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { NzModalService } from 'ng-zorro-antd';
import { UserStatus } from '../../../shared/enums/userStatus';
import { ToastrService } from 'ngx-toastr';
import {AuthConst} from '../../../@core/consts/auth.const';

@Component({
  selector: 'app-accept-users',
  templateUrl: './accept-users.component.html',
  styleUrls: ['./accept-users.component.scss'],
})
export class AcceptUsersComponent implements OnInit {
  usersForReview: Array<any> = [];
  lang: string;

  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.lang = localStorage.getItem(AuthConst.language)
    this.userService.UsersForAcceptions().subscribe((res) => {
      this.usersForReview.push(res);
    });
  }

  acceptUser(userForAccept: User, index: number) {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to accept this user?',
      nzContent: '',
      nzOnOk: () => {
        this.usersForReview[0].splice(index, 1);
        const user = new User();
        user.aboutUs = userForAccept.aboutUs;
        user.address = userForAccept.address;
        user.bussinesType = userForAccept.bussinesType;
        user.city = userForAccept.city;
        user.company = userForAccept.company;
        user.companyImage = userForAccept.companyImage;
        user.credit = userForAccept.credit;
        user.dateOfBirth = userForAccept.dateOfBirth;
        user.email = userForAccept.email;
        user.id = userForAccept.id;
        user.location = userForAccept.location;
        user.mobile = userForAccept.mobile;
        user.name = userForAccept.name;
        user.password = userForAccept.password;
        user.phone = userForAccept.phone;
        user.region = userForAccept.region;
        user.roleName = userForAccept.roleName;
        user.surname = userForAccept.surname;
        user.userName = userForAccept.userName;
        user.userStatus = UserStatus.APPROVED;
        user.website = userForAccept.website;
        this.userService.acceptUsers(user.userStatus, user.id).subscribe(() => {
          this.acceptedUser();
        });
      },
    });
  }

  rejectUser(rejectUser: User, index: number) {
    this.modal.confirm({
      nzTitle: 'Are you sure you do not want to accept this user?',
      nzContent: '',
      nzOnOk: () => {
        this.usersForReview[0].splice(index, 1);
        const user = new User();
        user.aboutUs = rejectUser.aboutUs;
        user.address = rejectUser.address;
        user.bussinesType = rejectUser.bussinesType;
        user.city = rejectUser.city;
        user.company = rejectUser.company;
        user.companyImage = rejectUser.companyImage;
        user.credit = rejectUser.credit;
        user.dateOfBirth = rejectUser.dateOfBirth;
        user.email = rejectUser.email;
        user.id = rejectUser.id;
        user.location = rejectUser.location;
        user.mobile = rejectUser.mobile;
        user.name = rejectUser.name;
        user.password = rejectUser.password;
        user.phone = rejectUser.phone;
        user.region = rejectUser.region;
        user.roleName = rejectUser.roleName;
        user.surname = rejectUser.surname;
        user.userName = rejectUser.userName;
        user.userStatus = UserStatus.DECLINE;
        user.website = rejectUser.website;
        this.userService.acceptUsers(user.userStatus, user.id).subscribe(() => {
          this.toastr.success('the user is declined');
        });
      },
    });
  }

  acceptedUser() {
    if (this.lang === 'en') {
      return this.toastr.success('the user is accepted!');
    } else if (this.lang === 'fr') {
      return this.toastr.success("l'utilisateur est accepté");
    } else if (this.lang === 'de') {
      return this.toastr.success('Der Benutzer wird akzeptiert');
    } else if (this.lang === 'it') {
      return this.toastr.success("l'utente è accettato");
    }
  }
}
