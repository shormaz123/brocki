import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/@core/services/user.service';
import { Ads } from 'src/app/shared/models/ads.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteAds: Ads[];

  constructor(private userService: UserService) {

   }

  ngOnInit() {
  }

}
