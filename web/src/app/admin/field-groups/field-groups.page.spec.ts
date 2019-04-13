import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGroupsPage } from './field-groups.page';

describe('FieldGroupsPage', () => {
  let component: FieldGroupsPage;
  let fixture: ComponentFixture<FieldGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldGroupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
