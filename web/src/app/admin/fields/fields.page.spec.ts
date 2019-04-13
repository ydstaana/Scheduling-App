import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsPage } from './fields.page';

describe('FieldsPage', () => {
  let component: FieldsPage;
  let fixture: ComponentFixture<FieldsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
