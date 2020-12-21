import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class HelpersService {
  private selectedCategory: any = {
    categoryId: undefined,
  };

  $displaySideBar: Subject<any> = new Subject<any>();
  public $loginName: Subject<any> = new Subject<any>();
  public $createAd: Subject<any> = new Subject<any>();
  public $numOfFavs: Subject<any> = new Subject<any>();
  private numberOfFavorites = new Subject<any>();

  private onAddingCategory: Subject<any> = new Subject();

  private favoriteSubject$ = new BehaviorSubject<any>(null);
  readonly favorite$: Observable<any> = this.favoriteSubject$;

  constructor(private userService: UserService) {}

  private data: any = {
    favoriteList: [],
  };

  displaySideBar(display: boolean) {
    this.$displaySideBar.next(display);
  }

  getDisplaySideBar(): Observable<any> {
    return this.$displaySideBar.asObservable();
  }

  addCategoryId(id: number) {
    this.onAddingCategory.next(id);
    this.selectedCategory.categoryId = id;
  }

  clearCategories() {
    this.onAddingCategory.next();
  }

  getClearedCategores(): Observable<any> {
    return this.onAddingCategory.asObservable();
  }

  getFavorites(favorite: any) {
    this.data.favoriteList.push(favorite);
    this.favoriteSubject$.next(this.data.favoriteList);
  }
}
