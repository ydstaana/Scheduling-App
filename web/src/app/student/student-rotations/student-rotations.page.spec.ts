import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRotationsPage } from './student-rotations.page';

describe('StudentRotationsPage', () => {
  let component: StudentRotationsPage;
  let fixture: ComponentFixture<StudentRotationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRotationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRotationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
