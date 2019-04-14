import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationsPage } from './rotations.page';

describe('RotationsPage', () => {
  let component: RotationsPage;
  let fixture: ComponentFixture<RotationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
