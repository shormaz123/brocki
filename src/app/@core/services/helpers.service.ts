import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({ providedIn: "root" })
export class HelpersService {
  public $loginName: Subject<any> = new Subject<any>();
  public $createAd: Subject<any> = new Subject<any>();

  constructor() {}
}
