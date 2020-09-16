import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ads } from 'app/shared/models/ads.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../@core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  emailForm: FormGroup;
  @Output() readonly closeEmail = new EventEmitter<void>();
  @Input() sellerEmail: string;
  @Input() adForEmail: Ads;

  checked: boolean = true;
  email: boolean = false;
  toSender: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.emailForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9,+]\d*)?$/)],
      ],
      message: ['', [Validators.required]],
    });
  }

  closeModal(): void {
    this.closeEmail.emit();
  }

  copyOfEmail(): void {
    this.toSender = !this.toSender;
  }

  onSubmit() {
    class sendEmail {
      name: string;
      email: string;
      emailSeller: string;
      phone: string;
      message: string;
      toSender: boolean;
      ad?: Ads;
    }
    const email = new sendEmail();
    if (this.emailForm.invalid) {
      this.toastr.warning('Please fill in all fields');
      return;
    }
    email.ad = this.adForEmail;
    email.name = this.emailForm.value.name;
    email.email = this.emailForm.value.email;
    email.emailSeller = this.sellerEmail;
    email.phone = this.emailForm.value.phone;
    email.message = this.emailForm.value.message;
    email.toSender = this.toSender;
    console.log(email);

    this.toastr.success('An email has been sent');

    if (email.ad) {
      this.router.navigate([`/ad/${this.adForEmail.id}`]);
    } else {
      this.router.navigate([`/site`]);
    }

    this.userService.sendEmailToSeller(email).subscribe();
  }
}
