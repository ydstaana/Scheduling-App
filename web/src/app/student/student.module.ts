import { FAQPageModule } from './../faq/faq.module';
import { FAQPage } from './../faq/faq.page';
import { UpdateChangeElectiveRequestPage } from './change-elective-requests/update-change-elective-request/update-change-elective-request.page';
import { CreateChangeElectiveRequestPage } from './change-elective-requests/create-change-elective-request/create-change-elective-request.page';
import { ChangeElectiveRequestsPage } from './change-elective-requests/change-elective-requests.page';
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
import { StudentSchedulesOverviewPage } from './student-schedules-overview/student-schedules-overview.page';
import { NgxPaginationModule } from 'ngx-pagination';

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
      },
      {
        path: 'change-elective-requests',
        component: ChangeElectiveRequestsPage
      },
      {
        path: 'schedules-overview',
        component: StudentSchedulesOverviewPage
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
    UpdatePasswordModalPageModule,
    FAQPageModule,
    NgxPaginationModule
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
    ScheduleChangesPage,
    ChangeElectiveRequestsPage,
    CreateChangeElectiveRequestPage,
    UpdateChangeElectiveRequestPage,
    StudentSchedulesOverviewPage
  ],
  entryComponents: [
    StudentProfilePage,
    ViewStudentAssignmentPage,
    UpdatePasswordModalPage,
    ChangeScheduleRequestsCreatePage,
    ChangeScheduleRequestsUpdatePage,
    ChangeScheduleRequestsViewPage,
    ScheduleChangesPage,
    CreateChangeElectiveRequestPage,
    UpdateChangeElectiveRequestPage,
    FAQPage
  ],
  providers: [
    AssignmentService
  ]
})
export class StudentPageModule {}
