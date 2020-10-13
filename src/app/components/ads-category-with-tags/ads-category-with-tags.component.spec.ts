import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCategoryWithTagsComponent } from './ads-category-with-tags.component';

describe('AdsCategoryWithTagsComponent', () => {
  let component: AdsCategoryWithTagsComponent;
  let fixture: ComponentFixture<AdsCategoryWithTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCategoryWithTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCategoryWithTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
