import { Injectable, OnDestroy } from '@angular/core';
import { Ads } from 'app/shared/models/ads.model';
import {
  BehaviorSubject,
  Observable,
  Subject,
  timer,
} from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthConst } from '../consts/auth.const';
import { UserService } from './user.service';

interface WishlistData {
  favoriteAds: Ads[];
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService implements OnDestroy {


  constructor( private userService: UserService) {

  }
  private data: WishlistData = {
    favoriteAds: [],
  };

token;
userFavoriteAds;
private destroy$: Subject<void> = new Subject();
private onAddingSubject$: Subject<Ads> = new Subject();
private adsSubject$: BehaviorSubject<Ads[]> = new BehaviorSubject(this.data.favoriteAds);


    readonly ads$: Observable<Ads[]> = this.adsSubject$.pipe(takeUntil(this.destroy$));
    readonly count$: Observable<number> = this.adsSubject$.pipe(map(ads => ads.length));
    readonly onAdding$: Observable<Ads> = this.onAddingSubject$.asObservable();


  add(ad: Ads): Observable<void> {

    // timer only for demo
    return timer(0).pipe(map(() => {
        this.onAddingSubject$.next(ad);

        const index = this.data.favoriteAds.findIndex(item => item.id === ad.id);
        if (index === -1) {
            this.data.favoriteAds.push(ad);
            this.save();
        }
    }));
}


private save(): void {
  this.adsSubject$.next(this.data.favoriteAds);
}

 load(): void {
  this.token = localStorage.getItem(AuthConst.token);
  if (this.token) {
      this.userService
      .getFavourites(Number(localStorage.getItem('brocki_id')))
      .subscribe( x => {
        this.data.favoriteAds = x;
        this.save();
      });
    }
}

remove(ad: Ads): Observable<void> {
  // timer only for demo
  return timer(0).pipe(map(() => {
      const index = this.data.favoriteAds.findIndex(item => item.id === ad.id);

      if (index !== -1) {
          this.data.favoriteAds.splice(index, 1);
          this.save();
      }
  }));
}


ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
  }
}
