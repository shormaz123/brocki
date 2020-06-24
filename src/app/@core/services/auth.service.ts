import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from './http-base.service';
import { AuthResponse } from '../../shared/models/responses/auth.response';
import { Observable } from 'rxjs';
import { AuthConst } from '../consts/auth.const';
import { UserRegistration } from 'src/app/shared/models/userRegistration.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.apiUrlBase;

  constructor(private http: HttpBaseService) { }

  //Login user

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/mybrocki/login`, { email, password });
  }

  //Register user

  register(registration: UserRegistration): Observable<UserRegistration> {
    return this.http.post<UserRegistration>(`${this.baseUrl}/mybrocki/registration`, registration);
  }

  //New password

  resetPassword(email: string, password: string): Observable<String> {
    return this.http.put<String>(`${this.baseUrl}/mybrocki/forgot-password`, { email, password });
  }

  newPassword(oldPassword: string, password:string): Observable <String> {
    return this.http.put<String>(`${this.baseUrl}/mybrocki/auth/users/newpassword`, { oldPassword, password })
  }



  //Logout

  logout() {
    localStorage.removeItem(AuthConst.roleName);
    localStorage.removeItem(AuthConst.token);
  }
}
