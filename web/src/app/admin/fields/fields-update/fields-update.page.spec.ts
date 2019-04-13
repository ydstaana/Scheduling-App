import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsUpdatePage } from './fields-update.page';

describe('FieldsUpdatePage', () => {
  let component: FieldsUpdatePage;
  let fixture: ComponentFixture<FieldsUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
