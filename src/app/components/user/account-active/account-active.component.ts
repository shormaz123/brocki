import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Ads } from '../../../shared/models/ads.model';
import { AdsService } from '../../../@core/services/ads.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { UserStatus } from '../../../shared/enums/userStatus';
import { AuthConst } from '../../../@core/consts/auth.const';

@Component({
  selector: 'app-account-active',
  templateUrl: './account-active.component.html',
  styleUrls: ['./account-active.component.scss'],
})
export class AccountActiveComponent implements OnInit, OnChanges {
  @Input() activeProducts: Ads;
  @Input() ads: boolean;
  language: string;
  Ads: boolean;
  ad: string;
  @Output() changeStatusSold = new EventEmitter();
  @Output() changeStatusDelete = new EventEmitter();
  userId: number;
  itReject = '../../../../assets/images/adsLabel/it-reject.svg';
  itReview = '../../../../assets/images/adsLabel/it-ready-for-review.svg';
  frReject = '../../../../assets/images/adsLabel/fr-reject.svg';
  frReview = '../../../../assets/images/adsLabel/fr-ready-for-review.svg';
  deReject = '../../../../assets/images/adsLabel/de-reject.svg';
  deReview = '../../../../assets/images/adsLabel/de-ready-for-review.svg';
  enReject = '../../../../assets/images/adsLabel/en-reject.svg';
  enReview = '../../../../assets/images/adsLabel/en-ready-for-review.svg';

  constructor(
    private modal: NzModalService,
    private adsService: AdsService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.language = localStorage.getItem(AuthConst.language);
  }

  ngOnChanges() {}

  languageLabel(status: string) {
    this.language = localStorage.getItem(AuthConst.language);
    if (this.language === 'en' && status === 'READYFORREVIEW') {
      return this.enReview;
    } else if (this.language === 'en' && status === 'NOT_ACCEPTED') {
      return this.enReject;
    } else if (this.language === 'de' && status === 'READYFORREVIEW') {
      return this.deReview;
    } else if (this.language === 'de' && status === 'NOT_ACCEPTED') {
      return this.deReject;
    } else if (this.language === 'fr' && status === 'READYFORREVIEW') {
      return this.frReview;
    } else if (this.language === 'fr' && status === 'NOT_ACCEPTED') {
      return this.frReject;
    } else if (this.language === 'it' && status === 'READYFORREVIEW') {
      return this.itReview;
    } else if (this.language === 'it' && status === 'NOT_ACCEPTED') {
      return this.itReject;
    }
  }

  deleteAd(active: Ads, index: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this ad?',
      nzContent: '',
      nzOnOk: () => {
        this.activeProducts[0].splice(index, 1);
        if (this.activeProducts[0].length === 0) {
          this.ads = false;
        }
        const ads = new Ads();
        ads.adsDate = null;
        ads.adsLocation = null;
        ads.adsType = null;
        ads.adsGroupId = null;
        ads.adsSubGroupId = null;
        ads.description = null;
        ads.favourite = null;
        ads.fixedPrice = null;
        ads.freeDelivery = null;
        ads.id = active.id;
        ads.image = null;
        ads.price = null;
        ads.productName = null;
        ads.productWarranty = null;
        ads.status = UserStatus.DELETE;
        ads.urgentSales = null;
        ads.userId = null;
        this.adsService.changeStatusOfAds(ads, ads.id).subscribe(() => {
          this.successDelete();
          this.ad = '1';
          this.changeStatusDelete.emit(this.ad);
        });
      },
    });
  }

  soldAd(active: Ads, index: number): void {
    this.modal.confirm({
      nzTitle: 'Whether the ad was actually sold?',
      nzContent: '',
      nzOnOk: () => {
        this.activeProducts[0].splice(index, 1);
        if (this.activeProducts[0].length === 0) {
          this.ads = false;
        }
        const ads = new Ads();
        ads.adsDate = null;
        ads.adsLocation = null;
        ads.adsType = null;
        ads.adsGroupId = null;
        ads.adsSubGroupId = null;
        ads.description = null;
        ads.favourite = null;
        ads.fixedPrice = null;
        ads.freeDelivery = null;
        ads.id = active.id;
        ads.image = null;
        ads.price = null;
        ads.productName = null;
        ads.productWarranty = null;
        ads.status = UserStatus.SOLD;
        ads.urgentSales = null;
        ads.userId = null;
        this.adsService.changeStatusOfAds(ads, ads.id).subscribe(() => {
          this.successSold();
          this.ad = '1';
          this.changeStatusSold.emit(this.ad);
        });
      },
    });
  }

  successDelete() {
    if (this.language === 'en') {
      return this.toastr.success('The ad is deleted!');
    } else if (this.language === 'fr') {
      return this.toastr.success("L'annonce est supprimée");
    } else if (this.language === 'de') {
      return this.toastr.success('Die Anzeige wird gelöscht');
    } else if (this.language === 'it') {
      return this.toastr.success("L'annuncio viene eliminato");
    }
  }

  successSold() {
    if (this.language === 'en') {
      return this.toastr.success('The ad is moved to sold');
    } else if (this.language === 'fr') {
      return this.toastr.success("L'annonce est déplacée vers vendue");
    } else if (this.language === 'de') {
      return this.toastr.success('Die Anzeige wird in "Verkauft" verschoben');
    } else if (this.language === 'it') {
      return this.toastr.success("L'annuncio viene spostato in Venduto");
    }
  }

  style() {
    if (this.activeProducts[0] > 0) {
      return { height: '0px' };
    } else {
      return { height: '100' };
    }
  }
}
