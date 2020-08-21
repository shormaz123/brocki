import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConst } from '../../@core/consts/auth.const';

export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem(AuthConst.token)}`,
        'Accept-Language': `${localStorage.getItem(AuthConst.language)}`
      },
    });

    return next.handle(request);
  }
}
