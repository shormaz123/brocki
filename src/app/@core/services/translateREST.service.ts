import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from './http-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateServiceRest {

  constructor(private http: HttpBaseService, private httpClient: HttpClient) {}

  private readonly baseUrl = environment.apiUrlBase;


  setLanguage(lan: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/mybrocki/language?lang=${lan}`, lan
    );
  }

}
