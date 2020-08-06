import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.contactForm = this.fb.group({
      name: [""],
      email: [""],
      subject: [""],
      message: [""],
    });
  }

  onSubmit() {
    console.log(this.contactForm.value);
  }
}
