import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSoldComponent } from './account-sold.component';

describe('AccountSoldComponent', () => {
  let component: AccountSoldComponent;
  let fixture: ComponentFixture<AccountSoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
