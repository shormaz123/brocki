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
    return this.http.get(`${this.baseUrl}/mybrocki/auth/ads`);
  }


  getAdsByParamToFilter(data: any) {
    let params = new HttpParams();

    params = params.append('status', 'ACTIVE'.toString());

    if (data.region) {
      params = params.append('region', data.region.toString());
    }

    if (data.adsGroupId) {
      params = params.append('adsGroupId', data.adsGroupId.toString());
    }

    if (data.subCategory) {
      params = params.append('adssubgroup', data.subCategory.toString());
    }

    if (data.fromPrice) {
      params = params.append('fromPrice', data.fromPrice.toString());
    }

    if (data.toPrice) {
      params = params.append('toPrice', data.toPrice.toString());
    }

    if (data.fixedPrice) {
      params = params.append('fixedPrice', data.fixedPrice.toString());
    }

    if (data.freeDelivery) {
      params = params.append('freeDelivery', data.freeDelivery.toString());
    }

    if (data.productWarranty) {
      params = params.append(
        'productWarranty',
        data.productWarranty.toString()
      );
    }

    if (data.urgentSales) {
      params = params.append('urgentSales', data.urgentSales.toString());
    }

    params = params.append('pageNumber', data.pageNumber.toString());
    params = params.append('pageSize', data.pageSize.toString());

    return this.httpClient.get(`${this.baseUrl}/mybrocki/ads/filter`, {
      params,
    });
  }

  getAdsByPagination(page: number): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?pageNumber=${page}&status=ACTIVE&pageSize=16`
    );
  }

  getAdsByGroupId(id: number, page: number): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?adsGroupId=${id}&pageNumber=${page}&status=ACTIVE&pageSize=16`
    );
  }

  getSoldAdsPagination(
    id: number,
    page: number,
    status: string,
    pageSize: number
  ): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?userId=${id}&pageNumber=${page}&status=${status}&pageSize=${pageSize}`
    );
  }

  getAdsdBySearch(productName: string, pageNumber: number): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/search?productName=${productName}&status=ACTIVE&pageSize=16&pageNumber=${pageNumber}`
    );
  }

  getAdsBySubGroupParam(adssubgroup: number, page: number): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?adssubgroup=${adssubgroup}&pageNumber=${page}&status=ACTIVE&pageSize=3`
    );
  }

  filterCategoryTags(tags: Array<number>, pageNumber: number, adsGroupId: number): Observable<Ads[]> {
   return this.http.get(
     `${this.baseUrl}/mybrocki/ads/filter?tag=${tags}&pageNumber=${pageNumber}&status=ACTIVE&pageSize=3&adsGroupId=${adsGroupId}`);
  }

  filterSubCategoryTags(tags: Array<number>, pageNumber: number, subGroupId: number): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?tag=${tags}&pageNumber=${pageNumber}&status=ACTIVE&pageSize=3&adssubgroup=${subGroupId}`);
   }

  getAdsByActiveStatus(): Observable<Ads[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/filter?status=ACTIVE`);
  }



  newAd(ad: CreateAd): Observable<Ads> {
    return this.http.post(`${this.baseUrl}/mybrocki/auth/ads/create`, ad);
  }

  getAllAdsGroups(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/group`);
  }

  getAllAdsSubGroup(id: number): Observable<adsSubGroup[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/group/${id}`);
  }

  getSubBySubGroupId(id: number): Observable<adsSubGroup[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/group/${id}`);
  }

  uploadAdImage(id: number, file: FormData): Observable<Ads> {
    return this.http.post(`${this.baseUrl}/mybrocki/adsimage/${id}`, file);
  }

  uploadCompanyImage(id: number, file: FormData): Observable<User> {
    return this.http.post(`${this.baseUrl}/mybrocki/companyimage/${id}`, file);
  }

  // Public Controller

  getAllTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mybrocki/tags`);
  }

  getAdById(id: number): Observable<Ads> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/${id}`);
  }

  getAllByUserId(id: number): Observable<Ads> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/user/${id}`);
  }

  getAllVisibleAds(): Observable<Ads[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/auth/ads/visible`);
  }

  /**
   * change status of Ads
   *
   */
  changeStatusOfAds(ads: Ads, id: number): Observable<Ads> {
    let query = new HttpParams();
    query = query.append('status', ads.status);
    return this.http.put<Ads>(
      `${this.baseUrl}/mybrocki/auth/ads/status/${id}`,
      ads
    );
  }

  /**
   * Sold Ads
   *
   */
  getSoldAds(data: AdsParam): Observable<Ads> {
    let query = new HttpParams();
    query = query.append('status', data.status);
    query = query.append('userId', data.userId.toString());
    query = query.append('pageNumber', data.pageNumber.toString());
    query = query.append('pageSize', data.pageSize.toString());
    return this.http.get<Ads>(`${this.baseUrl}/mybrocki/ads/filter?${query}`);
  }

  /**
   * Expired Ads
   *
   */
  getExpiredAds(): Observable<Ads> {
    return this.http.get<Ads>(`${this.baseUrl}/mybrocki/auth/ads/expired`);
  }

  /**
   * Ads for review
   *
   */
  readyForReviewAds(): Observable<Ads> {
    return this.http.get<Ads>(
      `${this.baseUrl}/mybrocki/auth/ads/readyforreview`
    );
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

  /**
   * Create a new comment
   *
   */
  createComment(comment: Comment): Observable<Comment> {
    return this.http.post(`${this.baseUrl}/mybrocki/comment/create`, comment);
  }

  /**
   * Get comments of user
   *
   */
  getCommentByUser(userId: number): Observable<Comment> {
    return this.http.get(`${this.baseUrl}/mybrocki/comment/user/${userId}`);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/mybrocki/group/${id}`);
  }

  getSubCategoryById(id: number, ): Observable<any> {
    return this.http.get(`${this.baseUrl}/mybrocki/subgroup/${id}`);
  }
}
