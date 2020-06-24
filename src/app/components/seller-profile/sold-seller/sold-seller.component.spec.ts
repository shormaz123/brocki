import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldSellerComponent } from './sold-seller.component';

describe('SoldSellerComponent', () => {
  let component: SoldSellerComponent;
  let fixture: ComponentFixture<SoldSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
