import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeScheduleRequestsViewPage } from './change-schedule-requests-view.page';

describe('ChangeScheduleRequestsViewPage', () => {
  let component: ChangeScheduleRequestsViewPage;
  let fixture: ComponentFixture<ChangeScheduleRequestsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeScheduleRequestsViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeScheduleRequestsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
