import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPasswordModalPage } from './lost-password-modal.page';

describe('LostPasswordModalPage', () => {
  let component: LostPasswordModalPage;
  let fixture: ComponentFixture<LostPasswordModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostPasswordModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPasswordModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
