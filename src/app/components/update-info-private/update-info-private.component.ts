import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/shared/models/user.model";
import { UserService } from "src/app/@core/services/user.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzNotificationService } from "ng-zorro-antd";
import { Router } from "@angular/router";
import regions from "../../shared/regions.json";

@Component({
  selector: "app-update-info-private",
  templateUrl: "./update-info-private.component.html",
  styleUrls: ["./update-info-private.component.scss"],
})
export class UpdateInfoPrivateComponent implements OnInit {
  itemForm: FormGroup;
  regions = regions;
  userName: string;
  newUser: Array<User> = [];

  constructor(
    private notification: NzNotificationService,
    private userService: UserService,
    private modal: NzModalService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: [""],
      surname: [""],
      email: ["", [Validators.required, Validators.email]],
      phone: [""],
      mobile: [""],
      address: [""],
      city: [""],
      region: [""],
    });

    this.userService.getUser().subscribe((res) => {
      const user = new User();
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
      user.visible = res.visible;
      user.website = res.website;
      this.newUser.push(user);

      this.itemForm.patchValue({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        region: user.region,
      });
    });
  }

  onSubmit() {
    this.modal.confirm({
      nzTitle: "Are you sure you want to change your info?",
      nzContent: "",
      nzOnOk: () => {
        const updateUserInfo = new User();
        updateUserInfo.name = this.itemForm.value.name;
        updateUserInfo.surname = this.itemForm.value.surname;
        updateUserInfo.email = this.itemForm.value.email;
        updateUserInfo.phone = this.itemForm.value.phone;
        updateUserInfo.mobile = this.itemForm.value.mobile;
        updateUserInfo.address = this.itemForm.value.address;
        updateUserInfo.city = this.itemForm.value.city;
        updateUserInfo.region = this.itemForm.value.region;
        updateUserInfo.aboutUs = "";
        updateUserInfo.location = "";
        updateUserInfo.company = "";
        updateUserInfo.companyImage = [];
        updateUserInfo.bussinesType = "PRIVATE";
        updateUserInfo.roleName = "private";
        updateUserInfo.userName = this.userName;
        updateUserInfo.visible = true;
        updateUserInfo.website = "";
        this.userService.updateUser(updateUserInfo).subscribe(
          (user) => {
            this.notification.success("", "User updated");
            this.router.navigate(["/user"]);
          },
          (error) => {
            this.modal.error({
              nzTitle: "Ops, something went wrong!",
            });
          }
        );
      },
    });
  }

  changePassword() {
    this.router.navigateByUrl("/change-password", { state: this.newUser });
  }
}
