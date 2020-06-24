import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSingleCarouselComponent } from './ad-single-carousel.component';

describe('AdSingleCarouselComponent', () => {
  let component: AdSingleCarouselComponent;
  let fixture: ComponentFixture<AdSingleCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSingleCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSingleCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
