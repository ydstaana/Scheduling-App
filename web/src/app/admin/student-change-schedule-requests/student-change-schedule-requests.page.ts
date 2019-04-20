import { PopoverController } from '@ionic/angular';
import { ScheduleService } from './../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { StudentChangeScheduleRequestUpdatePage } from './student-change-schedule-request-update/student-change-schedule-request-update.page';

@Component({
  selector: 'app-student-change-schedule-requests',
  templateUrl: './student-change-schedule-requests.page.html',
  styleUrls: ['./student-change-schedule-requests.page.scss'],
})
export class StudentChangeScheduleRequestsPage implements OnInit {
  requests = [];
  currentUser: any;

  constructor(
    private scheduleService: ScheduleService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listRequests();
  }

  listRequests() {
    this.scheduleService.listSwitchRequests().then((data: any) => {
      this.requests = data.filter(d => d.isPending);
    });
  }

  async updateRequest(request) {
    const viewModal = await this.popoverCtrl.create({
      component: StudentChangeScheduleRequestUpdatePage,
      componentProps: {
        request: request
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listRequests();
    });

    return await viewModal.present();
  }
}
