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
    AccountsPage,
    AdminPage
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    AccountsCreatePage,
    AccountsViewPage
  ]
})
export class AdminPageModule {}
