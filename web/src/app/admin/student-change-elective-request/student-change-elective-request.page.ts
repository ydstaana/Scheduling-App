import {
  UpdateStudentChangeElectiveRequestPage
} from './update-student-change-elective-request/update-student-change-elective-request.page';
import { PopoverController } from '@ionic/angular';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-change-elective-request',
  templateUrl: './student-change-elective-request.page.html',
  styleUrls: ['./student-change-elective-request.page.scss'],
})
export class StudentChangeElectiveRequestPage implements OnInit {
  requests = [];
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
    private assignmentService: AssignmentService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.listElectiveRequests();
  }

  ionViewWillEnter() {
    this.listElectiveRequests();
  }

  filterByStatus() {
    console.log(this.status);
    this.filteredRequests = this.requests.filter(r => {
      return this.status.isPending ? r.isPending === this.status.isPending :
        r.isPending === this.status.isPending && r.isApproved === this.status.isApproved;
    });
  }

  listElectiveRequests() {
    this.assignmentService.listElectiveRequests().then((data: any) => {
      this.requests = data;

      this.filterByStatus();
    });
  }

  async viewRequest(request) {
    const viewModal = await this.popoverCtrl.create({
      component: UpdateStudentChangeElectiveRequestPage,
      componentProps: {
        request: request
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listElectiveRequests();
    });

    return await viewModal.present();
  }
}
