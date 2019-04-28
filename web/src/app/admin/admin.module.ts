import { AccountsViewAssignmentPage } from './accounts/accounts-view-assignment/accounts-view-assignment.page';
import { RotationsUpdatePage } from './rotations/rotations-update/rotations-update.page';
import { UpdateStudentChangeElectiveRequestPage } from './student-change-elective-request/update-student-change-elective-request/update-student-change-elective-request.page';
import { AdminViewAssignmentPage } from './admin-grades-management/admin-view-assignment/admin-view-assignment.page';
import { AdminUpdateGradePage } from './admin-grades-management/admin-update-grade/admin-update-grade.page';
import { AdminGradesManagementPage } from './admin-grades-management/admin-grades-management.page';
import { UpdatePasswordModalPage } from 'src/app/update-password-modal/update-password-modal.page';
import { AdminProfilePage } from './admin-profile/admin-profile.page';
import { FieldGroupsUpdatePage } from './field-groups/field-groups-update/field-groups-update.page';
import { FieldGroupsViewPage } from './field-groups/field-groups-view/field-groups-view.page';
import { FieldGroupsCreatePage } from './field-groups/field-groups-create/field-groups-create.page';
import { FieldGroupsPage } from './field-groups/field-groups.page';
import { ScheduleService } from './../services/schedule.service';
import { SchedulesViewPage } from './schedules/schedules-view/schedules-view.page';
import { SchedulesUpdatePage } from './schedules/schedules-update/schedules-update.page';
import { SchedulesCreatePage } from './schedules/schedules-create/schedules-create.page';
import { SchedulesPage } from './schedules/schedules.page';
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
import { SchedulesOverviewPage } from './schedules-overview/schedules-overview.page';
import { GroupAssignmentsPage } from './group-assignments/group-assignments.page';
import { RotationsPage } from './rotations/rotations.page';
import { RotationsCreatePage } from './rotations/rotations-create/rotations-create.page';
import { RotationService } from '../services/rotation.service';
import { UpdatePasswordModalPageModule } from '../update-password-modal/update-password-modal.module';
import { StudentChangeScheduleRequestUpdatePage } from './student-change-schedule-requests/student-change-schedule-request-update/student-change-schedule-request-update.page';
import { StudentChangeScheduleRequestsPage } from './student-change-schedule-requests/student-change-schedule-requests.page';
import { StudentChangeElectiveRequestPage } from './student-change-elective-request/student-change-elective-request.page';
import { ResetPasswordRequestsPage } from './reset-password-requests/reset-password-requests.page';

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
      },
      {
        path: 'field-groups',
        component: FieldGroupsPage
      },
      {
        path: 'schedules',
        component: SchedulesPage
      },
      {
        path: 'schedules-overview',
        component: SchedulesOverviewPage
      },
      {
        path: 'group-assignments',
        component: GroupAssignmentsPage
      },
      {
        path: 'rotations',
        component: RotationsPage
      },
      {
        path: 'change-elective-requests',
        component: StudentChangeElectiveRequestPage
      },
      {
        path: 'change-schedule-requests',
        component: StudentChangeScheduleRequestsPage
      },
      {
        path: 'grades',
        component: AdminGradesManagementPage
      },
      {
        path: 'reset-password-requests',
        component: ResetPasswordRequestsPage
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
    AccountsCreatePage,
    AccountsViewPage,
    AccountsViewAssignmentPage,
    AccountsUpdatePage,
    AccountsPage,
    AdminPage,
    FieldsPage,
    FieldsCreatePage,
    FieldsUpdatePage,
    FieldsViewPage,
    FieldGroupsPage,
    FieldGroupsCreatePage,
    FieldGroupsViewPage,
    FieldGroupsUpdatePage,
    SchedulesPage,
    SchedulesCreatePage,
    SchedulesUpdatePage,
    SchedulesViewPage,
    SchedulesOverviewPage,
    GroupAssignmentsPage,
    RotationsPage,
    RotationsCreatePage,
    RotationsUpdatePage,
    AdminProfilePage,
    StudentChangeScheduleRequestsPage,
    StudentChangeScheduleRequestUpdatePage,
    AdminGradesManagementPage,
    AdminUpdateGradePage,
    AdminViewAssignmentPage,
    StudentChangeElectiveRequestPage,
    UpdateStudentChangeElectiveRequestPage,
    ResetPasswordRequestsPage
  ],
  providers: [
    FieldService,
    UserService,
    ScheduleService,
    RotationService
  ],
  entryComponents: [
    AccountsCreatePage,
    AccountsViewPage,
    AccountsViewAssignmentPage,
    AccountsUpdatePage,
    FieldsCreatePage,
    FieldsUpdatePage,
    FieldsViewPage,
    FieldGroupsCreatePage,
    FieldGroupsViewPage,
    FieldGroupsUpdatePage,
    SchedulesCreatePage,
    SchedulesUpdatePage,
    SchedulesViewPage,
    RotationsCreatePage,
    RotationsUpdatePage,
    AdminProfilePage,
    UpdatePasswordModalPage,
    StudentChangeScheduleRequestUpdatePage,
    AdminUpdateGradePage,
    AdminViewAssignmentPage,
    UpdateStudentChangeElectiveRequestPage
  ]
})
export class AdminPageModule {}
