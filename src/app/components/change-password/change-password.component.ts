import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/@core/services/user.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  password: string;
  newPassword:string;
  reTypePassword: string;
  currentUser: any;
  errorMessage: string;
  errorBoolean:boolean



  constructor(private userService: UserService ,
        private authService: AuthService,
     private notification: NzNotificationService,
     private modal: NzModalService,
     private router: Router) {


  }

  ngOnInit() {this.userService.getUser().subscribe(response => {
    this.currentUser = response;
    console.log(this.currentUser)
    this.password=''
  })
  }



  submit() {

    if (this.password === '') {
      this.errorBoolean= true
      this.errorMessage = 'Please, fill this form correctly'
    } else if (this.password != this.currentUser.password && this.newPassword === this.reTypePassword) {
      this.errorBoolean= true
      this.errorMessage = 'Your current password is wrong'
    } else if ( this.password === this.currentUser.password && this.newPassword != this.reTypePassword) {
      this.errorBoolean= true
    this.errorMessage = 'Please, retype your password correctly'
  } else if (this.password === this.currentUser.password && this.newPassword === this.reTypePassword){


    this.modal.confirm({
      nzTitle:'Are you sure you want to change your password?',
      nzContent: '',
      nzOnOk: () =>
      this.authService.newPassword(this.newPassword, this.reTypePassword).subscribe(response => {
        console.log('User updated', response)
        this.notification.success('', 'Password updated')
        this.router.navigate(['/site'])
      },
      error => {
        this.modal.error({
          nzTitle: "Ops, something went wrong!"
        })
      }),

    })
  }


  }

}
