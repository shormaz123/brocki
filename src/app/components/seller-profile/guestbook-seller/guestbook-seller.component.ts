import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-guestbook-seller",
  templateUrl: "./guestbook-seller.component.html",
  styleUrls: ["./guestbook-seller.component.scss"],
})
export class GuestbookSellerComponent implements OnInit {
  ratingForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.ratingForm = this.fb.group({
      rating: [""],
      comment: [""],
    });
  }

  onSubmit(): void {}
}
