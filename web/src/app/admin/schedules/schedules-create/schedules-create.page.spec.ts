import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesCreatePage } from './schedules-create.page';

describe('SchedulesCreatePage', () => {
  let component: SchedulesCreatePage;
  let fixture: ComponentFixture<SchedulesCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
