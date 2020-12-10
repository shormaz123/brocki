import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthConst } from '../consts/auth.const';
import { UserService } from './user.service';
import { User } from 'app/shared/models/user.model';
import { WishlistService } from './wishlist.service';
import { UserRegistration } from 'app/shared/models/userRegistration.model';

const AUTH_DATA = 'auth_data';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private userProfile: User = null;
  private user: User = null;

  private subject = new BehaviorSubject<any>(null);
  private userSubject$ = new BehaviorSubject<any>(this.userProfile);

  private destroy$: Subject<void> = new Subject();

  readonly userProfile$: Observable<User> = this.userSubject$.pipe(
    takeUntil(this.destroy$)
  );

  user$: Observable<User> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private wishlist: WishlistService
  ) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    const user = localStorage.getItem('brocki_id');

    if (user) {
      this.subject.next(JSON.parse(user));
    }

    const userToken = localStorage.getItem(AuthConst.token);

    if (userToken) {
      this.userSubject$.next(this.userProfile);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.authService.login(email, password).pipe(
      tap((user) => {
        this.subject.next(user);
        localStorage.setItem(AuthConst.roleName, user.roleName);
        localStorage.setItem(AuthConst.token, user.token);
        this.userService.getUser().subscribe((x) => {
          this.userProfile = x;
          localStorage.setItem(AuthConst.userId, x.id.toString());
          this.userSubject$.next(x);
          this.wishlist.load();
        });
      }),
      shareReplay()
    );
  }

  loginAfterRegistration(registration: any): Observable<any> {
    return this.authService.register(registration).pipe(
      tap((response) => {
        this.subject.next(response);
        localStorage.setItem(AuthConst.roleName, response.roleName);
        localStorage.setItem(AuthConst.token, response.token);
        this.userService.getUser().subscribe((x) => {
          this.userProfile = x;
          localStorage.setItem(AuthConst.userId, x.id.toString());
          this.userSubject$.next(x);
          this.wishlist.load();
        });
      }),
      shareReplay()
    );
  }

  logout() {
    this.subject.next(null);
    this.userSubject$.next(null);
    localStorage.removeItem(AuthConst.roleName);
    localStorage.removeItem(AuthConst.token);
    localStorage.removeItem(AuthConst.userId);
  }
}
