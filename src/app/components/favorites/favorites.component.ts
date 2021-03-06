import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ads } from '../../shared/models/ads.model';
import { WishlistService } from 'app/@core/services/wishlist.service';
import { UserService } from 'app/@core/services/user.service';
import {Observable, Subscription} from 'rxjs';
import { Router} from '@angular/router';
import {HelpersService} from '../../@core/services/helpers.service';
import {LoadingIndicatorService} from '../../@core/loading-indicator.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteGroups$: Observable<any>;
  favoriteList: any = [];
  mode = 0;
  groupName: string | undefined;
  favoriteAds: any;
  adsInGroup: any;
  selectedGroup: any;
  qwerty: any;
  showModal = false;
  clickedAd: Ads;
  list: boolean;
  image?: string | undefined;
  getAllGroups: any;
  firstGroup: any = [];
  groupId: number | undefined;
  loadAds = false;
  numberOfAds: any;
  favoriteSubscription: Subscription;
  pictures: string[] = [];
  picture: string | undefined;

  constructor(
    public wishlist: WishlistService,
    private userService: UserService,
    private route: Router,
    private helperService: HelpersService,
    private loadingService: LoadingIndicatorService,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.favoriteGroups$ = this.userService.getFavourites();
      this.favoriteSubscription = this.favoriteGroups$.pipe(debounceTime(1000)).subscribe(x => {
        this.favoriteList = x;
        this.favoriteList.forEach(group => {
          this.userService.getAdsFromGroup(group.id).subscribe(selectedGroup => {
            this.getAllGroups = selectedGroup;
            this.numberOfAds =  this.getAllGroups.length;

            this.pictures = [...this.pictures];
            this.image = this.getAllGroups[0].image[0];
            this.pictures.push(this.image);
            console.log(this.pictures);
            // const pictureIndex = this.pictures.findIndex(
            //   img =>
            // )
            // console.log('image', this.image);
            // for (const picture of this.pictures) {
            //   this.picture = picture;
            //   console.log(this.picture);
              // if (this.pictures) {
              //   return this.picture;
              // } else {
              //   return undefined;
              // }
            // }

          });
        });
      });
    } , 500 );
    this.getUserAndFavAd();
    this.getFavoriteInGroup();
  }

  getUserAndFavAd() {
    this.wishlist.ads$.subscribe((x) => {
      this.favoriteAds = x;
    });
  }

  getFavoriteInGroup() {
    this.wishlist.favoriteInGroup$.subscribe((ads) => {
      this.adsInGroup = ads;
      console.log(this.adsInGroup);
      // if (this.adsInGroup) {
      //   this.picture = this.adsInGroup[0].image[0];
      // }
    });
  }

  getPicture(picture: string): void {
    console.log('PICTURE' , picture);
  }

  openFavoriteGroup(group: any): void {
    this.selectedGroup = group;
    this.loadAds = false;
    if (group) {
      this.loadingService.loadingOn();
      this.mode = 1;
      this.groupName = group.favouriteName;
      this.userService.getAdsFromGroup(group.id).subscribe(
        ads => {
          this.adsInGroup = ads;
          this.loadingService.loadingOff();
          this.loadAds = true;
        }
      );
    }
  }

  createGroup(event: any): void {
    const favorite = {
      favouriteName: event,
    };

    this.userService.createFavoriteGroup(favorite).subscribe(
      group => {
        this.favoriteList.push(group);
        this.wishlist.load();
      });
    this.route.navigate(['/favorite']);
  }

  deleteGroup(group: any): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: this.translateService.instant(
          'translate.deleteFavoriteGroup'
        ),
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteFavoriteList(group.id).subscribe(() => {
          const deletedGroup = this.favoriteList.findIndex(
            (removeGroup) =>  removeGroup.id === group.id
          );
          if (deletedGroup !== -1) {
            this.favoriteList.splice(deletedGroup, 1);
            this.wishlist.load();
          }
        });
      }
    });
  }

  backToFavoriteGroups(): void {
    this.mode = 0;
  }

  closeModal(): void {
    this.showModal = false;
  }

  openModal(): void {
    this.showModal = true;
    this.list = true;
  }

  // getImage(group: any) {
  // this.userService.getAdsFromGroup(group.id).subscribe(selectedGroup => {
  //   this.getAllGroups = selectedGroup;
  //   this.image = this.getAllGroups[0].image[0];
  //   if (this.image) {
  //         return this.image;
  //       } else {
  //         return undefined;
  //       }
  // });
  //   this.userService.getAdsFromGroup(group.id).subscribe(selectedGroup => {
  //     this.getAllGroups = selectedGroup;
  //     selectedGroup.forEach( favoriteGroup => {
  //       this.firstGroup.push(favoriteGroup);
  //       console.log(this.firstGroup);
  //     });
  //     this.image = this.firstGroup[0].image[0];
  //   });
  //   if (this.image) {
  //     return this.image;
  //   } else {
  //     return undefined;
  //   }
  // }

  // getNumberOfAds(group: any) {
  //   // @ts-ignore
  //   this.favoriteSubscription = this.userService.getAdsFromGroup(group.id).pipe(take(1), debounceTime(1000), shareReplay()).subscribe(
  //   fav => {
  //     this.numberOfAds = fav.length;
  //     if (this.numberOfAds ) {
  //       return this.numberOfAds;
  //     } else {
  //       return 0;
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    this.favoriteSubscription.unsubscribe();
  }
}
