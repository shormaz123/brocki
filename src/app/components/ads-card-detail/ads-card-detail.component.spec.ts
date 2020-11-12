import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCardDetailComponent } from './ads-card-detail.component';

describe('AdsCardDetailComponent', () => {
  let component: AdsCardDetailComponent;
  let fixture: ComponentFixture<AdsCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
