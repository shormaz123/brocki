import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfoBussinesComponent } from './update-info-bussines.component';

describe('UpdateInfoBussinesComponent', () => {
  let component: UpdateInfoBussinesComponent;
  let fixture: ComponentFixture<UpdateInfoBussinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInfoBussinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfoBussinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
