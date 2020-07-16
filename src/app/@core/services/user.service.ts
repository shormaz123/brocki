import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpBaseService } from "./http-base.service";
import { User } from "src/app/shared/models/user.model";
import { Observable } from "rxjs";
import { UserFavorite } from '../../shared/models/userFavorite.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly baseUrl = environment.apiUrlBase;

  constructor(private http: HttpBaseService, private httpClient: HttpClient) {}

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/mybrocki/auth/users/updateuser`,
      user
    );
  }

  deleteUser(id: number): Observable<String> {
    return this.http.delete<String>(`${this.baseUrl}/brocki/users/${id}`);
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/mybrocki/user/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/brocki/users`);
  }

  addCredit(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/brocki/users/addcredit`, user);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/mybrocki/auth/user`);
  }

  removeCredit(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/brocki/users/removeCredit`,
      user
    );
  }

  updatePassword(user: User): Observable<any> {
    return this.http.put<User>(`${this.baseUrl}/brocki/users/updateuser`, user);
  }

  updateUserFavourites(userAddAdsRequest: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/mybrocki/auth/users/favourites`, userAddAdsRequest);
  }

  getFavourites(id: number): Observable <any> {
    return this.http.get<any>(`${this.baseUrl}/mybrocki/auth/users/favourites/${id}`);
  }

  deleteUserFavourite(userFavorite: any) {
    return this.http.delete<UserFavorite>(`${this.baseUrl}/mybrocki/auth/users/favourites/delete`, userFavorite);
  }
}
