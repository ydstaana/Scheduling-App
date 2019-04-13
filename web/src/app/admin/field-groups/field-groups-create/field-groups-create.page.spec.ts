import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGroupsCreatePage } from './field-groups-create.page';

describe('FieldGroupsCreatePage', () => {
  let component: FieldGroupsCreatePage;
  let fixture: ComponentFixture<FieldGroupsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldGroupsCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldGroupsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
