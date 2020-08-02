import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ads } from 'src/app/shared/models/ads.model';
import { UserService } from './user.service';


@Injectable({ providedIn: "root" })
export class HelpersService {
  public $loginName: Subject<any> = new Subject<any>();
  public $createAd: Subject<any> = new Subject<any>();
  public $numOfFavs: Subject<any> = new Subject<any>();






  constructor(private userService: UserService) {}





}

