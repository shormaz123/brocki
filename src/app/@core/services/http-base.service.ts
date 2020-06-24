import { Injectable } from "@angular/core";
import { throwError, Observable } from "rxjs";
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { AuthConst } from "../consts/auth.const";

@Injectable({ providedIn: "root" })
export class HttpBaseService {


  // TODO Get rid of the Http and use HttpClient instead
  constructor(
    private http: HttpClient
  ) { }

  delete<T>(url: string, options?: RequestOptions): Observable<T> {
    options = this.setOptionHeaders(options);
    return this.http.delete<T>(url, options).pipe(catchError(this.handleError));
  }

  get<T>(url: string, options?: RequestOptions): Observable<T> {
    options = this.setOptionHeaders(options);
    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  post<T>(url: string, data: any, options?: RequestOptions): Observable<T> {
    options = this.setOptionHeaders(options);
    return this.http
      .post<T>(url, data, options)
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, data: any, options?: RequestOptions): Observable<T> {
    options = this.setOptionHeaders(options);
    return this.http
      .put<T>(url, data, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status >= 500 && error.status <= 511) {
        // this.toastController
        //   .create(this.toastMessageConfig)
        //   .then(_ => _.present());
      }

      if (error.status === 0) {
        // this.toastController
        //   .create(this.toastMessageConfig)
        //   .then(_ => _.present());
      }

      if (error.status === 401) {
        localStorage.removeItem(AuthConst.token);
        window.location.reload();
      }
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }

  private setOptionHeaders(options: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    options.headers.append("Content-Type", "application/json");
    options.headers.append("Cache-Control", "no-cache");
    options.headers.append("Pragma", "no-cache");
    options.headers.append("Expires", "Sat, 01 Dec 2001 00:00:00 GMT");

    return options;
  }
}

export class RequestOptions {
  headers = new HttpHeaders();
  params: {
    [param: string]: string | string[];
  };
  responseType = "json" as "json";
  body = {};
}
