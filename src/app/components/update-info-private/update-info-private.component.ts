import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, SelectControlValueAccessor } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { stringify } from 'querystring';
import { UserService } from 'src/app/@core/services/user.service';
import { AuthConst } from 'src/app/@core/consts/auth.const';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-info-private',
  templateUrl: './update-info-private.component.html',
  styleUrls: ['./update-info-private.component.scss']
})
export class UpdateInfoPrivateComponent implements OnInit {

  updateInfoForm: FormGroup;

  currentUser: User;
  newUser: User;

  previewImage: string | undefined = '';
  previewVisible = false;

  listOfOption: Array<{ label: string; value: string }> = [
    {label: 'Zurich Region', value: 'Zurich Region'},
    {label: 'Bern Region', value: 'Bern Region'},
    {label: 'Graubünden Region', value: 'Graubünden Region'},
    {label: 'Valais Region', value: 'Valais Region'},
    {label: 'Lucerne Region', value: 'Lucerne Region'},
    {label: 'Geneva Region', value: 'Geneva Region'},
    {label: 'Lake Geneva Region', value: 'Lake Geneva Region'},
    {label: 'Ticino', value: 'Ticino'},
    {label: 'Eastern Switzerland', value: 'Eastern Switzerland'},
    {label: 'Basel', value: 'Basel'},
    {label: 'Aargau Region', value: 'Aargau Region'},
    {label: 'Jura & Three-Lakes', value: 'Jura & Three-Lakes'},
    {label: 'Fribourg Region', value: 'Fribourg Region'},
    {label: 'Principality of Liechtenstein', value: 'Principality of Liechtenstein'},
  ];

  listOfTagOptions = [];
  region: any;

  constructor(private notification: NzNotificationService,
              private userService: UserService,
              private modal: NzModalService,
              private router: Router) { }

  ngOnInit() {

    this.userService.getUser().subscribe(response => {
      this.newUser = response;
      console.log(this.newUser)
    })
  }


onSubmit() {
  this.modal.confirm({
    nzTitle:'Are you sure you want to change your info?',
    nzContent: '',
    nzOnOk: () =>
    this.userService.updateUser(this.newUser).subscribe( user =>
      {
        this.notification.success('', 'User updated')
        this.router.navigate(['/site'])
        console.log('User updated')


      },
      error => {
        this.modal.error({
          nzTitle: "Ops, something went wrong!"
        })
      }),

  })
  console.log(this.newUser)
}

changePassword() {
  this.router.navigateByUrl('/change-password', {state: this.newUser});
}


}
