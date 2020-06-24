import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountExpiredComponent } from './account-expired.component';

describe('AccountExpiredComponent', () => {
  let component: AccountExpiredComponent;
  let fixture: ComponentFixture<AccountExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
