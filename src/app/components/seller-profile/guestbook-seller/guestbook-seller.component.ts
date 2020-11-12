import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../@core/services/user.service';
import { AdsService } from '../../../@core/services/ads.service';
import { AuthService } from '.././../../@core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../../shared/models/createComment.model';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guestbook-seller',
  templateUrl: './guestbook-seller.component.html',
  styleUrls: ['./guestbook-seller.component.scss'],
})
export class GuestbookSellerComponent implements OnInit {
  @Output() readonly guestBook = new EventEmitter();
  @Input() CommentsOfUser: Comment;
  ratingForm: FormGroup;
  sellerId: number;
  userWhoComments: number;
  nameOfCommentator: string;
  isSignedIn: boolean;
  isLogin: boolean;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private adsService: AdsService,
    private authService: AuthService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.sellerId = params.id;
    });
    this.ratingForm = this.fb.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required, Validators.maxLength(600)]],
    });

    this.isSignedIn = this.authService.isSignedIn();
    if (this.isSignedIn) {
      this.isLogin = true;
    }

    this.userId = this.authService.getUserId();

    this.userWhoComments = Number(localStorage.getItem('brocki_id'));
    this.userService.getUserById(this.userWhoComments).subscribe((seller) => {
      this.nameOfCommentator = seller.userName;
    });
  }

  onSubmit(): void {
    const comment = new Comment();
    if (this.ratingForm.value.rating === '') {
      this.modal.error({
        nzTitle: this.translateService.instant('translate.rateTheSeller'),
      });
      return;
    } else {
      comment.rate = this.ratingForm.value.rating;
    }
    if (this.ratingForm.value.comment === '') {
      this.modal.error({
        nzTitle: this.translateService.instant('translate.leaveComment'),
      });
      return;
    } else {
      comment.comments = this.ratingForm.value.comment;
    }
    comment.userId = this.sellerId;
    comment.authorName = this.nameOfCommentator;
    this.modal.confirm({
      nzTitle: this.translateService.instant('translate.postComment'),
      nzContent: '',
      nzOnOk: () => {
        this.adsService.createComment(comment).subscribe(() => {
          this.notification.success(
            '',
            this.translateService.instant('translate.successfullyPostedComment')
          );
          this.guestBook.emit();
        });
        // this.router.navigate(['/site']);
      },
    });
  }
}
