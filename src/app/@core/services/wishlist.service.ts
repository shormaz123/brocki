import { Injectable, OnDestroy } from '@angular/core';
import { Ads } from 'app/shared/models/ads.model';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthConst } from '../consts/auth.const';
import { UserService } from './user.service';

interface WishlistData {
  favoriteAds: any;
}

interface WishlistGroupData {
  favoriteGroup: any;
}

// tslint:disable-next-line:class-name
interface adsFromGroup {
  ads: any;
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService implements OnDestroy {
  constructor(private userService: UserService) {}
  private data: WishlistData = {
    favoriteAds: [],
  };

  private group: WishlistGroupData = {
    favoriteGroup: [],
  };

  private favorite: adsFromGroup = {
    ads: [],
  };

  token;
  userFavoriteAds;
  private destroy$: Subject<void> = new Subject();
  private onAddingSubject$: Subject<Ads> = new Subject();
  private adsSubject$: BehaviorSubject<Ads[]> = new BehaviorSubject(
    this.data.favoriteAds
  );

  private groupSubject$: BehaviorSubject<Ads[]> = new BehaviorSubject(
    this.group.favoriteGroup
  );

  private adsInGroupSubject$: BehaviorSubject<Ads[]> = new BehaviorSubject(
    this.favorite.ads
  );

  readonly ads$: Observable<Ads[]> = this.adsSubject$.pipe(
    takeUntil(this.destroy$)
  );
  readonly count$: Observable<number> = this.groupSubject$.pipe(
    map((ads) => ads.length)
  );
  readonly favoriteInGroup$: Observable<Ads[]> = this.adsInGroupSubject$.pipe(
    takeUntil(this.destroy$)
  );

  readonly onAdding$: Observable<Ads> = this.onAddingSubject$.asObservable();

  add(ad: Ads): Observable<void> {
    // timer only for demo
    return timer(0).pipe(
      map(() => {
        this.onAddingSubject$.next(ad);

        const index = this.data.favoriteAds.findIndex(
          (item) => item.id === ad.id
        );
        if (index === -1) {
          this.data.favoriteAds.push(ad);
          this.save();
        }
      })
    );
  }

  private save(): void {
    this.adsSubject$.next(this.data.favoriteAds);
  }

  private saveGroup(): void {
    this.groupSubject$.next(this.group.favoriteGroup);
  }

  private saveAdsInGroup(): void {
    this.adsInGroupSubject$.next(this.favorite.ads);
  }

  load(): void {
    this.token = localStorage.getItem(AuthConst.token);
    if (this.token) {
      this.userService.getFavourites().subscribe(
        group => {
          this.group.favoriteGroup = group;
          this.group.favoriteGroup.forEach(
            groupId => {
              this.userService.getAdsFromGroup(groupId.id).subscribe((ads) => {
                this.data.favoriteAds = [...this.data.favoriteAds];
                this.data.favoriteAds.push(ads);
                this.data.favoriteAds = this.data.favoriteAds.flat(1);
                this.save();
              });
            });
          this.saveGroup();
        }
      );
    }
  }


  // @ts-ignore
  remove(ad: Ads, groupId?: number): Observable<void> {
    // timer only for demo
    return timer(0).pipe(
      map(() => {
        const index = this.data.favoriteAds.findIndex(
         (item) =>   item.id === ad.id
        );

        if (index === -1) {
        } else {
          this.data.favoriteAds.splice(index, 1);
          this.save();
        }

        if (groupId) {
          this.userService.getAdsFromGroup(groupId).subscribe((group) => {
            this.favorite.ads = group;
            const adsIndex = this.favorite.ads.findIndex(
              (ads) => ads.id === ad.id
            );

            if (adsIndex !== -1) {
              this.favorite.ads.splice(adsIndex, 1);
              this.saveAdsInGroup();
            }
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
