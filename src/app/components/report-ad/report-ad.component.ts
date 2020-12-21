import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-report-ad',
  templateUrl: './report-ad.component.html',
  styleUrls: ['./report-ad.component.scss']
})
export class ReportAdComponent implements OnInit {
  @Output() readonly closeReportAd = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

  closeModal() {
    this.closeReportAd.emit();
  }

}
