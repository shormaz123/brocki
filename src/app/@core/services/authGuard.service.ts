import { AuthConst } from '../../@core/consts/auth.const';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem(AuthConst.token);

    if (token) {
      if (state.url === '/login') {
        return false;
      }
      return true;
    }

    if (state.url === '/login') {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
