import { AuthConst } from '../consts/auth.const';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable()
export class UserStatusGuardService implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userStatus = localStorage.getItem(AuthConst.userStatus)
    if (userStatus === 'APPROVED') {
      if (state.url === '/site') {
        return false;
      }

      return true;
    }

    if (state.url === '/site') {
      return true;
    }

    this.router.navigate(['/site']);

    return false;
  }
}
