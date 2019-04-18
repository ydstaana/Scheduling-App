import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAdminPage } from './field-admin.page';

describe('FieldAdminPage', () => {
  let component: FieldAdminPage;
  let fixture: ComponentFixture<FieldAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
