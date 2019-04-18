import { UpdatePasswordModalPage } from 'src/app/update-password-modal/update-password-modal.page';
import { UpdatePasswordModalPageModule } from './../update-password-modal/update-password-modal.module';
import { ViewAssignmentPage } from './grades-management/view-assignment/view-assignment.page';
import { AssignmentService } from './../services/assignment.service';
import { GradesManagementPage } from './grades-management/grades-management.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FieldAdminPage } from './field-admin.page';
import { FieldAdminProfilePage } from './field-admin-profile/field-admin-profile.page';
import { UpdateGradePage } from './grades-management/update-grade/update-grade.page';

const routes: Routes = [
  {
    path: '',
    component: FieldAdminPage,
    children: [
      {
        path: '',
        redirectTo: 'grades',
        pathMatch: 'full'
      },
      {
        path: 'grades',
        component: GradesManagementPage
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
    ReactiveFormsModule,
    UpdatePasswordModalPageModule
  ],
  declarations: [
    FieldAdminPage,
    FieldAdminProfilePage,
    GradesManagementPage,
    UpdateGradePage,
    ViewAssignmentPage
  ],
  entryComponents: [
    FieldAdminProfilePage,
    UpdateGradePage,
    ViewAssignmentPage,
    UpdatePasswordModalPage
  ],
  providers: [
    AssignmentService
  ]
})
export class FieldAdminPageModule {}
