import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdsService } from '../../@core/services/ads.service';
import { UserService } from '../../@core/services/user.service';
import { Ads } from '../../shared/models/ads.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ads-additional-filters',
  templateUrl: './ads-additional-filters.component.html',
  styleUrls: ['./ads-additional-filters.component.scss'],
})
export class AdsAdditionalFiltersComponent implements OnInit {
  mostWanted$: Observable<Ads[]>;
  unusedAds$: Observable<Ads[]>;
  pageNumber: number = 1;
  buttonHide = false;
  url: string | undefined;
  most: boolean;
  unused: boolean;
  constructor(
    private adsService: AdsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.url = this.router.url;
    if (this.url === '/most-wanted-ads') {
      this.most = true;
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
    } else if (this.url === '/unused-ads') {
      this.unused = true;
      this.unusedAds$ = this.adsService.unusedAds(this.pageNumber);
      this.userService.getUser().subscribe((user) => {
        const userId = user.id;
        this.userService.getFavourites(userId).subscribe((favAds) => {
          this.unusedAds$.subscribe((ads: Ads[]) => {
            console.log(ads);
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
  }

  increaseShow() {
    if (this.url === '/most-wanted-ads') {
      this.pageNumber += 1;
      this.adsService.mostWanted(this.pageNumber).subscribe((response) => {
        if (response.length !== 8) {
          this.buttonHide = true;
        }
        this.mostWanted$.subscribe((ads: Ads[]) =>
          response.forEach((ad: Ads) => ads.push(ad))
        );
      });
    } else if (this.url === '/unused-ads') {
      this.pageNumber += 1;
      this.adsService.unusedAds(this.pageNumber).subscribe((response) => {
        if (response.length !== 8) {
          this.buttonHide = true;
        }
        this.unusedAds$.subscribe((ads: Ads[]) =>
          response.forEach((ad: Ads) => ads.push(ad))
        );
      });
    }
  }
}
