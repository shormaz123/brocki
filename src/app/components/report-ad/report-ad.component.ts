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

  reportForm: FormGroup;

  constructor(private fb: FormBuilder,
    private adsService: AdsService,
    private toastr: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.reportForm = this.fb.group({
      adId: [this.adId, [Validators.required]],
      reasonMessage: ['', [Validators.required]],
    });
  }

  onSubmitReport() {
    const message = this.reportForm.value.reasonMessage;
    this.adsService.sendReportMessage(this.adId, message).subscribe( response => {
      if (response) {
        this.toastr.success(this.translateService.instant('translate.emailSent'));
        console.log(response)
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
