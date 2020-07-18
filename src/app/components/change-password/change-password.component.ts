import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { UserService } from "src/app/@core/services/user.service";
import { AuthService } from "src/app/@core/services/auth.service";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
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
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((response) => {
      this.userId = response.id;
    });

    this.changePasswordForm = this.fb.group({
      oldPassword: ["", []],
      newPassword: ["", []],
      reTypePassword: ["", []],
    });
  }

  onSubmit() {
    this.modal.confirm({
      nzTitle: "Are you sure you want to change your password?",
      nzContent: "",
      nzOnOk: () => {
        (this.oldPassword = this.changePasswordForm.value.oldPassword),
          (this.newPassword = this.changePasswordForm.value.newPassword),
          this.authService
            .newPassword(this.oldPassword, this.newPassword)
            .subscribe(
              (res) => {},
              (error) => {
                this.notification.success("", "Password successfully changed!");
                this.router.navigate([`/user/${this.userId}`]);
                // this.modal.error({
                //   nzTitle: "Ops, something went wrong!",
                // });
              }
            );
    }
    });

  }
}
