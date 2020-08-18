import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptAdsComponent } from './accept-ads.component';

describe('AcceptAdsComponent', () => {
  let component: AcceptAdsComponent;
  let fixture: ComponentFixture<AcceptAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
