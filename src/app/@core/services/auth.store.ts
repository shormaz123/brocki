import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map, shareReplay, takeUntil, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthConst } from '../consts/auth.const';
import { UserService } from './user.service';
import { User } from 'app/shared/models/user.model';

const AUTH_DATA = "auth_data";

@Injectable({
    providedIn: 'root'
})
export class AuthStore {

  private userProfile: User = null;


    private subject = new BehaviorSubject<any>(null);
    private userSubject$ = new BehaviorSubject<any>(this.userProfile);

    private destroy$: Subject<void> = new Subject();

    readonly userProfile$: Observable<User> = this.userSubject$.pipe(takeUntil(this.destroy$));

    private user: User = null;

    user$ : Observable<User> = this.subject.asObservable();



    isLoggedIn$ : Observable<boolean>;
    isLoggedOut$ : Observable<boolean>;

    constructor(private http: HttpClient,
                private authService: AuthService,
                private userService: UserService) {

        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));


        if (this.user) {
            this.subject.next((this.user));
        }

    }

    login(email:string, password:string): Observable<any> {
        return this.authService.login(email, password)
            .pipe(
                tap(user => {
                    this.subject.next(user);
                    localStorage.setItem(AuthConst.roleName, user.roleName);
                    localStorage.setItem(AuthConst.token, user.token);
                    this.userService.getUser().subscribe( x => {
                      this.userProfile = x;
                      localStorage.setItem(AuthConst.userId, x.id.toString());
                      this.userSubject$.next(x);
                      console.log(this.userProfile, 'userPRofile')
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
