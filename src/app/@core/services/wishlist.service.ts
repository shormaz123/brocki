import { Injectable, OnDestroy } from '@angular/core';
import { Ads } from 'app/shared/models/ads.model';
import { BehaviorSubject, Observable, Subject, throwError, timer } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { AuthConst } from '../consts/auth.const';
import { UserService } from './user.service';

interface WishlistData {
  favoriteAds: Ads[];
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService implements OnDestroy {
  private data: WishlistData = {
    favoriteAds: []
};


private destroy$: Subject<void> = new Subject();
private onAddingSubject$: Subject<Ads> = new Subject();
private adsSubject$: BehaviorSubject<Ads[]> = new BehaviorSubject([]);


    readonly ads$: Observable<Ads[]> = this.adsSubject$.pipe(takeUntil(this.destroy$));
    readonly count$: Observable<number> = this.adsSubject$.pipe(map(ads => ads.length));
    readonly onAdding$: Observable<Ads> = this.onAddingSubject$.asObservable();


  constructor( private userService: UserService) {
     // tslint:disable-next-line: no-unused-expression
    // this.loadAllFavoriteAds();


  }

  add(ad: Ads): Observable<void> {

    // timer only for demo
    return timer(200).pipe(map(() => {
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

private load(): void {
  const items = localStorage.getItem('wishlistItems');

  if (items) {
      this.data.favoriteAds = JSON.parse(items);
      this.adsSubject$.next(this.data.favoriteAds);
  }
}

remove(ad: Ads): Observable<void> {
  // timer only for demo
  return timer(1000).pipe(map(() => {
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

// loadAllFavoriteAds() {
//   const token = localStorage.getItem(AuthConst.token);
//   if (token) {
//    const loadUserCourses = this.userService.getFavourites(11).subscribe(
//        ads => {
//          this.data.favoriteAds = ads,
//           this.adsSubject$.next(this.data.favoriteAds);
//          console.log(this.data.favoriteAds, 'Users ads');
//        }
//    );
//   }
// }

}
