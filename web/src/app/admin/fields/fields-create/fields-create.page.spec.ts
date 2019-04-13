import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsCreatePage } from './fields-create.page';

describe('FieldsCreatePage', () => {
  let component: FieldsCreatePage;
  let fixture: ComponentFixture<FieldsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
