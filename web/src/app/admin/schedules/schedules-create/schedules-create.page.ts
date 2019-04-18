import { ScheduleService } from './../../../services/schedule.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-schedules-create',
  templateUrl: './schedules-create.page.html',
  styleUrls: ['./schedules-create.page.scss'],
})
export class SchedulesCreatePage implements OnInit {
  callInProgress = false;
  scheduleForm: FormGroup;
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
      startDate: ['', [Validators.required]],
      endDate: ['', [
        Validators.required
      ]]
    });
  }

  createSchedule() {
    if (this.scheduleForm.valid) {
      this.scheduleService.create(this.scheduleForm.value).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss();
        this.success('Successfully created a schedule');
      }, error => {
        this.error('Unable to create schedule. Please try again');
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
