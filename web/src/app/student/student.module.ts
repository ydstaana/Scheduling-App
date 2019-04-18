import { ViewStudentAssignmentPage } from './student-rotations/view-student-assignment/view-student-assignment.page';
import { AssignmentService } from './../services/assignment.service';
import { StudentRotationsPage } from './student-rotations/student-rotations.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentPage } from './student.page';
import { StudentProfilePage } from './student-profile/student-profile.page';
import { UpdatePasswordModalPageModule } from '../update-password-modal/update-password-modal.module';
import { UpdatePasswordModalPage } from '../update-password-modal/update-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StudentPage,
    children: [
      {
        path: '',
        redirectTo: 'rotations',
        pathMatch: 'full'
      },
      {
        path: 'rotations',
        component: StudentRotationsPage
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
    StudentPage,
    StudentRotationsPage,
    StudentProfilePage,
    ViewStudentAssignmentPage
  ],
  entryComponents: [
    StudentProfilePage,
    ViewStudentAssignmentPage,
    UpdatePasswordModalPage
  ],
  providers: [
    AssignmentService
  ]
})
export class StudentPageModule {}