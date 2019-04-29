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
  currentUser: any;
  p: any;

  constructor(
    private assignmentService: AssignmentService,
    private storageService: StorageService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.currentUser = JSON.parse(
      this.storageService.getItem(Storage.CURRENT_USER)
    );

    this.listAssignments();
  }

  listAssignments() {
    this.assignmentService.listByFieldAdmin(this.currentUser._id).then((data: any) => {
      this.assignments = data
        .filter(d => d.isActive)
        .sort((a, b) => {
          return moment(a.rotation.schedule.startDate).isAfter(moment(b.rotation.schedule.startDate)) ? 1 : -1;
        });
    }, error => {
      console.log(error);
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
