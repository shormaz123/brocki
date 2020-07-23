import { Component, OnInit } from "@angular/core";
import { AdsService } from "../../../@core/services/ads.service";
import { UserService } from "../../../@core/services/user.service";

@Component({
  selector: "app-account-active",
  templateUrl: "./account-active.component.html",
  styleUrls: ["./account-active.component.scss"],
})
export class AccountActiveComponent implements OnInit {
  userId: number;
  ads = [
    {
      title: "Toyota",
      text:
        "Lores lopsum in textarea , text for example. text for example Lores lopsum in textarea , text for example.,Lores lopsum in textareatext for example,Lores lopsum in textarea , text for example , Lores lopsum in textarea , text for example",
      price: "2900",
      days: "5 days ago",
    },
    {
      title: "Jewelery set",
      text: "",
      price: "144",
      days: "14 days ago",
    },
  ];

  constructor(
    private userService: UserService,
    private adService: AdsService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((res) => {
      console.log(res.id);
      this.userId = res.id;
    });
  }
}
