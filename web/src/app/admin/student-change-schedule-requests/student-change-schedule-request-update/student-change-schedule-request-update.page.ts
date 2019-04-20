import { PopoverController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-student-change-schedule-request-update',
  templateUrl: './student-change-schedule-request-update.page.html',
  styleUrls: ['./student-change-schedule-request-update.page.scss'],
})
export class StudentChangeScheduleRequestUpdatePage implements OnInit {
  request: any;
  remarks = '';

  constructor(
    private popoverCtrl: PopoverController,
    private assignmentService: AssignmentService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  accept() {
    const req = {
      request: this.request._id,
      remarks: this.remarks
    };

    this.assignmentService.switchAssignments(req).then(data => {
      this.success('Successfully approved request');
    }, error => {
      this.error('Unable to approve request. Please try again.');
    });
  }

  decline() {

  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  async success(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      duration: 5000,
      position: 'top',
      cssClass: 'toast-success'
    });
    toast.present();
  }

  async error(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      duration: 5000,
      position: 'top',
      cssClass: 'toast-danger',
    });
    toast.present();
  }
}
