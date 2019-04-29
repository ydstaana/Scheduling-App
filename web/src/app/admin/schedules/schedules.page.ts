import { PopoverController } from '@ionic/angular';
import { ScheduleService } from './../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { SchedulesViewPage } from './schedules-view/schedules-view.page';
import { SchedulesCreatePage } from './schedules-create/schedules-create.page';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {
  schedules = [];
  p: any;

  constructor(
    private scheduleService: ScheduleService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.listSchedules();
  }

  listSchedules() {
    this.scheduleService.list().then((data: any) => {
      this.schedules = data;
    });
  }

  async viewSchedule(schedule) {
    const viewModal = await this.popoverCtrl.create({
      component: SchedulesViewPage,
      componentProps: {
        schedule: schedule
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listSchedules();
    });

    return await viewModal.present();
  }

  async createSchedule() {
    const viewModal = await this.popoverCtrl.create({
      component: SchedulesCreatePage,
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listSchedules();
    });

    return await viewModal.present();
  }
}
