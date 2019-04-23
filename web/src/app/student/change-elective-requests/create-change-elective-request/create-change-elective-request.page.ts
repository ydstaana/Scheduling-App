import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-create-change-elective-request',
  templateUrl: './create-change-elective-request.page.html',
  styleUrls: ['./create-change-elective-request.page.scss'],
})
export class CreateChangeElectiveRequestPage implements OnInit {
  currentUser: any;
  electives = [];
  selectedElective: any;
  message = '';
  requestForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private assignmentService: AssignmentService,
    private popoverCtrl: PopoverController,
    private scheduleService: ScheduleService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.listElectives();
    this.buildForm();
  }

  ionViewWillEnter() {
    this.listElectives();
  }

  listElectives() {
    this.assignmentService.listElectivesByStudent(this.currentUser._id).then((data: any) => {
      this.electives = data;
    });
  }

  buildForm() {
    this.requestForm = this.formBuilder.group({
      elective: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  createRequest() {
    this.scheduleService.createChangeRequest({
      assignment: this.selectedElective._id,
      message: this.message,
      requestType: 'ElectiveRequest',
      student: this.currentUser._id
    }).then(data => {
      this.success('Successfully create change elective request.');
      this.dismiss();
    }, error => {
      this.error('Unable to create change elective request. Please try again');
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
