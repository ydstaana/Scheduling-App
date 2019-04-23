import { ScheduleService } from './../../../services/schedule.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { AssignmentService } from './../../../services/assignment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-change-elective-request',
  templateUrl: './update-change-elective-request.page.html',
  styleUrls: ['./update-change-elective-request.page.scss'],
})
export class UpdateChangeElectiveRequestPage implements OnInit {
  currentUser: any;
  electives = [];
  selectedElective: any;
  message = '';
  requestForm: FormGroup;
  request: any;

  constructor(
    private formBuilder: FormBuilder,
    private assignmentService: AssignmentService,
    private popoverCtrl: PopoverController,
    private scheduleService: ScheduleService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.buildForm();
    console.log(this.request);
    this.assignmentService.listElectivesByStudent(this.currentUser._id).then((data: any) => {
      this.electives = data;
      this.message = this.request.message;
      this.selectedElective = this.electives.find(e => e._id === this.request.assignment._id);
    });
  }

  buildForm() {
    this.requestForm = this.formBuilder.group({
      elective: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  updateRequest() {
    this.scheduleService.updateRequest(this.request._id, {
      assignment: this.selectedElective._id,
      message: this.message
    }).then(data => {
      this.success('Successfully updated change elective request.');
      this.dismiss();
    }, error => {
      this.error('Unable to update change elective request. Please try again');
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
