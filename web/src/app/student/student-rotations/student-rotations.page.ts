import { PopoverController } from '@ionic/angular';
import { StorageService, Storage } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ViewStudentAssignmentPage } from './view-student-assignment/view-student-assignment.page';
import * as moment from 'moment';

@Component({
  selector: 'app-student-rotations',
  templateUrl: './student-rotations.page.html',
  styleUrls: ['./student-rotations.page.scss'],
})
export class StudentRotationsPage implements OnInit {
  assignments = [];

  constructor(
    private assignmentService: AssignmentService,
    private storageService: StorageService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.listRotationsByStudent();
  }

  listRotationsByStudent() {
    const currentUser = JSON.parse(this.storageService.getItem(Storage.CURRENT_USER));
    this.assignmentService.listByStudent(
      currentUser._id
    ).then((data: any) => {
      this.assignments = data
        .filter(d => d.isActive)
        .sort((a, b) => {
          console.log(`${moment(a.rotation.schedule.startDate).isAfter(moment(b.rotation.schedule.startDate))}`);
          return moment(a.rotation.schedule.startDate).isAfter(moment(b.rotation.schedule.startDate)) ? 1 : -1;
        });
      console.log(this.assignments);
    });
  }

  async viewAssignment(assignment) {
    const viewModal = await this.popoverCtrl.create({
      component: ViewStudentAssignmentPage,
      componentProps: {
        assignment: assignment
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listRotationsByStudent();
    });

    return await viewModal.present();
  }
}
