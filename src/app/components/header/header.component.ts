import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { UserService } from '../../@core/services/user.service';
import { AuthConst } from '../../@core/consts/auth.const';
import { Subscription } from 'rxjs';
import { HelpersService } from '../../@core/services/helpers.service';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceRest } from '../../@core/services/translateREST.service';
import { AdsService } from '../../@core/services/ads.service';
import { Ads } from '../../shared/models/ads.model';
import { AuthStore } from 'app/@core/services/auth.store';
import { User } from 'app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() getLanguage = new EventEmitter<any>();
  accountName: string;
  createAd: boolean;
  userId;
  dropdownBoolean = true;
  userLang;
  chosenLanguage;
  privateUser;
  displaySideNav;
  subCategories;
  currentLang;
  categoriesGroup;
  sidebarTitleBackground: boolean;
  clickedTabs: Array<any> = [];
  clickedTab: any;
  subscriptionUser: Subscription;
  userDataSub: Subscription;
  user: User;

  @Output() notify = new EventEmitter<any>();

  private displaySideBarSubscription: Subscription;

  constructor(
    private userService: UserService,
    private helpers: HelpersService,
    private modal: NzModalService,
    private router: Router,
    private translate: TranslateService,
    private translateBackend: TranslateServiceRest,
    private adsService: AdsService,
    public auth: AuthStore
  ) {}

  ngOnInit() {
    this.sidebarTitleBackground = false;
    this.currentLang = localStorage.getItem(AuthConst.language);
    this.chosenLanguage = this.translateBackend.getChoosenLanguage();
    if (this.chosenLanguage !== '') {
      this.userLang = this.chosenLanguage;
      this.change(this.userLang);
    } else {
      this.translate.use('de');
    }
    if (localStorage.getItem(AuthConst.token) == null) {
    } else {
      this.getUser();
    }
    this.adsService.getAllAdsGroups().subscribe((x) => {
      this.categoriesGroup = x;
    });
    this.displaySideBarSubscription = this.helpers
      .getDisplaySideBar()
      .subscribe((response) => {
        this.currentLang = localStorage.getItem(AuthConst.language);
        this.displaySideNav = response;
      });

    this.subscriptionUser = this.userService
      .getUpdateUser()
      .subscribe((user) => {
        this.accountName = user.userName;
      });
    this.auth.userProfile$.subscribe((response) => {
      if (response) {
        this.getUser();
      }
    });
  }

  ngOnDestroy() {
    this.displaySideBarSubscription.unsubscribe();
    this.subscriptionUser.unsubscribe();
    this.userDataSub.unsubscribe();
  }

  selectDropDown(id: number) {
    this.adsService.getAllAdsSubGroup(id).subscribe((response) => {
      this.subCategories = response;
    });
  }

  goToUserProfie(id: number) {
    if (localStorage.getItem(AuthConst.token) == null) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/user', id]);
    }
  }

  change(code: string) {
    this.getLanguage.emit(code);
    this.translate.use(code);
    this.translateBackend.sendLanguage(code);
    this.notify.emit(code);
  }

  getUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      localStorage.setItem(AuthConst.userStatus, user.userStatus);
      if (user.bussinesType === 'PRIVATE') {
        this.privateUser = true;
      } else {
        this.privateUser = false;
      }
      if (user == null) {
        this.accountName = null;
        this.createAd = false;
      } else {
        this.accountName = user.userName;
        this.createAd = true;
        this.userId = user.id;
      }
    });
  }

  logout() {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to logout?',
      nzContent: '',
      nzOnOk: () => {
        this.createAd = false;
        this.auth.logout();
        if (this.router.url === '/site') {
          window.location.reload();
        }
        this.router.navigate(['/site']);
      },
    });
  }

  create() {
    this.router.navigate(['/registration']);
  }

  dropdown() {
    this.dropdownBoolean = !this.dropdownBoolean;
    document.getElementById('myDropdown').classList.toggle('show');
  }

  navigateToSite() {
    this.router.navigate(['/site']);
    sessionStorage.removeItem('category_id');
    this.helpers.clearCategories();
  }

  goToSubCategory(subCategoryId, categoryId) {
    this.router.navigate(['/ads', subCategoryId, categoryId]);
    this.displaySideNav = false;
  }

  selectCategoryOnSideBar(category: any) {}
}
