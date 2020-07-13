import { Injectable } from "@angular/core";
import { HttpBaseService } from "./http-base.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Ads } from "src/app/shared/models/ads.model";
import { adsGroup } from "src/app/shared/models/adsGroup.model";
import { adsSubGroup } from "src/app/shared/models/adsSubGroup.model";
import { User } from "src/app/shared/models/user.model";
import { CreateAd } from "src/app/shared/models/create-ad.model";

@Injectable({
  providedIn: "root",
})
export class AdsService {
  private readonly baseUrl = environment.apiUrlBase;

  constructor(private http: HttpBaseService) {}

  getAllAds(): Observable<Ads[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/brocki/ads`);
  }

  newAd(ad: CreateAd): Observable<Ads> {
    return this.http.post(`${this.baseUrl}/mybrocki/auth/ads/create`, ad);
  }

  getAllAdsGroups(): Observable<adsGroup> {
    return this.http.get(`${this.baseUrl}/mybrocki/brocki/adsgroup`);
  }

  getAllAdsSubGroup(id: number): Observable<adsSubGroup> {
    return this.http.get(`${this.baseUrl}/mybrocki/brocki/adsgroup/${id}`);
  }

  uploadAdImage(id: number, file: FormData): Observable<Ads> {
    return this.http.post(`${this.baseUrl}/mybrocki/adsimage/${id}`, file);
  }

  uploadCompanyImage(id: number, file: FormData): Observable<User> {
    return this.http.post(`${this.baseUrl}/mybrocki/companyimage/${id}`, file);
  }

  //Public Controller

  getAddById(id: number): Observable<Ads> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/${id}`);
  }

  getAllByUserId(id: number): Observable<Ads> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/user/${id}`);
  }

  getAllVisibleAds(): Observable<Ads[]> {
    return this.http.get(`${this.baseUrl}/mybrocki/ads/visible`);
  }

  uploadImageInStorage(file: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/mybrocki/auth/image/upload`, file);
  }
}
