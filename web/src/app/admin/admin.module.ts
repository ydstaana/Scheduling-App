import { AccountsCreatePage } from './accounts/accounts-create/accounts-create.page';
import { AccountsPage } from './accounts/accounts.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';
import { UserService } from '../services/user.service';
import { AccountsViewPage } from './accounts/accounts-view/accounts-view.page';
import { AccountsUpdatePage } from './accounts/accounts-update/accounts-update.page';
import { FieldsPage } from './fields/fields.page';
import { FieldsCreatePage } from './fields/fields-create/fields-create.page';
import { FieldsUpdatePage } from './fields/fields-update/fields-update.page';
import { FieldsViewPage } from './fields/fields-view/fields-view.page';
import { FieldService } from '../services/field.service';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'full'
      },
      {
        path: 'accounts',
        component: AccountsPage
      },
      {
        path: 'fields',
        component: FieldsPage
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    AccountsCreatePage,
    AccountsViewPage,
    AccountsUpdatePage,
    AccountsPage,
    AdminPage,
    FieldsPage,
    FieldsCreatePage,
    FieldsUpdatePage,
    FieldsViewPage
  ],
  providers: [
    FieldService,
    UserService
  ],
  entryComponents: [
    AccountsCreatePage,
    AccountsViewPage,
    AccountsUpdatePage,
    FieldsCreatePage,
    FieldsUpdatePage,
    FieldsViewPage
  ]
})
export class AdminPageModule {}
