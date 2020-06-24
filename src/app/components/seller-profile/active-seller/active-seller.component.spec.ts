import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSellerComponent } from './active-seller.component';

describe('ActiveSellerComponent', () => {
  let component: ActiveSellerComponent;
  let fixture: ComponentFixture<ActiveSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
