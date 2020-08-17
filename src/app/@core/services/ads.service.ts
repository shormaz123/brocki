import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Ads } from '../../shared/models/ads.model';
import { adsGroup } from '../../shared/models/adsGroup.model';
import { adsSubGroup } from '../../shared/models/adsSubGroup.model';
import { User } from '../../shared/models/user.model';
import { CreateAd } from '../../shared/models/create-ad.model';
import { Comment } from '../../shared/models/createComment.model';
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AdsParam } from '../../shared/models/adParams.model';
import { FilterAds } from '../../shared/models/filterAds.model';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private readonly baseUrl = environment.apiUrlBase;

  constructor(private http: HttpBaseService, private httpClient: HttpClient) {}

  getAllAds(): Observable<Ads[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/brocki/ads`);
  }

  getAdsByParamToFilter(data: FilterAds): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?adsGroupId=${data.adsGroupId}&fixedPrice=${data.fixedPrice}&freeDelivery=${data.freeDelivery}&fromPrice=${data.fromPrice}&hasImage=${data.hasImage}&productWarranty=${data.productWarranty}&region=${data.region}&toPrice=${data.toPrice}&urgentSales=${data.urgentSales}`
    );
  }

  getAdsByGroupId(id: number): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?adsGroupId=${id}`
    );
  }

  getAdsdBySearch(productName: string): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/search?productName=${productName}`
    );
  }

  getAdsBySubGroupParam(adssubgroup: number): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?adssubgroup=${adssubgroup}`
    );
  }

  getAdsByActiveStatus(): Observable<Ads[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/filter?status=ACTIVE`);
  }

  // getAdsByNonActiveStatus() {
  //   return this.http.get(
  //     // `${this.baseUrl}/mybrocki/ads/filter?adssubgroup=${adssubgroup}`
  //   );
  // }

  newAd(ad: CreateAd): Observable<Ads> {
    return this.http.post(`${this.baseUrl}/mybrocki/auth/ads/create`, ad);
  }

  getAllAdsGroups(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/group`);
  }

  getAllAdsSubGroup(id: number): Observable<adsSubGroup[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/group/${id}`);
  }

  uploadAdImage(id: number, file: FormData): Observable<Ads> {
    return this.http.post(`${this.baseUrl}/mybrocki/adsimage/${id}`, file);
  }

  uploadCompanyImage(id: number, file: FormData): Observable<User> {
    return this.http.post(`${this.baseUrl}/mybrocki/companyimage/${id}`, file);
  }

  // Public Controller

  getAdById(id: number): Observable<Ads> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/${id}`);
  }

  getAllByUserId(id: number): Observable<Ads> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/user/${id}`);
  }

  getAllVisibleAds(): Observable<Ads[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/visible`);
  }

  changeStatusOfAds(ads: Ads, id: number): Observable<Ads> {
    let query = new HttpParams();
    query = query.append('status', ads.status);
    return this.http.put<Ads>(
      `${this.baseUrl}/mybrocki/auth/ads/status/${id}`,
      ads
    );
  }

  getSoldAds(data: AdsParam): Observable<Ads> {
    let query = new HttpParams();
    query = query.append('status', data.status);
    query = query.append('userId', data.userId.toString());
    return this.http.get<Ads>(`${this.baseUrl}/mybrocki/ads/filter?${query}`);
  }

  getExpiredAds(): Observable<Ads> {
    return this.http.get<Ads>(`${this.baseUrl}/mybrocki/auth/ads/expired`);
  }

  /**
   * Upload photo
   *
   */
  uploadImageInStorage(formData) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/mybrocki/auth/image/upload`,
      formData
    );
  }

  /**
   * Delete photo
   *
   */
  deleteImage(image: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('image', image.toString());
    return this.httpClient.delete(
      `${this.baseUrl}/mybrocki/auth/image/destroy`,
      { params }
    );
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post(`${this.baseUrl}/mybrocki/comment/create`, comment);
  }

  getCommentByUser(userId: number): Observable<Comment> {
    return this.http.get(`${this.baseUrl}/mybrocki/comment/user/${userId}`);
  }
}
