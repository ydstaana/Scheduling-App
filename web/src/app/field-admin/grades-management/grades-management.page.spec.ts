import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesManagementPage } from './grades-management.page';

describe('GradesManagementPage', () => {
  let component: GradesManagementPage;
  let fixture: ComponentFixture<GradesManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesManagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
