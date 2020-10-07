import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceRest } from 'app/@core/services/translateREST.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  notify: any;
  constructor( private translate: TranslateService,
    private translateBackend: TranslateServiceRest,) {}

  ngOnInit() {}

  change(code: string) {
    this.translate.use(code);
    this.translateBackend.sendLanguage(code);
  }
}
