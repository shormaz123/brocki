import { Injectable } from "@angular/core";
import { HttpBaseService } from "./http-base.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Ads } from "src/app/shared/models/ads.model";
import { adsGroup } from "src/app/shared/models/adsGroup.model";
import { adsSubGroup } from "src/app/shared/models/adsSubGroup.model";
import { User } from "src/app/shared/models/user.model";
import { CreateAd } from "src/app/shared/models/create-ad.model";
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
  HttpParams,
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { AdsParam } from "src/app/shared/models/adParams.model";
import { FilterAds } from "src/app/shared/models/filterAds.model";

@Injectable({
  providedIn: "root",
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

  getAdsBySubGroupParam(adssubgroup: number): Observable<Ads[]> {
    return this.http.get(
      `${this.baseUrl}/mybrocki/ads/filter?adssubgroup=${adssubgroup}`
    );
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

  uploadAdImage(id: number, file: FormData): Observable<Ads> {
    return this.http.post(`${this.baseUrl}/mybrocki/adsimage/${id}`, file);
  }

  uploadCompanyImage(id: number, file: FormData): Observable<User> {
    return this.http.post(`${this.baseUrl}/mybrocki/companyimage/${id}`, file);
  }

  //Public Controller

  getAdById(id: number): Observable<Ads> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/${id}`);
  }

  getAllByUserId(id: number): Observable<Ads> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/user/${id}`);
  }

  getAllVisibleAds(): Observable<Ads[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/visible`);
  }

  deleteAds(ads: Ads, id: number): Observable<Ads> {
    let query = new HttpParams();
    query = query.append("status", ads.status);
    return this.http.put<Ads>(
      `${this.baseUrl}/mybrocki/auth/ads/status/${id}`,
      ads
    );
  }

  soldAds(ads: Ads, id: number): Observable<Ads> {
    let query = new HttpParams();
    query = query.append("status", ads.status);
    return this.http.put<Ads>(
      `${this.baseUrl}/mybrocki/auth/ads/status/${id}`,
      ads
    );
  }

  getSoldAds(data: AdsParam): Observable<Ads> {
    let query = new HttpParams();
    query = query.append("status", data.status);
    query = query.append("userId", data.userId.toString());
    return this.http.get<Ads>(`${this.baseUrl}/mybrocki/ads/filter?${query}`);
  }

  uploadImageInStorage(formData) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/mybrocki/auth/image/upload`,
      formData
    );
  }
}
