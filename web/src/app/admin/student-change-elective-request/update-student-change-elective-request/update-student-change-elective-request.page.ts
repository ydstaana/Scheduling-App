import { ScheduleService } from './../../../services/schedule.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-update-student-change-elective-request',
  templateUrl: './update-student-change-elective-request.page.html',
  styleUrls: ['./update-student-change-elective-request.page.scss'],
})
export class UpdateStudentChangeElectiveRequestPage implements OnInit {
  request: any;
  remarks = '';
  callInProgess = false;

  constructor(
    private popoverCtrl: PopoverController,
    private assignmentService: AssignmentService,
    private scheduleService: ScheduleService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  accept() {
    const req = {
      request: this.request._id,
      remarks: this.remarks
    };

    this.callInProgess = true;
    this.assignmentService.approveElectiveRequest(req).then(data => {
      this.callInProgess = false;
      this.success('Successfully approved request');
      this.dismiss();
    }, error => {
      this.callInProgess = false;
      this.error('Unable to approve request. Please try again.');
    });
  }

  decline() {
    const req = {
      remarks: this.remarks,
      isApproved: false,
      isPending: false
    };

    this.callInProgess = true;
    this.scheduleService.updateRequest(this.request._id, req).then(data => {
      this.callInProgess = false;
      this.success('Successfully declined request');
      this.dismiss();
    }, error => {
      this.callInProgess = false;
      this.error('Unable to decline request. Please try again.');
    });
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
