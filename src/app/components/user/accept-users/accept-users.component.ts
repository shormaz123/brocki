import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../@core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';

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
    this.userService.UsersForAcceptions().subscribe((res) => {
      this.usersForReview.push(res);
    });
  }

  getLanguage(event: any) {
    this.lang = event;
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
        user.visible = true;
        user.website = userForAccept.website;
        this.userService.acceptUsers(user.visible, user.id).subscribe(() => {
          this.acceptedUser();
        });
      },
    });
  }

  rejectUser(rejectUser: User, index: number) {
    //   this.modal.confirm({
    //     nzTitle: 'Are you sure you want to accept this user?',
    //     nzContent: '',
    //     nzOnOk: () => {
    //       this.usersForReview[0].splice(index, 1);
    //       const user = new User();
    //       user.aboutUs = userForAccept.aboutUs;
    //       user.address = userForAccept.address;
    //       user.bussinesType = userForAccept.bussinesType;
    //       user.city = userForAccept.city;
    //       user.company = userForAccept.company;
    //       user.companyImage = userForAccept.companyImage;
    //       user.credit = userForAccept.credit;
    //       user.dateOfBirth = userForAccept.dateOfBirth;
    //       user.email = userForAccept.email;
    //       user.id = userForAccept.id;
    //       user.location = userForAccept.location;
    //       user.mobile = userForAccept.mobile;
    //       user.name = userForAccept.name;
    //       user.password = userForAccept.password;
    //       user.phone = userForAccept.phone;
    //       user.region = userForAccept.region;
    //       user.roleName = userForAccept.roleName;
    //       user.surname = userForAccept.surname;
    //       user.userName = userForAccept.userName;
    //       user.visible = false;
    //       user.website = userForAccept.website;
    // this.userService.acceptUsers(user.visible, user.id).subscribe(() => {
    // this.toastr.success('the user is accepted');
    // });
    //   },
    // });
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
