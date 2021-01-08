import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AdsService } from 'app/@core/services/ads.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-ad',
  templateUrl: './report-ad.component.html',
  styleUrls: ['./report-ad.component.scss']
})
export class ReportAdComponent implements OnInit {
  @Output() readonly closeReportAd = new EventEmitter<void>();
  @Input() adId: number;
  reasonMessage: string;

  constructor(private fb: FormBuilder,
    private adsService: AdsService,
    private toastr: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {

  }

  onSubmitReport() {
    this.adsService.sendReportMessage(+this.adId, this.reasonMessage).subscribe( response => {
      if (response) {
        this.toastr.success(this.translateService.instant('translate.reportSended'));
        this.closeModal();
      }
      (error) => {
        this.toastr.error(
            this.translateService.instant('translate.wentWrong')
          );
        };
    })
  }

  closeModal() {
    this.closeReportAd.emit();
  }

}
