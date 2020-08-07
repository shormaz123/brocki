import { en } from "../../assets/i18n/en";
import { de } from "../../assets/i18n/de";
import { fr } from "../../assets/i18n/fr";
import { it } from "../../assets/i18n/it";

import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
public getTranslation(lang: string): Observable<any> {
  return Observable.create(observer => {
    switch (lang) {
      case 'en':
        observer.next(en);
        break;
        case 'de':
        observer.next(de);
        break;
        case 'fr':
        observer.next(fr);
        break;
        case 'it':
        observer.next(it);
        break;
    }
    observer.complete();
   })
  }
}
