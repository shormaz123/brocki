import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCardCarouselComponent } from './ads-card-carousel.component';

describe('AdsCardCarouselComponent', () => {
  let component: AdsCardCarouselComponent;
  let fixture: ComponentFixture<AdsCardCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCardCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
