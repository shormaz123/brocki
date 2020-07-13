import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-account-expired",
  templateUrl: "./account-expired.component.html",
  styleUrls: ["./account-expired.component.scss"],
})
export class AccountExpiredComponent implements OnInit {
  ads = [
    {
      title: "Toyota Aygo 1.0 Linea Sol",
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
