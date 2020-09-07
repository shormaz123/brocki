import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  emailForm: FormGroup;
  checked: boolean = true;
  @Output() readonly closeEmail = new EventEmitter<void>();
  /// Sellers email
  @Input() sellerEmail: string;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.emailForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  closeImage(): void {
    this.closeEmail.emit();
  }

  copyOfEmail(): void {
    console.log('copy Email');
  }

  onSubmit() {
    class sendEmail {
      name: string;
      email: string;
      phone: number;
      message: string;
    }

    const email = new sendEmail();
    if (this.emailForm.invalid) {
      this.toastr.warning('Please fill in all fields');
      return;
    }
    email.name = this.emailForm.value.name;
    email.email = this.emailForm.value.email;
    email.phone = this.emailForm.value.phone;
    email.message = this.emailForm.value.message;
    console.log(email);
    this.toastr.success('An email has been sent');
    // this.notification.success('', 'An email has been sent');
    // this.router.navigate([`/user/${this.userId}`]);
    // this.userService.contactUs(email).subscribe();
  }
}
