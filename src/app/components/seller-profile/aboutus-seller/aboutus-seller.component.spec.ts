import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusSellerComponent } from './aboutus-seller.component';

describe('AboutusSellerComponent', () => {
  let component: AboutusSellerComponent;
  let fixture: ComponentFixture<AboutusSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
