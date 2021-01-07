import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Ads} from '../../shared/models/ads.model';
import {UserService} from '../../@core/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrls: ['./favorite-modal.component.scss'],
})
export class FavoriteModalComponent implements OnInit {
  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter();
  @Output() createGroup = new EventEmitter();
  @Output() addToGroup = new EventEmitter();
  @Output() closeFavoriteListModal = new EventEmitter();
  @Input() favoriteList;
  @Input()  listFromFavorite;
  favorites: any = [];
  emptyInput: string | undefined;
  list = true;
  heart: string | undefined;
  selectedGroup = false;
  ad: Ads;
  hideModal: boolean;
  image?: string | undefined;
  getAllGroups: any;
  firstGroup: any = [];
  favHeart = false;


  constructor(private userService: UserService, private toastr: ToastrService, private translateService: TranslateService) {}

  ngOnInit() {
    if (this.favoriteList.length > 0) {
      this.favorites = this.favoriteList;
      (this.list = false);
    } else {
      this.list = true;
    }

    if (this.listFromFavorite) {
      (this.list = true);
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  create(favoriteList: string): void {
    this.emptyInput = '';
    if (favoriteList) {
      this.createGroup.emit(favoriteList);
      this.close.emit();
    } else {
      this.toastr.warning(
        this.translateService.instant('translate.emptyField')
      );
    }

  }

  add(): void {
  this.addToGroup.emit(this.ad);
  this.emptyInput = '';
  }

  getFavoriteGroup(group: any): void {
    this.emptyInput = group.favouriteName;
  }

  heartToggle(favorite: any): void {
    const selected = favorite;

    if (!this.heart) {
      this.favHeart = false;
    }

    if (this.heart === selected.id) {
      this.heart = undefined;
      this.emptyInput = '';
      this.selectedGroup = false;
      this.favHeart = true;
    }

    if (selected  && !this.favHeart) {
      this.heart = selected.id;
      this.emptyInput = selected.favouriteName;
      this.selectedGroup = true;
      this.ad = selected.id;
    }
  }

  getImage(group: any) {
    this.userService.getAdsFromGroup(group.id).subscribe(selectedGroup => {
      this.getAllGroups = selectedGroup;
      selectedGroup.forEach( favoriteGroup => {
        this.firstGroup.push(favoriteGroup);
      });
      this.image = this.firstGroup[0].image[0];
    });
    return !!this.image;
  }
}
