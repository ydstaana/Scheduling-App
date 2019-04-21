import { ChangeScheduleRequestsViewPage } from './change-schedule-requests/change-schedule-requests-view/change-schedule-requests-view.page';
import { ChangeScheduleRequestsUpdatePage } from './change-schedule-requests/change-schedule-requests-update/change-schedule-requests-update.page';
import { ChangeScheduleRequestsCreatePage } from './change-schedule-requests/change-schedule-requests-create/change-schedule-requests-create.page';
import { ChangeScheduleRequestsPage } from './change-schedule-requests/change-schedule-requests.page';
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
import { ScheduleChangesPage } from './change-schedule-requests/schedule-changes/schedule-changes.page';

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
      },
      {
        path: 'change-schedule-requests',
        component: ChangeScheduleRequestsPage
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
    ViewStudentAssignmentPage,
    ChangeScheduleRequestsPage,
    ChangeScheduleRequestsCreatePage,
    ChangeScheduleRequestsUpdatePage,
    ChangeScheduleRequestsViewPage,
    ScheduleChangesPage
  ],
  entryComponents: [
    StudentProfilePage,
    ViewStudentAssignmentPage,
    UpdatePasswordModalPage,
    ChangeScheduleRequestsCreatePage,
    ChangeScheduleRequestsUpdatePage,
    ChangeScheduleRequestsViewPage,
    ScheduleChangesPage
  ],
  providers: [
    AssignmentService
  ]
})
export class StudentPageModule {}
