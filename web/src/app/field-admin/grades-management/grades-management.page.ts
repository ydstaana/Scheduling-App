import { ScheduleService } from 'src/app/services/schedule.service';
import { ViewAssignmentPage } from './view-assignment/view-assignment.page';
import { PopoverController } from '@ionic/angular';
import { StorageService, Storage } from './../../services/storage.service';
import { AssignmentService } from './../../services/assignment.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-grades-management',
  templateUrl: './grades-management.page.html',
  styleUrls: ['./grades-management.page.scss'],
})
export class GradesManagementPage implements OnInit {
  assignments = [];
  filteredAssignments = [];
  schedules = [];
  currentUser: any;
  p: any;
  schedule: any;

  constructor(
    private assignmentService: AssignmentService,
    private storageService: StorageService,
    private popoverCtrl: PopoverController,
    private scheduleService: ScheduleService
  ) {
    this.currentUser = JSON.parse(
      this.storageService.getItem(Storage.CURRENT_USER)
    );
  }

  ngOnInit() {
    this.listAssignments();
  }

  ionViewWillEnter() {
    this.listAssignments();
  }

  filterBySchedule() {
    console.log(this.schedule);
    this.filteredAssignments = this.assignments.filter(a => {
      return a.rotation.schedule._id === this.schedule._id;
    });
  }

  listSchedules() {
    this.scheduleService.list().then((data: any) => {
      this.schedules = data
        .sort((a, b) => {
          return moment(a.startDate).isAfter(moment(b.startDate)) ? 1 : -1;
        });

      this.schedule = this.schedules[0];

      this.filterBySchedule();
    });
  }

  listAssignments() {
    console.log(this.currentUser);
    this.assignmentService.listByFieldAdmin(this.currentUser._id).then((data: any) => {
      this.assignments = data
        .filter(d => d.isActive)
        .sort((a, b) => {
          return moment(a.rotation.schedule.startDate).isAfter(moment(b.rotation.schedule.startDate)) ? 1 : -1;
        });
    }, error => {
      console.log(error);
    }).then(d => {
      this.listSchedules();
    });
  }

  async viewAssignment(assignment) {
    const viewModal = await this.popoverCtrl.create({
      component: ViewAssignmentPage,
      componentProps: {
        assignment: assignment
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listAssignments();
    });

    return await viewModal.present();
  }
}
