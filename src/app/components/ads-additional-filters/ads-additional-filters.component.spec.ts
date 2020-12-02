import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsMostWantedComponent } from './ads-additional-filters.component';

describe('AdsMostWantedComponent', () => {
  let component: AdsMostWantedComponent;
  let fixture: ComponentFixture<AdsMostWantedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdsMostWantedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsMostWantedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
