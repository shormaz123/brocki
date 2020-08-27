import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class HelpersService {
  $displaySideBar: Subject<any> = new Subject<any>();
  public $loginName: Subject<any> = new Subject<any>();
  public $createAd: Subject<any> = new Subject<any>();
  public $numOfFavs: Subject<any> = new Subject<any>();

  constructor(private userService: UserService) {}

  displaySideBar(display: boolean) {
    this.$displaySideBar.next(display);
  }

  getDisplaySideBar(): Observable<any> {
    return this.$displaySideBar.asObservable();
  }
}
