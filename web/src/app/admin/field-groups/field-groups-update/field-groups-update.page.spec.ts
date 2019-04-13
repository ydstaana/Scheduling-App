import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGroupsUpdatePage } from './field-groups-update.page';

describe('FieldGroupsUpdatePage', () => {
  let component: FieldGroupsUpdatePage;
  let fixture: ComponentFixture<FieldGroupsUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldGroupsUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldGroupsUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
