import { Component, OnDestroy,OnChanges, Input } from '@angular/core';
import { Ads } from '../../../shared/models/ads.model';
import { AdsService } from '../../../@core/services/ads.service';
import { UserStatus } from '../../../shared/enums/userStatus';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceRest } from '../../../@core/services/translateREST.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'app/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-expired',
  templateUrl: './account-expired.component.html',
  styleUrls: ['./account-expired.component.scss'],
})
export class AccountExpiredComponent implements OnDestroy,OnChanges {
  @Input() expiredProducts: Ads;
  @Input() ads: boolean;
  subscriptionLang: Subscription;
  language:'en';

  constructor(
    private adsService: AdsService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private translateBackend: TranslateServiceRest,
  ) {}

 

  ngOnChanges() { 
    this.subscriptionLang = this.translateBackend
    .getLanguage()
    .subscribe((message) => {
      this.language = message;
    });
  }

  ngOnDestroy() {
    this.subscriptionLang.unsubscribe();
  }

  style() {
    if (this.expiredProducts[0] > 0) {
      return { height: '0px' };
    } else {
      return { height: '100' };
    }
  }

  reactivateAd(expired: Ads, index: number): void {
    console.log(expired,index)
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: this.translateService.instant('translate.modalReactivate')
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.expiredProducts[0].splice(index, 1);
        if (this.expiredProducts[0].length === 0) {
          this.ads = false;
        }
        const ads = new Ads();
        ads.adsDate = null;
        ads.adsLocation = expired.adsLocation;
        ads.adsGroupId = expired.adsGroupId;
        ads.adsSubGroupId = expired.adsSubGroupId;
        ads.description = expired.description;
        ads.favourite = expired.favourite;
        ads.id = expired.id;
        ads.image = expired.image;
        ads.price = expired.price;
        ads.status = UserStatus.ACTIVE;
        ads.userId = expired.userId;
        ads.tags = expired.tags;
        this.adsService.changeStatusOfAds(ads, ads.id).subscribe(() => {
          this.reactivatedAds();
        });
      }
    });
  }

  reactivatedAds() {
    if (this.language === 'en') {
      return this.toastr.success('The ad has been reactivated!');
    } else if (this.language === 'fr') {
      return this.toastr.success("L'annonce a été réactivée!");
    } else if (this.language === 'de') {
      return this.toastr.success('Die Anzeige wurde reaktiviert!');
    } else if (this.language === 'it') {
      return this.toastr.success("L'annuncio è stato riattivato!");
    }
  }

}
