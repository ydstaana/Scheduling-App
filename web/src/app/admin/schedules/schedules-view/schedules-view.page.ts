import { SchedulesUpdatePage } from './../schedules-update/schedules-update.page';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedules-view',
  templateUrl: './schedules-view.page.html',
  styleUrls: ['./schedules-view.page.scss'],
})
export class SchedulesViewPage implements OnInit {
  schedule: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  async updateSchedule() {
    const viewModal = await this.popoverCtrl.create({
      component: SchedulesUpdatePage,
      componentProps: {
        schedule: this.schedule
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then((res: any) => {
      console.log(res);
      if (res.data) {
        this.schedule = res.data;
      }
    });

    return await viewModal.present();
  }
}
