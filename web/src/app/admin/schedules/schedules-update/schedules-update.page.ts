import { ScheduleService } from './../../../services/schedule.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-schedules-update',
  templateUrl: './schedules-update.page.html',
  styleUrls: ['./schedules-update.page.scss'],
})
export class SchedulesUpdatePage implements OnInit {
  callInProgress = false;
  scheduleForm: FormGroup;
  schedule: any;
  maxYear = moment().year() + 2;

  constructor(
    private formBuilder: FormBuilder,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.scheduleForm = this.formBuilder.group({
      startDate: [this.schedule.startDate, [Validators.required]],
      endDate: [this.schedule.endDate, [
        Validators.required
      ]],
      isActive: [this.schedule.isActive, []]
    });
  }

  updateSchedule() {
    if (this.scheduleForm.valid) {
      this.scheduleService.update({
        ...this.scheduleForm.value,
        id: this.schedule._id
      }).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss(data);
        this.success('Successfully updated a schedule');
      }, error => {
        this.error('Unable to update schedule. Please try again');
      });
    }
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
