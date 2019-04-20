import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradesManagementPage } from './admin-grades-management.page';

describe('AdminGradesManagementPage', () => {
  let component: AdminGradesManagementPage;
  let fixture: ComponentFixture<AdminGradesManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGradesManagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGradesManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
