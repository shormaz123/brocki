import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-account-sold",
  templateUrl: "./account-sold.component.html",
  styleUrls: ["./account-sold.component.scss"],
})
export class AccountSoldComponent implements OnInit {
  ads = [
    {
      title: "Toyota Aygo 1.0",
      text: "Lores lopsum in textarea , text for example.",
      price: "2900",
      days: "5 days ago",
    },
    {
      title: "Jewelery set",
      text: "Another text description",
      price: "144",
      days: "14 days ago",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
