import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../../@core/services/user.service';
import { AuthService } from '../../@core/services/auth.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  oldPassword: string;
  newPassword: string;
  reTypePassword: string;
  userId: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private router: Router,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((response) => {
      this.userId = response.id;
    });

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      reTypePassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          message: this.translateService.instant('translate.changePasswordConfirmation')
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if (result) {
        (this.oldPassword = this.changePasswordForm.value.oldPassword),
          (this.newPassword = this.changePasswordForm.value.newPassword),
          this.authService
            .newPassword(this.oldPassword, this.newPassword)
            .subscribe(
              (res) => {
                if (res) {
                this.toastr.success('', this.translateService.instant('translate.passwordChanged'));
                this.router.navigate([`/user/${this.userId}`]);
                }
              },
              (error) => {
                this.modal.error({
                  nzTitle: error.message,
                });
              });
            }
      });
  }

}
