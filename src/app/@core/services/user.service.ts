import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpBaseService } from './http-base.service';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.apiUrlBase;

  constructor(private http: HttpBaseService) { }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/mybrocki/auth/users/updateuser`, user);
  }

  deleteUser(id: number): Observable<String> {
    return this.http.delete<String>(`${this.baseUrl}/brocki/users/${id}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/mybrocki/auth/user/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/brocki/users`);
  }

  addCredit(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/brocki/users/addcredit`, user);

  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/mybrocki/auth/user`)
  }

  removeCredit(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/brocki/users/removeCredit`, user);
  }

  updatePassword(user: User): Observable<any> {
    return this.http.put<User>(`${this.baseUrl}/brocki/users/updateuser`, user);
  }

}
