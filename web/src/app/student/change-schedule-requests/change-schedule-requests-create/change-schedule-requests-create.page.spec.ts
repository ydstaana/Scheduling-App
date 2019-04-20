import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeScheduleRequestsCreatePage } from './change-schedule-requests-create.page';

describe('ChangeScheduleRequestsCreatePage', () => {
  let component: ChangeScheduleRequestsCreatePage;
  let fixture: ComponentFixture<ChangeScheduleRequestsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeScheduleRequestsCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeScheduleRequestsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
