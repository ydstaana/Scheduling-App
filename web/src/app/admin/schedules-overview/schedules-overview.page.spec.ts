import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesOverviewPage } from './schedules-overview.page';

describe('SchedulesOverviewPage', () => {
  let component: SchedulesOverviewPage;
  let fixture: ComponentFixture<SchedulesOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesOverviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
