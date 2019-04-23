import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChangeElectiveRequestPage } from './student-change-elective-request.page';

describe('StudentChangeElectiveRequestPage', () => {
  let component: StudentChangeElectiveRequestPage;
  let fixture: ComponentFixture<StudentChangeElectiveRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChangeElectiveRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChangeElectiveRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
