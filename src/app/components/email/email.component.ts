import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ads } from 'app/shared/models/ads.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../@core/services/user.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    private router: Router,
    private translateService: TranslateService
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
      adlink: string;
      ad?: Ads;
    }

    const email = new sendEmail();

    if (this.emailForm.invalid) {
      this.toastr.warning(this.translateService.instant('translate.fillEveryFieldError'));
      return;
    }

    email.ad = this.adForEmail;
    email.name = this.emailForm.value.name;
    email.email = this.emailForm.value.email;
    email.emailSeller = this.sellerEmail;
    email.phone = this.emailForm.value.phone;
    email.message = this.emailForm.value.message;
    email.toSender = this.toSender;
    email.adlink = `https://minibrocki-fe-stage.herokuapp.com/ad/${this.adForEmail.id}`;

    this.toastr.success(this.translateService.instant('translate.emailSent'));

    if (email.ad) {
      this.router.navigate([`/ad/${this.adForEmail.id}`]);
    } else {
      this.router.navigate([`/site`]);
    }

    this.userService.sendEmailToSeller(email).subscribe();
  }
}
