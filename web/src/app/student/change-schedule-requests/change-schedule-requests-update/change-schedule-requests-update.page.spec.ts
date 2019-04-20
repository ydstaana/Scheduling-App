import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeScheduleRequestsUpdatePage } from './change-schedule-requests-update.page';

describe('ChangeScheduleRequestsUpdatePage', () => {
  let component: ChangeScheduleRequestsUpdatePage;
  let fixture: ComponentFixture<ChangeScheduleRequestsUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeScheduleRequestsUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeScheduleRequestsUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
