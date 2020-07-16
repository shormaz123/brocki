import { Component, OnInit } from "@angular/core";
import { UploadFile, UploadChangeParam } from "ng-zorro-antd/upload";
import { User } from "src/app/shared/models/user.model";
import { AuthConst } from "src/app/@core/consts/auth.const";
import { UserService } from "src/app/@core/services/user.service";
import { NzNotificationService, NzModalService } from "ng-zorro-antd";
import { Router } from "@angular/router";
import regions from "../../shared/regions.json";

@Component({
  selector: "app-update-info-bussines",
  templateUrl: "./update-info-bussines.component.html",
  styleUrls: ["./update-info-bussines.component.scss"],
})
export class UpdateInfoBussinesComponent implements OnInit {
  currentUser: User;
  newUser: User;
  companyImage;
  regions = regions;

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true,
  };

  previewImage: string | undefined = "";
  previewVisible = false;
  uploadImageUrl =
  "https://mybrocki-be.herokuapp.com/mybrocki/auth/image/upload";

fileList: string[] = [];


  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  constructor(
    private notification: NzNotificationService,
    private userService: UserService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((response) => {
      this.newUser = response;
    });
  }


  onSubmit() {
    const formData = new FormData();

    this.modal.confirm({
      nzTitle: "Are you sure you want to change your info?",
      nzContent: "",
      nzOnOk: () =>
        this.userService.updateUser(this.newUser).subscribe(
          (user) => {
            console.log(user);
            this.notification.success("", "User updated");
            this.router.navigate(["/site"]);
            console.log("User updated");
          },
          (error) => {
            this.modal.error({
              nzTitle: "Ops, something went wrong!",
            });
          }
        ),
    });
    console.log(this.newUser);
  }
}
