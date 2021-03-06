import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from './http-base.service';
import { Observable, Subject } from 'rxjs';
import { AuthConst } from '../consts/auth.const';

@Injectable({
  providedIn: 'root',
})
export class TranslateServiceRest {
   defaultLanguage ;

  constructor(private http: HttpBaseService, private httpClient: HttpClient) {

      if (localStorage.getItem(AuthConst.language)) {
        this.defaultLanguage = localStorage.getItem(AuthConst.language)
        localStorage.setItem(AuthConst.language, this.defaultLanguage);
      } else {
        this.defaultLanguage = 'de';
        localStorage.setItem(AuthConst.language, this.defaultLanguage);
      }
  }

  private language = new Subject<any>();

  /**
   * setLanguage
   *
   */

  sendLanguage(message: string) {
    localStorage.setItem(AuthConst.language, message);
    this.language.next(message);
    if (localStorage) {
      localStorage.language = message;
    }
  }

  getLanguage(): Observable<any> {
    return this.language.asObservable();
  }

  getChoosenLanguage() {
    if (localStorage) {
      return localStorage.language || '';
    } else {
      return '';
    }
  }
}
