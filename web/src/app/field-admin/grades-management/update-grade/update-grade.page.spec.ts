import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGradePage } from './update-grade.page';

describe('UpdateGradePage', () => {
  let component: UpdateGradePage;
  let fixture: ComponentFixture<UpdateGradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGradePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
