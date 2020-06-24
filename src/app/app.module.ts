import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HttpBaseService } from './@core/services/http-base.service';
import { AuthService } from './@core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import { HttpRequestInterceptor } from './shared/interceptors/request.interceptor';
import { AdsService } from './@core/services/ads.service';
import { UserService } from './@core/services/user.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FiltersComponent } from './components/filters/filters.component';
import { PricingListComponent } from './components/pricing-list/pricing-list.component';
import { UpdateInfoBussinesComponent } from './components/update-info-bussines/update-info-bussines.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UpdateInfoPrivateComponent } from './components/update-info-private/update-info-private.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { UserComponent } from './components/user/user.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { GuestBookComponent } from './components/user/guest-book/guest-book.component';
import { AccountSoldComponent } from './components/user/account-sold/account-sold.component';
import { AccountExpiredComponent } from './components/user/account-expired/account-expired.component';
import { AccountActiveComponent } from './components/user/account-active/account-active.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ActiveSellerComponent } from './components/seller-profile/active-seller/active-seller.component';
import { InfoSellerComponent } from './components/seller-profile/info-seller/info-seller.component';
import { AboutusSellerComponent } from './components/seller-profile/aboutus-seller/aboutus-seller.component';
import { SoldSellerComponent } from './components/seller-profile/sold-seller/sold-seller.component';
import { GuestbookSellerComponent } from './components/seller-profile/guestbook-seller/guestbook-seller.component';
import { HomeComponent } from './home/home.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SiteComponent } from './components/site/site.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatIconModule} from '@angular/material/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import {CarouselModule} from 'primeng/carousel';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AdSingleCarouselComponent } from './components/site/ad-single-carousel/ad-single-carousel.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import {CardModule} from 'primeng/card';
import { AdComponent } from './components/ad/ad.component';
import {GalleriaModule} from 'primeng/galleria';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    FooterComponent,
    HeaderComponent,
    FiltersComponent,
    PricingListComponent,
    UpdateInfoBussinesComponent,
    UpdateInfoPrivateComponent,
    CreateAdComponent,
    UserComponent,
    SellerProfileComponent,
    GuestBookComponent,
    AccountSoldComponent,
    AccountExpiredComponent,
    AccountActiveComponent,
    ActiveSellerComponent,
    InfoSellerComponent,
    AboutusSellerComponent,
    SoldSellerComponent,
    GuestbookSellerComponent,
    HomeComponent,
    NavigationBarComponent,
    SiteComponent,
    ChangePasswordComponent,
    AdSingleCarouselComponent,
    AdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    NgZorroAntdModule,
    NzUploadModule,
    NzRateModule,
    Ng2SearchPipeModule,
    MatIconModule,
    NzAlertModule,
    CarouselModule,
    NzModalModule,
    NzNotificationModule,
    NzDropDownModule,
    NzCarouselModule,
    NzCardModule,
    CardModule,
    GalleriaModule


  ],
  providers: [
    HttpBaseService,
    AuthService,
    UserService,
    AdsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
