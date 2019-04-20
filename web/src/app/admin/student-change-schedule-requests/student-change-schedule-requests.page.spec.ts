import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChangeScheduleRequestsPage } from './student-change-schedule-requests.page';

describe('StudentChangeScheduleRequestsPage', () => {
  let component: StudentChangeScheduleRequestsPage;
  let fixture: ComponentFixture<StudentChangeScheduleRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChangeScheduleRequestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChangeScheduleRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
