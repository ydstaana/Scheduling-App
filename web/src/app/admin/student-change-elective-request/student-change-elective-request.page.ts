import { UpdateStudentChangeElectiveRequestPage } from './update-student-change-elective-request/update-student-change-elective-request.page';
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

  listElectiveRequests() {
    this.assignmentService.listElectiveRequests().then((data: any) => {
      this.requests = data;
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
