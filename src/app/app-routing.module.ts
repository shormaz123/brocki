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
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import { AdComponent } from './components/ad/ad.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path:'',
      component: SiteComponent
    },
    {
    path:'user',
    component: UserComponent
  },
  {
    path:'seller',
    component: SellerProfileComponent
  },
  {
    path:'pricing',
    component: PricingListComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'registration',
    component: RegistrationComponent
  },
  {
    path:'filters',
    component: FiltersComponent
  },
  {
    path:'create-ad',
    component: CreateAdComponent
  },
  {
    path:'update-info-private',
    component: UpdateInfoPrivateComponent
  },
  {
    path:'update-info-bussines',
    component: UpdateInfoBussinesComponent
  },
  {
    path:'site',
    component: SiteComponent
  },
  {
    path:'change-password',
    component: ChangePasswordComponent,
  },
  {
    path:'ad',
    component: AdComponent,
  },
]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
