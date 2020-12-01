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
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HttpRequestInterceptor } from './shared/interceptors/request.interceptor';
import { AdsService } from './@core/services/ads.service';
import { UserService } from './@core/services/user.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
import { MatIconModule } from '@angular/material/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { CarouselModule } from 'primeng/carousel';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AdSingleCarouselComponent } from './components/site/ad-single-carousel/ad-single-carousel.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CardModule } from 'primeng/card';
import { AdComponent } from './components/ad/ad.component';
// import { NgxGalleryModule } from 'ngx-gallery';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HelpersService } from './@core/services/helpers.service';
import { AuthGuardService } from './@core/services/authGuard.service';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from './@core/custom-translate-loader';
import { NgxSocialShareModule } from 'ngx-social-share';
import { TranslateServiceRest } from './@core/services/translateREST.service';
import { ConfirmLoginComponent } from './components/confirm-login/confirm-login.component';
import { AdsComponent } from './components/ads/ads.component';
import { AdsCarouselComponent } from './components/ads-carousel/ads-carousel.component';
import { AcceptAdsComponent } from './components/user/accept-ads/accept-ads.component';
import { StrictNumberOnlyDirective } from './utils/StrictNumberOnlyDirective';
import { ToastrModule } from 'ngx-toastr';
import { InputMaxLengthDirective } from './utils/input-max-length.directive';
import { AcceptUsersComponent } from './components/user/accept-users/accept-users.component';
import { FiltersAdsComponent } from './components/filters-ads/filters-ads.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AgmCoreModule } from '@agm/core';
import { AdsCardCarouselComponent } from './components/ads-card-carousel/ads-card-carousel.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { EmailComponent } from './components/email/email.component';
import { NgxCarouselModule } from 'ngx-carousel';
import { Ng5SliderModule } from 'ng5-slider';
import 'hammerjs';
import { CategoryAdsComponent } from './components/category-ads/category-ads.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatDialogModule } from '@angular/material';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NgxHotjarModule } from 'ngx-hotjar';
import { ClickOutsideDirective } from './utils/click-outside.directive';
import { DebounceClickDirective } from './utils/app-prevent-double-click.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { AdsCategoryWithTagsComponent } from './components/ads-category-with-tags/ads-category-with-tags.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchedAdsComponent } from './components/searched-ads/searched-ads.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdsCardDetailComponent } from './components/ads-card-detail/ads-card-detail.component';
import { AuthStore } from './@core/services/auth.store';
import { AdsMostWantedComponent } from './components/ads-most-wanted/ads-most-wanted.component';
import { UserStatusGuardService } from './@core/services/UserStatusGuard.service';
import { ImgFallbackDirective } from './utils/fallbackImage.directive';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
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
    AdComponent,
    ImageUploadComponent,
    FavoritesComponent,
    ContactUsComponent,
    ConfirmLoginComponent,
    AdsComponent,
    AdsCarouselComponent,
    AcceptAdsComponent,
    StrictNumberOnlyDirective,
    InputMaxLengthDirective,
    AcceptUsersComponent,
    FiltersAdsComponent,
    AdsCardCarouselComponent,
    EmailComponent,
    CategoryAdsComponent,
    HomepageComponent,
    ClickOutsideDirective,
    DebounceClickDirective,
    NotFoundComponent,
    AdsCategoryWithTagsComponent,
    SearchedAdsComponent,
    LoadingSpinnerComponent,
    AdsCardDetailComponent,
    ImgFallbackDirective,
    AdsMostWantedComponent,
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
    MatDialogModule,
    MatIconModule,
    NzAlertModule,
    CarouselModule,
    NzModalModule,
    NzNotificationModule,
    NzDropDownModule,
    NzCarouselModule,
    NzCardModule,
    CardModule,
    NgxGalleryModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgxCarouselModule,
    SidebarModule,
    AccordionModule,
    InlineSVGModule,
    TooltipModule,
    NzDropDownModule,
    MatMenuModule,
    DragDropModule,
    Ng5SliderModule,
    MatAutocompleteModule,
    Ng2CarouselamosModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    NgxHotjarModule.forRoot('2010944'),
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
      tapToDismiss: false,
      timeOut: 3000,
    }),
    NgxSocialShareModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
      },
    }),
    InlineSVGModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFo8eoAunpvp47MeINO5LlMdhJkG0Pvz0',
    }),
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [MatExpansionModule],
  providers: [
    HttpBaseService,
    HelpersService,
    AuthService,
    UserService,
    AdsService,
    AuthGuardService,
    TranslateServiceRest,
    AuthStore,
    UserStatusGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
