import {
  Component,
  OnInit,
  OnDestroy,
  Input,
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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() getLanguage = new EventEmitter<any>();
  accountName: string;
  createAd: boolean;
  roleName;
  user;
  userId;
  dropdownBoolean = true;
  userLang;
  chosenLanguage;
  header;

  @Output() notify = new EventEmitter<any>();

  private loginNameSubscription: Subscription;

  constructor(
    private userService: UserService,
    private helpers: HelpersService,
    private modal: NzModalService,
    private router: Router,
    private translate: TranslateService,
    private translateBackend: TranslateServiceRest
  ) {}

  ngOnInit() {
    this.chosenLanguage = this.translateBackend.getChoosenLanguage();
    if (this.chosenLanguage !== '') {
      this.userLang = this.chosenLanguage;
      this.change(this.userLang);
    } else {
      this.translate.use('de');
    }
    this.loginNameSubscription = this.helpers.$loginName.subscribe((filter) => {
      this.getUser();
    });
    if (localStorage.getItem(AuthConst.token) == null) {
    } else {
      this.getUser();
    }
    // this.change(this.userLang);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.loginNameSubscription.unsubscribe();
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
    this.translateBackend.setLanguage(code).subscribe(
      (x) => {
        console.log(x);
      },
      (error) => {
        console.log(error);
      }
    );
    this.translateBackend.sendLanguage(code);
    this.notify.emit(code);
  }

  getUser(): void {
    this.userService.getUser().subscribe(
      (user) => {
        if (user == null) {
          this.accountName = null;
          this.createAd = false;
        } else {
          this.accountName = user.userName;
          this.createAd = true;
          this.userId = user.id;
          localStorage.setItem(AuthConst.userId, user.id.toString());
        }
      },
      (error) => console.log('User not logged in')
    );
  }

  logout() {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to logout?',
      nzContent: '',
      nzOnOk: () => {
        localStorage.removeItem(AuthConst.roleName);
        localStorage.removeItem(AuthConst.token);
        localStorage.removeItem(AuthConst.userId);
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
}
