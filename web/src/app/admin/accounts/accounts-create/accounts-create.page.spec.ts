import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCreatePage } from './accounts-create.page';

describe('AccountsCreatePage', () => {
  let component: AccountsCreatePage;
  let fixture: ComponentFixture<AccountsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
