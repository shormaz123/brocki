import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdComponent } from './report-ad.component';

describe('ReportAdComponent', () => {
  let component: ReportAdComponent;
  let fixture: ComponentFixture<ReportAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
