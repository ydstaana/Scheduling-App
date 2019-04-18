import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordModalPage } from './update-password-modal.page';

describe('UpdatePasswordModalPage', () => {
  let component: UpdatePasswordModalPage;
  let fixture: ComponentFixture<UpdatePasswordModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePasswordModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
