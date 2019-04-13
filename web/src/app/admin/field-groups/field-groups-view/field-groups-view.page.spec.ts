import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGroupsViewPage } from './field-groups-view.page';

describe('FieldGroupsViewPage', () => {
  let component: FieldGroupsViewPage;
  let fixture: ComponentFixture<FieldGroupsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldGroupsViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldGroupsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
