import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationsCreatePage } from './rotations-create.page';

describe('RotationsCreatePage', () => {
  let component: RotationsCreatePage;
  let fixture: ComponentFixture<RotationsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationsCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
