import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../@core/services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthConst } from '../../@core/consts/auth.const';
import { ToastrService } from 'ngx-toastr';
import {  throttleTime } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  userId: number;
  token;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    (this.token = localStorage.getItem(AuthConst.token)),
      window.scrollTo({ top: 0 });
    this.contactForm = this.fb.group({
      name: [''],
      email: [''],
      subject: [''],
      message: [''],
    });
    if (this.token) {
      this.userService.getUser().subscribe((res) => {
        this.userId = res.id;
      });
    } else {
      return;
    }
  }

  onSubmit() {
    class contacUsEmail {
      name: string;
      email: string;
      subject: string;
      message: string;
    }

    const email = new contacUsEmail();
    email.name = this.contactForm.value.name;
    email.email = this.contactForm.value.email;
    email.subject = this.contactForm.value.subject;
    email.message = this.contactForm.value.message;

    this.userService.contactUs(email).pipe(throttleTime(2000)).subscribe(
      (x) => {
      if (x) {
        this.toastr.success('', this.translateService.instant('translate.emailSent'));
        this.router.navigate([`/site`]);
      }
    },  (error) => {
      if (error.status === 200) {
        this.toastr.success('', this.translateService.instant('translate.emailSent'));
        this.router.navigate([`/site`]);
      } else if ( error.status === 500 ) {
        this.toastr.warning('', this.translateService.instant('translate.fillEveryFieldError'));
      }
    }
    )
  }

  log() {
    console.log('Clicked!');
    this.onSubmit();
  }
}
