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
  filteredRequests = [];
  p: any;
  PENDING = {
    isPending: true,
    isApproved: false
  };
  APPROVED = {
    isPending: false,
    isApproved: true
  };
  DECLINED = {
    isPending: false,
    isApproved: false
  };
  status: any = this.PENDING;

  constructor(
    private scheduleService: ScheduleService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listRequests();
  }

  filterByStatus() {
    this.filteredRequests = this.requests.filter(r => {
      return this.status.isPending ? r.isPending === this.status.isPending :
        r.isPending === this.status.isPending && r.isApproved === this.status.isApproved;
    });
  }

  listRequests() {
    this.scheduleService.listSwitchRequests().then((data: any) => {
      this.requests = data;

      this.filterByStatus();
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
