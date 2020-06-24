import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfoPrivateComponent } from './update-info-private.component';

describe('UpdateInfoPrivateComponent', () => {
  let component: UpdateInfoPrivateComponent;
  let fixture: ComponentFixture<UpdateInfoPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInfoPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfoPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
