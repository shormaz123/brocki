import { Component, OnInit } from '@angular/core';
import { LoadingIndicatorService } from 'app/@core/loading-indicator.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor(public loadingService: LoadingIndicatorService) { }

  ngOnInit() {
  }

}
