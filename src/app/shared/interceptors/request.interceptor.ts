import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConst } from '../../@core/consts/auth.const';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'app/@core/services/auth.store';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(public auth: AuthStore, private route: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem(AuthConst.token)}`,
        'Accept-Language': `${localStorage.getItem(AuthConst.language)}`,
      },
    });

    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 500) {
              this.auth.logout();
              this.route.navigate(['/login']);
            }
          }
        }
      )
    );
  }
}
