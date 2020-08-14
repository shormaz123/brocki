import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../@core/services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService
  ) {}
  ngOnInit() {
    this.contactForm = this.fb.group({
      name: [''],
      email: [''],
      subject: [''],
      message: [''],
    });

    this.userService.getUser().subscribe((res) => {
      this.userId = res.id;
    });
  }

  onSubmit() {
    class sendEmail {
      name: string;
      email: string;
      subject: string;
      message: string;
    }
    const email = new sendEmail();
    email.name = this.contactForm.value.name;
    email.email = this.contactForm.value.email;
    email.subject = this.contactForm.value.subject;
    email.message = this.contactForm.value.message;
    this.notification.success('', 'An email has been sent');
    this.router.navigate([`/user/${this.userId}`]);
    this.userService.contactUs(email).subscribe();
  }
}
