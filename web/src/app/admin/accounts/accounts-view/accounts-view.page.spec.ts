import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsViewPage } from './accounts-view.page';

describe('AccountsViewPage', () => {
  let component: AccountsViewPage;
  let fixture: ComponentFixture<AccountsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
