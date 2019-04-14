import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAssignmentsPage } from './group-assignments.page';

describe('GroupAssignmentsPage', () => {
  let component: GroupAssignmentsPage;
  let fixture: ComponentFixture<GroupAssignmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAssignmentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAssignmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
