import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChangeElectiveRequestPage } from './update-change-elective-request.page';

describe('UpdateChangeElectiveRequestPage', () => {
  let component: UpdateChangeElectiveRequestPage;
  let fixture: ComponentFixture<UpdateChangeElectiveRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChangeElectiveRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChangeElectiveRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
