import { Component, Input, OnChanges } from '@angular/core';
import { Comment } from '../../../shared/models/createComment.model';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  styleUrls: ['./guest-book.component.scss'],
})
export class GuestBookComponent implements OnChanges {
  @Input() guestBook: Array<Comment> = [];
  @Input() comments: boolean;

  constructor() {}

  ngOnChanges() {}
}
