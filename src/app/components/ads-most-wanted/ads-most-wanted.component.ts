import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdsService } from '../../@core/services/ads.service';
import { UserService } from '../../@core/services/user.service';
import { Ads } from '../../shared/models/ads.model';

@Component({
  selector: 'app-ads-most-wanted',
  templateUrl: './ads-most-wanted.component.html',
  styleUrls: ['./ads-most-wanted.component.scss'],
})
export class AdsMostWantedComponent implements OnInit {
  mostWanted$: Observable<Ads[]>;
  pageNumber: number = 1;
  buttonHide = false;
  constructor(
    private adsService: AdsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.mostWanted$ = this.adsService.mostWanted(this.pageNumber);
    this.userService.getUser().subscribe((user) => {
      const userId = user.id;
      this.userService.getFavourites(userId).subscribe((favAds) => {
        this.mostWanted$.subscribe((ads: Ads[]) => {
          ads.forEach((wanted) => {
            favAds.find((ad: Ads) => {
              if (ad.id === wanted.id) {
                wanted.favourite = true;
              }
            });
          });
        });
      });
    });
  }

  increaseShow() {
    this.pageNumber += 1;
    this.adsService.mostWanted(this.pageNumber).subscribe((response) => {
      if (response.length !== 8) {
        this.buttonHide = true;
      }
      this.mostWanted$.subscribe((ads: Ads[]) =>
        response.forEach((ad: Ads) => ads.push(ad))
      );
    });
  }
}
