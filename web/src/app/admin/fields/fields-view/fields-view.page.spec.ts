import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsViewPage } from './fields-view.page';

describe('FieldsViewPage', () => {
  let component: FieldsViewPage;
  let fixture: ComponentFixture<FieldsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
