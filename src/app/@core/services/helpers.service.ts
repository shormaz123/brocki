import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class HelpersService {

  private selectedCategory: any = {
    categoryId: undefined
};


  $displaySideBar: Subject<any> = new Subject<any>();
  public $loginName: Subject<any> = new Subject<any>();
  public $createAd: Subject<any> = new Subject<any>();
  public $numOfFavs: Subject<any> = new Subject<any>();
  private numberOfFavorites = new Subject<any>();

  private onAddingCategory: Subject<any> = new Subject();

  constructor(private userService: UserService) {}

  displaySideBar(display: boolean) {
    this.$displaySideBar.next(display);
  }

  getDisplaySideBar(): Observable<any> {
    return this.$displaySideBar.asObservable();
  }

  sendNumberOfFavorites(number: number) {
    this.numberOfFavorites.next(number);
}

getNumberOfFavorites(): Observable<any> {
       return this.numberOfFavorites.asObservable();
}

addCategoryId(id: number) {
  this.onAddingCategory.next(id)
  this.selectedCategory.categoryId = id;
}

clearCategories() {
this.onAddingCategory.next();
}

getClearedCategores(): Observable<any> {
  return this.onAddingCategory.asObservable();
}




}
