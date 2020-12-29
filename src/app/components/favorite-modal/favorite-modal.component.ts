import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/@core/services/user.service';

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrls: ['./favorite-modal.component.scss'],
})
export class FavoriteModalComponent implements OnInit {
  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter();
  favorites: any = [];
  emptyInput: string | undefined;
  list = true;
  subscriptionFavorite: any;

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit() {
    this.userService.getFavourites().subscribe((fav) => {
      (this.favorites = fav), (this.list = false);
    });
    console.log(this.favorites);
  }

  closeModal(): void {
    this.close.emit();
  }

  create(favoriteList: string): void {
    this.emptyInput = '';
    const favorite = {
      favouriteName: favoriteList,
    };
    this.list = false;
    // this.userService.createFavorite(favorite).subscribe((x) => {
    //   this.userService.getFavourites().subscribe((fav) => {
    //     (this.favorites = fav) (this.list = false);
    //   });
    //   console.log('aaa' + this.favorites.id);
    //   console.log(x);
    // });
    // this.route.navigate(['/favorite']);
  }
}
