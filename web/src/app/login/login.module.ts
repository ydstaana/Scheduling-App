import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { LostPasswordModalPage } from '../lost-password-modal/lost-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage, LostPasswordModalPage],
  providers: [
    UserService,
    StorageService
  ],
  entryComponents : [
    LostPasswordModalPage
  ]
})
export class LoginPageModule {}
