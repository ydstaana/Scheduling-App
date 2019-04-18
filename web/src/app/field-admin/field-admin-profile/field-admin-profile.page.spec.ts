import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAdminProfilePage } from './field-admin-profile.page';

describe('FieldAdminProfilePage', () => {
  let component: FieldAdminProfilePage;
  let fixture: ComponentFixture<FieldAdminProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldAdminProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldAdminProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
