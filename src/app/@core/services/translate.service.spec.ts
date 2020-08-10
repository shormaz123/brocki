import { TestBed } from '@angular/core/testing';

import { TranslateServiceRest } from './translateREST.service';

describe('TranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslateServiceRest = TestBed.get(TranslateServiceRest);
    expect(service).toBeTruthy();
  });
});
