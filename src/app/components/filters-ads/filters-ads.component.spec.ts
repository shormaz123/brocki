import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersAdsComponent } from './filters-ads.component';

describe('FiltersAdsComponent', () => {
  let component: FiltersAdsComponent;
  let fixture: ComponentFixture<FiltersAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
