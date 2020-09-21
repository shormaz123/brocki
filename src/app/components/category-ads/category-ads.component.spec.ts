import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAdsComponent } from './category-ads.component';

describe('CategoryAdsComponent', () => {
  let component: CategoryAdsComponent;
  let fixture: ComponentFixture<CategoryAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
