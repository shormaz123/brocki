import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Ads } from '../../shared/models/ads.model';
import { adsSubGroup } from '../../shared/models/adsSubGroup.model';
import { User } from '../../shared/models/user.model';
import { CreateAd } from '../../shared/models/create-ad.model';
import { Comment } from '../../shared/models/createComment.model';
import { Tags } from '../../shared/models/tags.model';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
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

  getAdsByParamToFilter(data: FilterAds) {
    let params = new HttpParams();

    params = params.append('status', 'ACTIVE'.toString());

    if (data.location) {
      params = params.append('location', data.location.toString());
    }

    if (data.adsGroupId) {
      params = params.append('adsGroupId', data.adsGroupId.toString());
    }

    if (data.subCategory) {
      params = params.append('adssubgroup', data.subCategory.toString());
    }

    if (data.toPrice) {
      params = params.append('toPrice', data.toPrice.toString());
    }

    params = params.append('fromPrice', data.fromPrice.toString());
    params = params.append('pageNumber', data.pageNumber.toString());
    params = params.append('pageSize', data.pageSize.toString());

    return this.httpClient.get(`${this.baseUrl}/mybrocki/ads/filter`, {
      params,
    });
  }

  getAdsByPagination(page: number): Observable<Ads[]> {
    return this.http
      .get<Ads[]>(
        `${this.baseUrl}/mybrocki/ads/filter?pageNumber=${page}&status=ACTIVE&pageSize=16`
      )
      .pipe(
        map((ads) => ads),
        shareReplay()
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
      `${this.baseUrl}/mybrocki/ads/filter?searchTerm=${productName}&status=ACTIVE&pageSize=12&pageNumber=${pageNumber}`
    );
  }

  getAdsBySubGroupParam(adssubgroup: number, page: number): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?adssubgroup=${adssubgroup}&pageNumber=${page}&status=ACTIVE&pageSize=16`
    );
  }

  filterCategoryTags(
    tags: Array<number>,
    pageNumber: number,
    adsGroupId: number
  ): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?tag=${tags}&pageNumber=${pageNumber}&status=ACTIVE&pageSize=3&adsGroupId=${adsGroupId}`
    );
  }

  filterSubCategoryTags(
    tags: Array<number>,
    pageNumber: number,
    subGroupId: number
  ): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?tag=${tags}&pageNumber=${pageNumber}&status=ACTIVE&pageSize=3&adssubgroup=${subGroupId}`
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
   * Get all Tags
   *
   */
  getAllTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${this.baseUrl}/mybrocki/tags`).pipe(
      map((res) => res),
      shareReplay()
    );
  }

  /**
   * change status of Ads
   *
   */
  changeStatusOfAds(ads: Ads, id: number): Observable<Ads> {
    const query = new HttpParams();
    query.append('status', ads.status);
    return this.http
      .put<Ads>(`${this.baseUrl}/mybrocki/auth/ads/status/${id}`, ads)
      .pipe(shareReplay());
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

  /**
   *
   * Most wanted ads
   */
  mostWanted(pageNumber: number): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}/mybrocki/ads/filter?status=ACTIVE&view=true&pageNumber=${pageNumber}&pageSize=16`
      )
      .pipe(
        map((x) => x),
        shareReplay()
      );
  }

  /**
   *
   * Unused ads
   */
  unusedAds(pageNumber: number): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}/mybrocki/ads/filter?status=ACTIVE&pageSize=16&pageNumber=${pageNumber}&tag=3`
      )
      .pipe(
        map((x) => x),
        shareReplay()
      );
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/mybrocki/group/${id}`);
  }

  getSubCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/mybrocki/subgroup/${id}`);
  }

  sendReportMessage(adId: number, reasonMessage: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/mybrocki/auth/ads/report`, {
      adId,
      reasonMessage,
    });
  }
}
