import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpBaseService } from './http-base.service';
import { User } from '../../shared/models/user.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserFavorite } from '../../shared/models/userFavorite.model';
import { UserAddAdsRequest } from '../../shared/models/useraddAdsRequest.model';
import { Email } from '../../shared/models/email.model';
import { AuthConst } from '../consts/auth.const';
import {shareReplay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = environment.apiUrlBase;

  constructor(private http: HttpBaseService, private httpClient: HttpClient) {}

  private user = new Subject<any>();

  updateUser(user: User): Observable<User> {
    this.user.next(user);
    return this.http.put<User>(
      `${this.baseUrl}/mybrocki/auth/users/updateuser`,
      user
    );
  }

  getUpdateUser(): Observable<any> {
    return this.user.asObservable();
  }


  deleteUser(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/brocki/users/${id}`);
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

  updateUserFavourites(useraddAdsRequest: UserAddAdsRequest): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/mybrocki/auth/users/favourites`,
      useraddAdsRequest
    );
  }

  /**
   * Get all favorite groups
   *
   */
  getFavourites(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/mybrocki/auth/ads/favouritelist/user`)
      .pipe( map((fav => fav)),
      shareReplay()
      );
  }

  /**
   * Get all ads  from favorite group
   *
   */
  getAdsFromGroup(groupId: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/mybrocki/auth/ads/favouritelist/${groupId}`)
      .pipe( map((fav => fav)),
        shareReplay()
      );
  }

  /**
   *  Create favorite group
   */
  createFavoriteGroup(favorite: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.baseUrl}/mybrocki/auth/ads/favouritelist/create`,
        favorite
      )
      .pipe(shareReplay());
  }

    /**
     *  Add Ad to Favorite group
     */
    addFavoriteAdToGroup(add: any): Observable<any> {
    return this.http
      .put<any>(
        `${this.baseUrl}/mybrocki/auth/users/favourites`,
        add
      )
      .pipe(shareReplay());
  }

  /**
   *
   * Delete Favorite group
   */
deleteFavoriteList(groupId: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/mybrocki/auth/ads/favouritelist/delete/${groupId}`)
    .pipe(shareReplay());
  }

  /**
   *
   * Delete AD from Favorite group
   */
  deleteUserFavourite(adId: number) {
    return this.http.delete<UserFavorite>(
      `${this.baseUrl}/mybrocki/auth/users/favourites/delete?adsId=${adId}`
    );
  }

  /**
   * send email to Brockie Team
   *
   */
  contactUs(email: Email) {
    let params = new HttpParams();
    params = params.append('email', email.email);
    params = params.append('name', email.name);
    params = params.append('subject', email.subject);
    params = params.append('message', email.message);
    return this.httpClient.post<Email>(
      `${this.baseUrl}/mybrocki/contactus`,
      params
    );
  }

  /**
   * send email to Seller
   *
   */
  sendEmailToSeller(email: any) {
    let query = new HttpParams();
    if (email.ad) {
      query = query.append('adId', email.ad.id);
      query = query.append('adlink', email.adlink);
    }
    query = query.append('email', email.email);
    query = query.append('name', email.name);
    query = query.append('phone', email.phone);
    query = query.append('message', email.message);
    query = query.append('emailSeller', email.emailSeller);
    query = query.append('toSender', email.toSender);
    return this.httpClient.post<Email>(
      `${this.baseUrl}/mybrocki/contact/seller`,
      query
    );
  }

  /**
   * Users for acceptions
   *
   */
  UsersForAcceptions(status: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/mybrocki/auth/users/${status}`);
  }

  /**
   * Accept User
   *
   */
  acceptUsers(userStatus: string, userId: number): Observable<any> {
    return this.httpClient.put<User>(
      `${this.baseUrl}/mybrocki/auth/users/updateuser/status/${userId}`,
      { userStatus }
    );
  }

  confirmAccount(token: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/mybrocki/confirm-account?token=${token}`,
      token
    );
  }

  resendVerificationEmail(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('security-token', localStorage.getItem(AuthConst.token));

    return this.http.post(
        `${this.baseUrl}/mybrocki/resendmail`, {headers}
    );
  }
}
