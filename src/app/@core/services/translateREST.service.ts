import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HttpBaseService} from './http-base.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateServiceRest {

  private choosenLanguage = {
    lang: ''
  };


  constructor(private http: HttpBaseService, private httpClient: HttpClient) {
  }


  private readonly baseUrl = environment.apiUrlBase;
  private language = new Subject<any>();

  /**
   * setLanguage
   *
   */
  setLanguage(lan: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/mybrocki/language?lang=${lan}`, null);
  }

  sendLanguage(message: string) {
    this.language.next(message);
    if (localStorage) {
      localStorage['language'] = message;
    }
  }

  getLanguage(): Observable<any> {
    return this.language.asObservable();
  }

  getChoosenLanguage() {
    if (localStorage) {
      return localStorage['language'] || '';
    } else {
      return '';
    }
  }


}
