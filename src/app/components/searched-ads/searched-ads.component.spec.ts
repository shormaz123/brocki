import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedAdsComponent } from './searched-ads.component';

describe('SearchedAdsComponent', () => {
  let component: SearchedAdsComponent;
  let fixture: ComponentFixture<SearchedAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
