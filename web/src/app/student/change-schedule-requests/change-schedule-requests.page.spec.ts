import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeScheduleRequestsPage } from './change-schedule-requests.page';

describe('ChangeScheduleRequestsPage', () => {
  let component: ChangeScheduleRequestsPage;
  let fixture: ComponentFixture<ChangeScheduleRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeScheduleRequestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeScheduleRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
