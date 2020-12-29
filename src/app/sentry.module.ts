import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Sentry from '@sentry/browser';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
    console.log('Sentry.io init');

    // Sentry inside the constructor instantiate it only if needed
    Sentry.init({
      dsn:
        'https://06c5ac0212e54129b9cec1cfea77430a@o486753.ingest.sentry.io/5544505',
      beforeSend(event, hint) {
        if (
          event.exception.values[0].value.startsWith(
            'Non-Error exception captured'
          ) ||
          hint.originalException['message'].startsWith(
            'Non-Error exception captured'
          )
        ) {
          // We want to ignore those kind of errors
          return null;
        }
        return event;
      },
    });
  }

  public handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  imports: [CommonModule],
})
export class SentryModule {
  public static forRoot() {
    return {
      ngModule: SentryModule,
      imports: [BrowserModule],
      providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
    };
  }
}
