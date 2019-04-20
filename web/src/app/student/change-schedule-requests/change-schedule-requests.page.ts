import { ChangeScheduleRequestsViewPage } from './change-schedule-requests-view/change-schedule-requests-view.page';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ChangeScheduleRequestsCreatePage } from './change-schedule-requests-create/change-schedule-requests-create.page';
import { PopoverController } from '@ionic/angular';
import { ScheduleService } from './../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { StorageService, Storage } from 'src/app/services/storage.service';
import { RotationService } from 'src/app/services/rotation.service';

@Component({
  selector: 'app-change-schedule-requests',
  templateUrl: './change-schedule-requests.page.html',
  styleUrls: ['./change-schedule-requests.page.scss'],
})
export class ChangeScheduleRequestsPage implements OnInit {
  assignments = [];
  requests = [];
  currentUser: any;

  constructor(
    private scheduleService: ScheduleService,
    private storageService: StorageService,
    private popoverCtrl: PopoverController,
    private assignmentService: AssignmentService
  ) {
    this.currentUser = JSON.parse(this.storageService.getItem(Storage.CURRENT_USER));
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listAssignments();
    this.listRequests();
  }

  listAssignments() {
    this.assignmentService.listByStudent(
      this.currentUser._id
    ).then((data: any) => {
      this.assignments = data.filter(d => d.isActive);
    });
  }

  listRequests() {
    this.scheduleService.listSwitchRequestsByStudent(this.currentUser._id).then((data: any) => {
      this.requests = data;
    });
  }

  async createRequest() {
    const viewModal = await this.popoverCtrl.create({
      component: ChangeScheduleRequestsCreatePage,
      componentProps: {
        assignments: this.assignments
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listRequests();
      this.listAssignments();
    });

    return await viewModal.present();
  }

  async viewRequest(request) {
    const viewModal = await this.popoverCtrl.create({
      component: ChangeScheduleRequestsViewPage,
      componentProps: {
        request: request
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    return await viewModal.present();
  }
}
