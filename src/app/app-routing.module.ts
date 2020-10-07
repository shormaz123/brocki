import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FiltersComponent } from './components/filters/filters.component';
import { PricingListComponent } from './components/pricing-list/pricing-list.component';
import { UpdateInfoBussinesComponent } from './components/update-info-bussines/update-info-bussines.component';
import { UpdateInfoPrivateComponent } from './components/update-info-private/update-info-private.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { UserComponent } from './components/user/user.component';
import { GuestBookComponent } from './components/user/guest-book/guest-book.component';
import { HomeComponent } from './home/home.component';
import { SiteComponent } from './components/site/site.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdComponent } from './components/ad/ad.component';
import { AuthGuardService } from './@core/services/authGuard.service';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ConfirmLoginComponent } from './components/confirm-login/confirm-login.component';
import { AdsComponent } from './components/ads/ads.component';
import { AcceptAdsComponent } from './components/user/accept-ads/accept-ads.component';
import { AcceptUsersComponent } from './components/user/accept-users/accept-users.component';
// import { FiltersAdsComponent } from './components/filters-ads/filters-ads.component';
import { AuthGuardService as AuthGuard } from '../app/@core/services/authGuard.service';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoryAdsComponent } from './components/category-ads/category-ads.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: SiteComponent,
        children: [
          {
            path: '',
            component: HomepageComponent,
          },
          {
            path: 'homepage',
            component: HomepageComponent,
          },
          {
            path: 'category-ads/:groupId',
            component: CategoryAdsComponent,
          },
        ],
      },
      {
        path: 'user/:id',
        component: UserComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'accept-users',
        component: AcceptUsersComponent,
      },
      {
        path: 'accept-ads',
        component: AcceptAdsComponent,
      },

      {
        path: 'seller/:id',
        component: SellerProfileComponent,
      },
      {
        path: 'pricing',
        component: PricingListComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgetPassword',
        component: ForgotPasswordComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'filters',
        component: FiltersComponent,
      },
      {
        path: 'create-ad',
        component: CreateAdComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'favorite',
        component: FavoritesComponent,
      },
      {
        path: 'update-info-private',
        component: UpdateInfoPrivateComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'update-info-bussines',
        component: UpdateInfoBussinesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'ads/:subGroupId/:groupId',
        component: AdsComponent,
      },
      {
        path: 'site',
        component: SiteComponent,
        children: [
          {
            path: '',
            component: HomepageComponent,
          },
          {
            path: 'homepage',
            component: HomepageComponent,
          },
          {
            path: 'category-ads/:groupId',
            component: CategoryAdsComponent,
          },
        ],
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      // {
      //   path: 'filters-ads',
      //   component: FiltersAdsComponent,
      // },
      {
        path: 'ad/:id',
        component: AdComponent,
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
  {
    path: 'confirm-account',
    component: ConfirmLoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
