import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestbookSellerComponent } from './guestbook-seller.component';

describe('GuestbookSellerComponent', () => {
  let component: GuestbookSellerComponent;
  let fixture: ComponentFixture<GuestbookSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestbookSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestbookSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
