import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCarouselComponent } from './ads-carousel.component';

describe('AdsCarouselComponent', () => {
  let component: AdsCarouselComponent;
  let fixture: ComponentFixture<AdsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
